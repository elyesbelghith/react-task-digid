import { Card, Button, Box, Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setItems } from '../store/itemsSlice';
import { Item } from '../store/itemsSlice';
import TaskDelete from './taskDelete';
import TaskAdd from './taskAdd';
import EditTask from './editTask';

export default function GetData() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.items.items);
  const [detailsVisible, setDetailsVisible] = useState<{ [key: number]: boolean }>({});
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [taskAddVisible, setTaskAddVisible] = useState<boolean>(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/todos";
    try {
      const response = await axios.get<Item[]>(apiUrl);
      dispatch(setItems(response.data));
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  const toggleDetails = (itemId: number) => {
    setDetailsVisible(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  const toggleTaskAdd = () => {
    setTaskAddVisible(prevState => !prevState);
  };

  const handleEdit = (itemId: number) => {
    setEditItemId(itemId);
  };

  const handleCloseEdit = () => {
    setEditItemId(null);
  };

  return (
    <Container>
      {items.map((item) => (
        <Card key={item.id} sx={{ p: 4, m: 4, bgcolor: 'primary.light', borderRadius: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>{item.title}</h3>
            <Button variant="contained" color="primary" onClick={() => toggleDetails(item.id)}>
              {detailsVisible[item.id] ? "Hide Details" : "View Details"}
            </Button>
          </Box>
          {detailsVisible[item.id] && (
            <div>
              <p>ID: {item.id}</p>
              <p>User ID: {item.userId}</p>
              <p>Completed: {item.completed ? "true" : "false"}</p>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={() => handleEdit(item.id)}>
                  Edit
                </Button>
                <TaskDelete itemId={item.id} />
              </Box>
            </div>
          )}
        </Card>
      ))}
      {editItemId !== null && (
        <EditTask itemId={editItemId} onClose={handleCloseEdit} />
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button variant="contained" color="primary" onClick={toggleTaskAdd}>
          {taskAddVisible ? "Hide Add Task" : "Add Task"}
        </Button>
      </Box>
      {taskAddVisible && <TaskAdd />}
    </Container>
  );
}
