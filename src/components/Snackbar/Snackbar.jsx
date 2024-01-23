import React, { useContext } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { MsgContext } from '../../Context/messageContext';

export default function Snackbar_() {

    const { msg, opened, handleClose } = useContext(MsgContext);

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={() => handleClose(event)}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => handleClose(event)}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={opened}
                autoHideDuration={3000}
                onClose={() => handleClose(event)}
                action={action}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>

            </Snackbar>
        </div>
    )
}
