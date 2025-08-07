import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/actualiza.css';
import Cabe from './menu';

function DatosPersonales() {
  const [idEmpleado, setIdEmpleado] = useState('');
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [numeroCedula, setNumeroCedula] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleAceptarClick = async () => {
    setError('');
    setSuccess('');

    // Validaciones
    if (!/^\d+$/.test(idEmpleado)) {
      setError('El ID del empleado debe ser un número válido');
      return;
    }

    if (!nombreEmpleado.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correoElectronico)) {
      setError('Por favor ingrese un correo electrónico válido');
      return;
    }

    if (!/^\d{5,15}$/.test(numeroCedula)) {
      setError('La cédula debe contener entre 5 y 15 dígitos');
      return;
    }

    try {
      // Solicitud PUT a la API
      const updateResponse = await fetch(`http://localhost:3001/cuenta/${idEmpleado}`, {
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

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.error || 'Error al actualizar');
      }

      // Éxito: mostrar mensaje y limpiar campos
      setSuccess('Datos personales actualizados correctamente');
      setIdEmpleado('');
      setNombreEmpleado('');
      setTelefono('');
      setCorreoElectronico('');
      setNumeroCedula('');

      // Esperar 2 segundos antes de redirigir
      setTimeout(() => {
        navigate('/inic');
      }, 2000);

    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    }
  };

  return (
    <>
      <Cabe />
      <div className="cont">
        <div className="da">Actualizar datos</div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-group">
          <h2>ID del empleado</h2>
          <input
            type="text"
            value={idEmpleado}
            onChange={(e) => setIdEmpleado(e.target.value)}
            placeholder="ID del empleado"
            required
          />
        </div>

        <div className="form-group">
          <h2>Nombre</h2>
          <input
            type="text"
            value={nombreEmpleado}
            onChange={(e) => setNombreEmpleado(e.target.value)}
            placeholder="Nombre completo"
            required
          />
        </div>

        <div className="form-group">
          <h2>Teléfono</h2>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Número de teléfono"
          />
        </div>

        <div className="form-group">
          <h2>Correo electrónico</h2>
          <input
            type="email"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className="form-group">
          <h2>N° de cédula</h2>
          <input
            type="text"
            value={numeroCedula}
            onChange={(e) => setNumeroCedula(e.target.value)}
            placeholder="Cédula"
            required
          />
        </div>

        <button onClick={handleAceptarClick} className="go">
          <h2>Actualizar Datos</h2>
        </button>
      </div>
    </>
  );
}

export default DatosPersonales;
