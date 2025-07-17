import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/actualiza.css';
import Cabe from './menu';

function DatosPersonales() {
  const [idEmpleado, setIdEmpleado] = useState('');
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [numeroCedula, setNumeroCedula] = useState('');
  const [empleados, setEmpleados] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/empleados')
      .then(res => res.json())
      .then(data => {
        console.log('Datos recibidos:', data);
        setEmpleados(data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleAceptarClick = async () => {
    console.log('Datos personales enviados:');
    console.log('ID Empleado:', idEmpleado);
    console.log('Empleado:', nombreEmpleado);
    console.log('Teléfono:', telefono);
    console.log('Correo Electrónico:', correoElectronico);
    console.log('Número de Cédula:', numeroCedula);

    try {
      const response = await fetch(`http://localhost:3001/empleados/${idEmpleado}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombreEmpleado,
          telefono: telefono,
          correo: correoElectronico,
          cedula: numeroCedula,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      alert('Empleado actualizado correctamente');

      navigate('/inic');

    } catch (error) {
      console.error(error);
      alert('Error al actualizar empleado');
    }
  };

  return (
    <>
      <Cabe/>
      <div className="cont">
        <div className="da">Datos personales</div>

        <div className="de">
          <h2>ID Empleado</h2>
          <input
            type="text"
            value={idEmpleado}
            onChange={(e) => setIdEmpleado(e.target.value)}
            placeholder="ID del empleado"
          />
        </div>

        <div className="cli">
          <h2>Empleado</h2>
          <input
            type="text"
            value={nombreEmpleado}
            onChange={(e) => setNombreEmpleado(e.target.value)}
          />
        </div>

        <div className="de">
          <h2>Teléfono</h2>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div className="de">
          <h2>Correo electrónico</h2>
          <input
            type="text"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
          />
        </div>

        <div className="de">
          <h2>N° de cédula</h2>
          <input
            type="text"
            value={numeroCedula}
            onChange={(e) => setNumeroCedula(e.target.value)}
          />
        </div>

        <button onClick={handleAceptarClick} className='go'>
          <h2>Aceptar</h2>
        </button>
      </div>
    </>
  );
}

export default DatosPersonales;
