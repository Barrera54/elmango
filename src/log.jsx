import { Route, Routes, Navigate } from "react-router-dom";
import Crea from './crea';
import Login from './App';
import Recupe from './recur';
import Menu from'./princi'
import Venta from'./vent'
function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login/> } />
      <Route path="/crea cuenta" element={<Crea />} />
      <Route path="/recuperarcontraseña" element={<Recupe />} />
      <Route path="/Principal"  element={<Menu/>}/>
      <Route path="/Venta"  element={<Venta/>}/>
    </Routes>
  );
}

export default App