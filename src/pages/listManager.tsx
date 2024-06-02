import { Container, Typography, Fab, Modal, Card,Button,TextField, FormControlLabel, Checkbox } from "@mui/material";
import GetData from "../components/dataList";
import AddIcon from '@mui/icons-material/Add';
import { Provider } from 'react-redux';
import { useState } from "react";
import { store } from "../store/store";
import TaskAdd from "../components/taskAdd";

export default function ListManager() {




    return (
<Provider store={store}>
        <Container>
            
          <Typography variant="h3" textAlign={"center"}>List Manager</Typography>

<Container sx={{display:'flex'}}>
    <Typography variant="h4">Tasks List</Typography>

</Container>

          <TaskAdd></TaskAdd>
          <GetData />
    
        </Container>
        </Provider>
  );
}