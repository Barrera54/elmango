import React, { useState } from 'react';
import './css/deudo.css';
import Cabe from './menu';
import { useNavigate } from 'react-router-dom';

const Deudor = () => {
  // Estados para el nombre del cliente y el monto de la deuda.
  const [clientName, setClientName] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  // Estado para alternar entre la función de registro y actualización.
  const [isUpdating, setIsUpdating] = useState(false);
  // Hook para la navegación.
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario.
  const handleAccept = async (e) => {
    e.preventDefault();
    
    // Objeto de datos para el cuerpo de la solicitud.
    // Incluimos 'nomDeu' solo si no estamos actualizando.
    const data = {
      ...(isUpdating ? {} : { nomDeu: clientName }), 
      valoDeu: debtAmount
    };

    // Determinamos el método y la URL de la API según el estado 'isUpdating'.
    const method = isUpdating ? 'PUT' : 'POST';
    const url = isUpdating 
      ? `http://localhost:3001/deudor/${clientName}`
      : 'http://localhost:3001/deudor';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Manejar respuesta exitosa.
        const successMessage = isUpdating 
          ? 'Deuda actualizada con éxito'
          : 'Deudor registrado con éxito';
        
        // Usar una alerta para notificar al usuario.
        alert(successMessage); 
        
        // Limpiar los campos del formulario.
        setClientName('');
        setDebtAmount('');
        
        // Navegar a la página de clientes.
        navigate('/Clientes');
      } else {
        // Manejar errores del servidor.
        const error = await response.json();
        alert('Error: ' + error.error); 
      }
    } catch (err) {
      // Manejar errores de conexión.
      alert('Error de conexión con el servidor');
      console.error('Error:', err);
    }
  };

  return (
    <>
      <Cabe />
      
      <div className="deudo-container">
        {/* El título cambia dinámicamente. */}
        <h1 className="deudo-title">{isUpdating ? 'Actualizar Deuda' : 'Registro de Deudor'}</h1>
        
        <form onSubmit={handleAccept}>
          <div className="deudo-form-group">
            <label className="deudo-label">Nombre del Cliente</label>
            <input
              type="text"
              className="deudo-input"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Ingrese el nombre del cliente"
              required
            />
          </div>
          
          <div className="deudo-form-group">
            {/* La etiqueta cambia dinámicamente. */}
            <label className="deudo-label">{isUpdating ? 'Monto a Añadir' : 'Monto Adeudado'}</label>
            <input
              type="number"
              className="deudo-input"
              value={debtAmount}
              onChange={(e) => setDebtAmount(e.target.value)}
              placeholder={isUpdating ? 'Ingrese el monto a añadir' : 'Ingrese el monto adeudado'}
              required
            />
          </div>
          
          <div className="deudo-form-actions">
            {/* Botón para enviar el formulario. */}
            <button type="submit" className="deudo-button">
              {isUpdating ? 'Actualizar Deuda' : 'Registrar Deudor'}
            </button>
            {/* Botón para cambiar entre los dos modos. */}
            <button 
              type="button" 
              className="deudo-toggle-button"
              onClick={() => {
                setIsUpdating(!isUpdating);
                setClientName('');
                setDebtAmount('');
              }}
            >
              {isUpdating ? 'Cambiar a Registro' : 'Cambiar a Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Deudor;
