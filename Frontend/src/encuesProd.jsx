import React, { useState } from 'react';
import './css/Encuesta.css'; // Asegúrate de que el nombre del archivo CSS coincida
import Cabe from './menu';

const EncuestaProducto = () => {
  const [calificacion, setCalificacion] = useState(0);
  const [nombreProducto, setNombreProducto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleCalificacionChange = (index) => {
    setCalificacion(index + 1);
  };

  const handleSubmit = async () => {
    // Verificar que los campos obligatorios estén llenos
    if (!nombreProducto || calificacion === 0) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    const data = {
      producto_Cal: nombreProducto,
      calificacion: calificacion,
    };

    try {
      const response = await fetch('http://localhost:3000/guardarValoracionProducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMensaje('Encuesta enviada exitosamente!');
        // Redirigir al apartado principal después de 5 segundos
        setTimeout(() => {
          // Cambia '/inic.html' por la URL de tu página principal si es diferente
          window.location.href = '/inic.html';
        }, 5000); 
      } else {
        setMensaje(`Error: ${result.mensaje}`);
      }
    } catch (error) {
      console.error('Error al enviar la encuesta:', error);
      setMensaje('Error de conexión con el servidor.');
    }
  };

  return (
    <>
      <Cabe />
      <div className="encuesta-container">
        <h1 className="encuesta-title">Encuesta de Producto</h1>
        
        <div className="encuesta-seccion">
          <h2 className="seccion-title">Calificación</h2>
          <div className="calificacion-estrellas">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`estrella ${calificacion > index ? 'seleccionada' : ''}`}
                onClick={() => handleCalificacionChange(index)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        
        <div className="encuesta-seccion">
          <h2 className="seccion-title">Nombre del Producto</h2>
          <input
            type="text"
            className="input-producto"
            value={nombreProducto}
            onChange={(e) => setNombreProducto(e.target.value)}
          />
        </div>

        <button className="boton-enviar" onClick={handleSubmit}>
          Enviar
        </button>

        {mensaje && (
          <div className="mensaje-respuesta">
            {mensaje}
          </div>
        )}
      </div>
    </>
  );
};

export default EncuestaProducto;