import { Button, Modal, Box, Typography, Card } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { deleteItem } from '../store/itemsSlice';

interface TaskDeleteProps {
  itemId: number;
}

function TaskDelete(props: TaskDeleteProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    dispatch(deleteItem(props.itemId));
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Card sx={{ p: 4, bgcolor: 'primary.light', borderRadius: 5 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="contained" color="secondary" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Card>
        </Box>
      </Modal>
    </>
  );
}

export default TaskDelete;
