import styles from "../Contacts.module.css";
import {Box, IconButton, Input, ListItem, ListItemButton, ListItemText} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent} from "react";

type Props = {
    index: number
    isEdit: boolean
    phone: string
    name: string
    id: string
    editContact: (i: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    deleteContact: (id: string) => void
    toggleMode: (i: number) => void
}

export const ListItems: React.FC<Props> = ({index, isEdit, phone, name, editContact, id, deleteContact, toggleMode}) => {
    return (
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
            <ListItemButton dense sx={{padding: 0}}>
                {isEdit ? (
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Input
                            sx={{fontSize: '18px'}}
                            name='name'
                            onChange={((event) => editContact(index, event))}
                            autoFocus
                            value={name}/>
                        <Input
                            sx={{fontSize: '18px'}}
                            name='phone'
                            onChange={((event) => editContact(index, event))}
                            autoFocus
                            value={phone}/>
                    </Box>

                ) : (
                    <Box>
                        <ListItemText>Name: {name}</ListItemText>
                        <ListItemText>Phone: {phone}</ListItemText>
                    </Box>
                )}
            </ListItemButton>
        </ListItem>
    )
}