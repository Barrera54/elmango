 import { Route,Routes } from "react-router-dom";
 import Crear from'./crea'

function con(){
    return(
 <Routes>
    <Route path="/Crear" elemen={<Crear/>} />

 </Routes>
    )
}
export default con;