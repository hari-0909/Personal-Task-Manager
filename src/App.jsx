import {BrowserRouter,Routes,Route} from "react-router-dom"

import Sidebar from "./components/Sidebar"
import Grid from "./pages/Grid"
import Progress from "./pages/Progress"
import Tasks from "./pages/Tasks"

import "./App.css"

function App(){

return(

<BrowserRouter>

<div className="app-layout">

<Sidebar/>

<div className="main-content">

<Routes>

<Route path="/" element={<Grid/>}/>
<Route path="/progress" element={<Progress/>}/>
<Route path="/tasks" element={<Tasks/>}/>

</Routes>

</div>

</div>

</BrowserRouter>

)

}

export default App