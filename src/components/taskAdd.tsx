import { Card, TextField, Button, FormControlLabel, Checkbox, Modal, Fab } from "@mui/material";
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addItem } from "../store/itemsSlice";

function TaskAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.items.items);

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [completed, setCompleted] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTitle('');
        setUserId('');
        setCompleted(false);
    };

    const handleAddItem = () => {
        dispatch(addItem({
            id: items.length + 1,
            title,
            userId: parseInt(userId),
            completed
        }));
        handleClose();
    };

    return (
        <>
            <Fab sx={{ position: 'fixed', right: 50, bgcolor: 'hotpink' }}
                color="primary"
                className="fab"
                onClick={handleOpen}>
                <AddIcon />
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Card sx={{ p: 4, m: 4, bgcolor: 'primary.light', borderRadius: 5 }}>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <TextField
                            label="Title"
                            variant="filled"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            label="User ID"
                            variant="outlined"
                            required
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <FormControlLabel
                            label="Completed"
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={completed}
                                    onChange={(e) => setCompleted(e.target.checked)}
                                />
                            }
                        />
                        <Button variant="contained" color="primary" onClick={handleAddItem}>
                            Add Item
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </form>
                </Card>
            </Modal>
        </>
    )
}

export default TaskAdd;
