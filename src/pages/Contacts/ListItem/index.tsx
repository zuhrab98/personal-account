import styles from "../Contacts.module.css";
import {Box, IconButton, ListItem, ListItemButton, ListItemText} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState} from "react";
import {EditContactModal} from "../EditContactModal";

type Props = {
    item: {
        isEdit: boolean
        phone: string
        name: string
        id: string
    }
    index: number
    deleteContact: (id: string) => void
}

export const ListItems: React.FC<Props> = ({item, index, deleteContact}) => {
    const [isEditContactToggle, setEditContactToggle] = useState(false);

    const handleEditToggle = () => {
        setEditContactToggle(prev => !prev)
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
                            onClick={handleEditToggle}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteContact(item.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </>

                }>
                <ListItemButton dense sx={{padding: 0}}>
                    <Box>
                        <ListItemText>Name: {item.name}</ListItemText>
                        <ListItemText>Phone: {item.phone}</ListItemText>
                    </Box>
                </ListItemButton>
            </ListItem>
            <EditContactModal handleToggle={handleEditToggle} open={isEditContactToggle} item={item}/>
        </>
    );
}