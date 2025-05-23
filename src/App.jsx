import { Route, Routes } from "react-router-dom";
import Crea from './crea';
import Login from './log';
import Recupe from './recur'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/crea cuenta" element={<Crea />} />
      <Route path="/recuperarcontraseña" element={<Recupe />} />
    </Routes>
  );
}

export default App