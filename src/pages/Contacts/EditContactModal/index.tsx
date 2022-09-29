import {Box, Button, Modal, TextField} from "@mui/material";
import styles from "./EditContact.module.css";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {editContact} from "../../../redux/slices/contactSlice";

interface Props  {
    handleToggle: () => void
    open: boolean
    item: Item
}

type Item = {
    phone: string
    name: string
    id: string
};

type Form = {
    name: string,
    phone: string,
}

export const EditContactModal: React.FC<Props> = ({open, handleToggle, item}) => {
    const [editFormValues, setEditFormValues] = useState<Form>({name: item.name, phone: item.phone})
    const dispatch = useDispatch()

    const handleSubmit = async (event: React.FormEvent<EventTarget>, item: Item) => {
        event.preventDefault()
        handleToggle()
        console.log({...item, name: editFormValues.name,  phone: editFormValues.phone})
        // @ts-ignore
        await dispatch( editContact({...item, name: editFormValues.name,  phone: editFormValues.phone} ))
    }

    const handleEditContact = (e: React.FormEvent<EventTarget>) => {
        const {name, value} = e.target as HTMLInputElement
        setEditFormValues({...editFormValues, [name]: value})
    };

    return (
        <Modal
            open={open}
            onClose={handleToggle}
        >
            <Box className={styles.modal}>
                <form className={styles.form} onSubmit={(e) => handleSubmit(e, item)}>
                    <TextField onChange={(handleEditContact)}
                               id="outlined-basic"
                               label="Name"
                               name='name'
                               variant="outlined"
                               size="small"
                               value={editFormValues.name}
                               fullWidth/>

                    <TextField onChange={(handleEditContact)}
                               id="outlined-basic"
                               label="Phone"
                               name='phone'
                               variant="outlined"
                               size="small"
                               margin='normal'
                               value={editFormValues.phone}
                               fullWidth/>

                    <Button fullWidth type="submit" variant='contained' color='primary'
                            > Сохранить изменения </Button>
                </form>
            </Box>
        </Modal>
    );
}