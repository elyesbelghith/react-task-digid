import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./store/store"
import "./index.css"
import { createTheme, ThemeProvider } from "@mui/material"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import TaskAdd from "./components/taskAdd";
import ListManager from './pages/listManager';







const container = document.getElementById("root")
const custom1 = createTheme({
  //spacing:4,
  
  palette: {
    primary: {
      light: '#C5CBE9',
      main: '#9FA8DA',
      dark: '#1B278D',
      contrastText: '#fff',
    },
    secondary: {
      light: '#F9E0E0',
      main: '#EA9999',
      dark: '#DB6B6B',
      contrastText: '#fff',
    },
    

  },
  

});
custom1.spacing(1);



if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
           <ThemeProvider theme={custom1}>
          <Provider store={store}>

   <BrowserRouter>
   <Routes>
<Route index element={<App/>}></Route>
<Route path="/Listmgr" element={<ListManager/>}/>
<Route path="/taskadd" element={<TaskAdd/>}/>
</Routes>

   </BrowserRouter>
   </Provider>
          </ThemeProvider> 
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
