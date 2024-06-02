import { Button, Card, Container, TableContainer, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import "./App.css"

const App = () => {
  const navigate = useNavigate();

const handleClick = () => {
  navigate('/listmgr');
};

  return (

        <Container>
        
            <Typography variant="h3" textAlign={"center"}>React practice</Typography>
    <center>
              <Card  sx={{p:4, m: 4, bgcolor:"primary.light", borderRadius:5, width:"400px"}}>  <Typography >Click the button below to start the task</Typography>
              <Button variant="contained" onClick={handleClick}>START</Button>
              </Card>
    </center>
          
        </Container>

  )
}

export default App
