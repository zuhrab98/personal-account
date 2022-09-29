import {Box, Button, Modal, Stack, TextField, Typography} from "@mui/material";
import styles from "./Modal.module.css";
import React from "react";

type Props = {
    handleToggle: () => void
    open: boolean
}

export const ModalAddContact: React.FC<Props> = ({handleToggle, open}) => {
    return (
        <Modal
            open={open}
            onClose={handleToggle}
        >
            <Box className={styles.modal}>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    <Stack spacing={2}>
                        <TextField onChange={(() => console.log('f'))}
                                   id="outlined-basic"
                                   label="Name"
                                   variant="outlined"
                                   size="small"/>

                        <TextField onChange={(() => console.log('f'))}
                                   id="outlined-basic"
                                   label="Phone"
                                   variant="outlined"
                                   size="small"
                                   margin='normal'/>

                        <Button fullWidth type="button" variant='contained' color='primary'
                                onClick={handleToggle}> Добавить </Button>
                    </Stack>
                </Typography>
            </Box>
        </Modal>

    );
}