import React, { useState } from 'react'; 
import './css/datemp.css'; 
import Cabe from './menu';
import { useNavigate } from 'react-router-dom';

function EmployeeData() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // <-- ESTA LÍNEA FALTABA

  const handleSearch = () => {
    console.log('Buscando empleado:', searchTerm);
  };
  const handleUpdate = () => {
    console.log('Botón Actualizar presionado');
  };
  const handleDelete = () => {
    console.log('Botón Borrar presionado');
  };

  return (
    <div>
      <Cabe/>
      <div >
        <h1 className="ple">Datos empleados</h1>git add Frontend/
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar..."
          id="searchInput"
        />
        {/* ícono lupa */}
      </div>

      <table className='empl'>
        <tbody>
          <tr><td>Nombre</td><td>Mariana Gómez</td></tr>
          <tr><td>Telefono</td><td>300 123 4567</td></tr>
          <tr><td>Correo</td><td>mariana.gomez@email.com</td></tr>
          <tr><td>N°cedula</td><td>12345678</td></tr>
        </tbody>
      </table>

      <div className="trab">
        <button onClick={() => navigate('/Actualizaremmpl')}className='ji'>Actualizar</button>
        <button onClick={handleDelete} className='ji'>Borrar</button>
      </div>
    </div>
  );
}

export default EmployeeData;
