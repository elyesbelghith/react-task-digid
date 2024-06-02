import { Card, TextField, Button, FormControlLabel, Checkbox, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { editItem } from '../store/itemsSlice';

interface EditTaskProps {
    itemId: number;
    onClose: () => void;
}

const EditTask = ({ itemId, onClose }: EditTaskProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState<boolean>(true);
    const [title, setTitle] = useState<string>('');
    const [userId, setUserId] = useState<number>(0);
    const [completed, setCompleted] = useState<boolean>(false);

    const items = useSelector((state: RootState) => state.items.items);
    const currentItem = items.find(item => item.id === itemId);

    useEffect(() => {
        if (currentItem) {
            setTitle(currentItem.title);
            setUserId(currentItem.userId);
            setCompleted(currentItem.completed);
        }
    }, [currentItem]);

    const handleSave = () => {
        if (currentItem) {
            dispatch(editItem({
                id: currentItem.id,
                title,
                userId,
                completed,
            }));
            handleClose();
        }
    };

    const handleClose = () => {
        setOpen(false);
        onClose(); // Close modal via parent component
    };

    if (!currentItem) {
        return null;
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                        onChange={(e) => setUserId(parseInt(e.target.value))}
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
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </form>
            </Card>
        </Modal>
    );
};

export default EditTask;
