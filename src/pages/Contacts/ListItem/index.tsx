import styles from "../Contacts.module.css";
import {Box, IconButton, ListItem, ListItemButton, ListItemText} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState} from "react";
import {ModalContact} from "../../../components/Modal";
import {ContactType} from "../../../redux/slices/contactSlice";

type Props = {
    item: ContactType
    index: number
    deleteContact: (id: string) => void
}

export const ListItems: React.FC<Props> = ({item, index, deleteContact }) => {
    const [isEditContact, setEditContact] = useState(false);

    const handleEditContact = () => {
        setEditContact(prev => !prev)
    }

    return (
        <>
            <ListItem
                key={index}
                className={styles.list}
                secondaryAction={
                    <>
                        <IconButton
                            sx={{mr: 1}}
                            edge="end"
                            aria-label="edit"
                            onClick={handleEditContact}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteContact(item.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </>

                }>
                <ListItemButton dense sx={{padding: 0}}>
                    <Box className={styles.imgWrap}>
                        <img src={item.avatar} alt="avatar"/>
                    </Box>
                    <Box>
                        <ListItemText>Name: {item.name}</ListItemText>
                        <ListItemText>Phone: {item.phone}</ListItemText>
                    </Box>
                </ListItemButton>
            </ListItem>
            <ModalContact handleToggle={handleEditContact} open={isEditContact} item={item}/>
        </>
    );
}