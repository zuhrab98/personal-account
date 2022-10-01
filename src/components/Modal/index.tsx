import {Box, Button, Modal, TextField} from "@mui/material";
import styles from "./ModalContact.module.css";
import React, {useState} from "react";
import {addContact, ContactType, editContact} from "../../redux/slices/contactSlice";
import {useAppDispatch} from "../../redux/store";

interface Props {
    open: boolean
    item?: ContactType
    handleToggle: () => void
}

type Form = {
    name: string,
    phone: string,
}

export const ModalContact: React.FC<Props> = ({open, handleToggle, item}) => {
    const dispatch = useAppDispatch()
    const contact = {name: item ? item.name : '', phone: item ? item.phone : ''}
    const [editContactPerson, setEditContactPerson] = useState<Form>(contact)

    const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
        event.preventDefault()
        handleToggle()
        if (item) {
            await dispatch(editContact({...item, name: editContactPerson.name, phone: editContactPerson.phone}))
        } else {
            await dispatch(addContact({ name: editContactPerson.name, phone: editContactPerson.phone}));
        }
    }

    const handleEditContact = (e: React.FormEvent<EventTarget>) => {
        const {name, value} = e.target as HTMLInputElement
        setEditContactPerson({...editContactPerson, [name]: value})
    };

    return (
        <Modal
            open={open}
            onClose={handleToggle}
        >
            <Box className={styles.modal}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <TextField onChange={(handleEditContact)}
                               id="outlined-basic"
                               label="Name"
                               name='name'
                               variant="outlined"
                               size="small"
                               value={editContactPerson.name}
                               fullWidth/>

                    <TextField onChange={(handleEditContact)}
                               id="outlined-basic"
                               label="Phone"
                               name='phone'
                               variant="outlined"
                               size="small"
                               margin='normal'
                               value={editContactPerson.phone}
                               fullWidth/>

                    <Button
                        fullWidth
                        type="submit"
                        variant='contained'
                        color='primary'
                    > Сохранить изменения </Button>
                </form>
            </Box>
        </Modal>
    );
}