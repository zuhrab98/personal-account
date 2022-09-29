import {Box, Button, CardContent, List, Typography} from "@mui/material";
import styles from './Contacts.module.css'
import { useEffect, useState} from "react";
import {ListItems} from "./ListItem";
import {useAppDispatch} from "../../redux/store";
import {deleteContact, fetchContacts, selectContact} from "../../redux/slices/contactSlice";
import {useSelector} from "react-redux";


export const Contacts = () => {
    const dispatch = useAppDispatch()
    const { contacts, status } = useSelector(selectContact)
    const [isAddContactToggle, setAddContactToggle] = useState(false);

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch]);

    const deleteYourContact =  (id: string) => {
        dispatch(deleteContact(id));
    };

    const handleToggle = () => {
        setAddContactToggle(prev => !prev)
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
                                    deleteContact={deleteYourContact}/>
                            )) : <Typography textAlign='center'> Нет контактов </Typography>
                    }
                </List>
            </CardContent>
            <Button fullWidth type="button" variant='contained' color='primary'
                    onClick={handleToggle}> Добавить </Button>
        </Box>
    );
}