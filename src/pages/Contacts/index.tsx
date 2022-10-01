import {Box, Button, CardContent, List, Typography} from "@mui/material";
import styles from './Contacts.module.css'
import React, { useEffect, useState} from "react";
import {ListItems} from "./ListItem";
import {useAppDispatch} from "../../redux/store";
import {deleteContact, fetchContacts, selectContact} from "../../redux/slices/contactSlice";
import {useSelector} from "react-redux";
import {ModalContact} from "../../components/Modal";

export const Contacts = () => {
    const dispatch = useAppDispatch()
    const { contacts, status } = useSelector(selectContact)
    const [isAddContact, setAddContact] = useState(false);

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch]);

    const handleDeleteContact =  (id: string) => {
        const isDelete = window.confirm('Вы уверены, что хотите удалить ?')
        isDelete && dispatch(deleteContact(id));
    };

    const handleAddContact = () => {
        setAddContact(prev => !prev)
    }

    return (
        <Box className={styles.root}>
            <Typography variant='h4' component='h1' sx={{textAlign: 'center', mb: 2}}> Список Контактов </Typography>
            <CardContent sx={{padding: 0}}>
                <List>
                    {status === 'loading' ? <div className={styles.loading}></div> :
                        contacts?.length ?
                            contacts.map((item, index) => (
                                <ListItems
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    deleteContact={handleDeleteContact}
                                />
                            )) : <Typography textAlign='center'> Нет контактов </Typography>
                    }
                </List>
            </CardContent>
            <Button
                fullWidth
                type="button"
                variant='contained'
                color='primary'
                onClick={handleAddContact}
            > Добавить </Button>

            <ModalContact handleToggle={handleAddContact} open={isAddContact}/>
        </Box>
    );
}