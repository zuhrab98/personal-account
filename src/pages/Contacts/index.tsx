import {Box, Button, CardContent, List, Typography} from "@mui/material";
import styles from './Contacts.module.css'
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {Url} from "../../constans";
import {ModalAddContact} from "./Modal";
import {ListItems} from "./ListItem";

type ContactsType = {
    id: string,
    name: string,
    phone: string,
    isEdit: boolean
}

export const Contacts = () => {
    const [mainList, setMainList] = useState<ContactsType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get(Url.CONTACTS).then(({data}) => {
            setLoading(true);
            setMainList(data)
            setLoading(false);
        })
    }, [])

    const deleteContact = async (id: string) => {
        try {
            setLoading(true)
            await axios.delete(`${Url.CONTACTS}/${id}`)
            setLoading(false)
            setMainList(mainList.filter((item) => item.id !== id))
        } catch (error) {
            console.error(error)
        }
    };

    const editContact = (i: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = event.target
        setMainList(
            mainList.map((item, index) => {
                if (index === i) {
                    target.name === 'name' ? item.name = target.value : item.phone = target.value;
                }
                return item;
            }),
        );
    };

    const toggleMode = (i: number) => {
        setMainList(
            mainList.map((item, index) => {
                if (index === i) {
                    item.isEdit = !item.isEdit;
                }
                return item;
            }),
        );
    };

    const handleToggle = () => {
        setOpen(prev => !prev)
    }


    return (
        <Box className={styles.root}>
            <Typography variant='h4' component='h1' sx={{textAlign: 'center', mb: 2}}> Список Контактов </Typography>
            <CardContent sx={{padding: 0}}>
                <List>
                    {loading ?
                        <div className={styles.loading}></div> :
                        mainList.map(({name, id, isEdit, phone}, index) => (
                            <ListItems
                                name={name}
                                id={id}
                                isEdit={isEdit}
                                phone={phone}
                                index={index}
                                editContact={editContact}
                                toggleMode={toggleMode}
                                deleteContact={deleteContact}/>
                        ))}
                </List>
            </CardContent>
            <Button fullWidth type="button" variant='contained' color='primary'
                    onClick={handleToggle}> Добавить </Button>
            <ModalAddContact handleToggle={handleToggle} open={open}/>
        </Box>
    );
}