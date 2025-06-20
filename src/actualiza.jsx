import React, { useState } from 'react'; // Importamos useState para manejar el estado de los inputs
import { useNavigate } from 'react-router-dom'; // Asumiendo que estás usando React Router para la navegación
import'./css/actualiza.css'
import Cabe from './menu'

function DatosPersonales() {
  // Variables de estado para almacenar los valores de cada campo de entrada
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [numeroCedula, setNumeroCedula] = useState('');

  // Hook de React Router para la navegación programática
  const navigate = useNavigate();

  // Función para manejar el clic del botón "Aceptar"
  const handleAceptarClick = () => {
    // Aquí puedes realizar acciones como validar los datos o enviarlos a un servidor
    console.log('Datos personales enviados:');
    console.log('Empleado:', nombreEmpleado);
    console.log('Teléfono:', telefono);
    console.log('Correo Electrónico:', correoElectronico);
    console.log('Número de Cédula:', numeroCedula);

    // Navegar a la ruta '/inic' usando React Router
    // Si 'inic.html' fuera un archivo HTML estático real, usarías: window.location.href = 'inic.html';
    // Pero en una aplicación React, la navegación interna con React Router es lo preferido.
    navigate('/inic');
  };

  return (
    <>
    <Cabe/>
    <div className="cont">
     <div className="da"> Datos personales</div>

      <div className="cli">
        <h2>Empleado</h2>
        <input
          type="text"
          value={nombreEmpleado} // El valor del input está controlado por el estado 'nombreEmpleado'
          onChange={(e) => setNombreEmpleado(e.target.value)} // Actualiza el estado cuando el input cambia
        />
      </div>

      <div className="de">
        <h2>Teléfono</h2>
        <input
          type="text"
          value={telefono} // El valor del input está controlado por el estado 'telefono'
          onChange={(e) => setTelefono(e.target.value)} // Actualiza el estado cuando el input cambia
        />
      </div>

      <div className="de">
        <h2>Correo electrónico</h2>
        <input
          type="text"
          value={correoElectronico} // El valor del input está controlado por el estado 'correoElectronico'
          onChange={(e) => setCorreoElectronico(e.target.value)} // Actualiza el estado cuando el input cambia
        />
      </div>

      <div className="de">
        <h2>N° de cédula</h2>
        <input
          type="text"
          value={numeroCedula} // El valor del input está controlado por el estado 'numeroCedula'
          onChange={(e) => setNumeroCedula(e.target.value)} // Actualiza el estado cuando el input cambia
        />
      </div>

      {/* Botón con manejador de evento onClick */}
      <button onClick={handleAceptarClick} className='go'>
        <h2>Aceptar</h2>
      </button>
    </div></>
  );
}

export default DatosPersonales;