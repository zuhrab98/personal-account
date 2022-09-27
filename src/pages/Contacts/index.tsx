import {
    Box, Button,
    CardContent,
    IconButton, Input,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Typography
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from './Contacts.module.css'
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {Url} from "../../constans";

type ContactsType = {
    id: string,
    name: string,
    phone: string,
    isEdit: boolean
}

export const Contacts = () => {
    const [mainList, setMainList] = useState<ContactsType[]>([])
    const [loading, setLoading] = useState<boolean>(true)


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

    const editTodo = (i: number,  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMainList(
            mainList.map((item, index) => {
                if (index === i) {
                    item.name = event.target.value;
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


    return (
        <Box className={styles.root}>
            <Typography variant='h4' component='h1' sx={{textAlign: 'center', mb: 2}}> Список Контактов </Typography>
            <CardContent sx={{padding: 0}}>
                <List>
                    {loading ? <div className={styles.loading}></div> : mainList.map(({name, id, isEdit}, index) => (
                        <ListItem
                            key={index}
                            className={styles.list}
                            secondaryAction={
                                <>
                                    <IconButton sx={{mr: 1}} edge="end" aria-label="edit"
                                                onClick={() => toggleMode(index)}>
                                        {isEdit ? <SaveIcon/> : <EditIcon/>}
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteContact(id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </>

                            }>
                            <ListItemButton role={undefined} dense>
                                {isEdit ? (
                                    <Input
                                        onChange={((event) => editTodo(index, event))}
                                        autoFocus
                                        value={name}/>

                                ) : (
                                    <ListItemText>{name}</ListItemText>
                                )}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <Button fullWidth type="button" variant='contained' color='primary'> Добавить </Button>
        </Box>
    );
}