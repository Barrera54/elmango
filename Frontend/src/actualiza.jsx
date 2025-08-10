import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/actualiza.css';
import Cabe from './menu';

function ActualizarEmpleado() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    cedula: ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { nombre, telefono, correo, cedula } = formData;
    const updateFields = {};
    let url;
    let identifierProvided = false;
    let isUpdatingByName = false;
    let isUpdatingByPhone = false;

    // Lógica para determinar el identificador principal
    // Priorizamos el nombre si está presente y el teléfono está vacío o es inválido.
    if (nombre.trim() !== '') {
        url = `http://localhost:3001/cuenta/${nombre.trim()}`;
        isUpdatingByName = true;
        identifierProvided = true;
    } else if (telefono.trim() !== '') {
        const phoneRegex = /^[0-9]{10}$/; 
        if (phoneRegex.test(telefono.trim())) {
            url = `http://localhost:3001/cuenta/telefono/${telefono.trim()}`;
            isUpdatingByPhone = true;
            identifierProvided = true;
        } else {
            setMessage('El formato del teléfono es incorrecto. No se puede usar como identificador.');
            setIsError(true);
            return;
        }
    }

    if (!identifierProvided) {
        setMessage('Debe proporcionar el nombre o un teléfono válido para identificar al empleado.');
        setIsError(true);
        return;
    }
    
    // Llenar `updateFields` con los datos que se van a actualizar
    if (correo.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo.trim())) {
            setMessage('El formato del correo electrónico es incorrecto.');
            setIsError(true);
            return;
        }
        updateFields.correo = correo.trim();
    }
    
    if (cedula.trim() !== '') {
        updateFields.cedula = cedula.trim();
    }
    
    // Si estamos actualizando por nombre, el teléfono se considera un campo a actualizar.
    // No validamos su formato aquí, simplemente se envía tal cual.
    if (isUpdatingByName && telefono.trim() !== '') {
        updateFields.telefono = telefono.trim();
    }
    
    // Si estamos actualizando por teléfono, el nombre se considera un campo a actualizar.
    if (isUpdatingByPhone && nombre.trim() !== '') {
        updateFields.nombre = nombre.trim();
    }

    if (Object.keys(updateFields).length === 0) {
        setMessage('No hay campos válidos para actualizar.');
        setIsError(true);
        return;
    }

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateFields)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar el empleado.');
      }

      const result = await response.json();
      setMessage('✅ ' + result.message);
      setIsError(false);
      
      setTimeout(() => {
        navigate('/Principal'); 
      }, 2000); 
      
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ ' + error.message);
      setIsError(true);
    }
  };

  return (
    <>
      <Cabe/>
      <div className="cont">
        <h1 className='da'>Actualizar Empleado</h1>
        {message && (
          <div className={isError ? "error-message" : "success-message"}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h2>Nombre del Empleado</h2>
            <input 
              type="text" 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <h2>Teléfono</h2>
            <input 
              type="text" 
              name="telefono" 
              value={formData.telefono} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <h2>Nuevo Correo</h2>
            <input 
              type="email" 
              name="correo" 
              value={formData.correo} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <h2> Cédula</h2>
            <input 
              type="text" 
              name="cedula" 
              value={formData.cedula} 
              onChange={handleChange} 
            />
          </div>
          <button type="submit" className='go'>Actualizar</button>
        </form>
      </div>
    </>
  );
}

export default ActualizarEmpleado;