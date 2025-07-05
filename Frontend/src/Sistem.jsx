import React, { useState } from 'react'; // Necesitamos useState para manejar el estado de la calificación y el comentario
import { useNavigate } from 'react-router-dom'; // Para manejar la navegación al enviar la valoración
import Cabe from './menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'; 
import './css/sistem.css'; // Asegúrate de tener este archivo CSS para tus estilos

function SystemRating() {
  // Estado para la calificación seleccionada (0 a 5 estrellas)
  const [rating, setRating] = useState(0); 
  // Estado para el texto del comentario
  const [comment, setComment] = useState(''); 

  // Hook de React Router para manejar la navegación
  const navigate = useNavigate();

  // Función para manejar el clic en una estrella
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating); // Actualiza el estado 'rating'
  };

  // Función para manejar el cambio en el campo de texto del comentario
  const handleCommentChange = (event) => {
    setComment(event.target.value); // Actualiza el estado 'comment'
  };

  // Función que se ejecuta al hacer clic en el botón "Enviar"
  const handleEnviarClick = () => {
    // Aquí puedes añadir la lógica para procesar la valoración y el comentario.
    // Por ejemplo, enviar esta información a una API.
    console.log('Valoración del sistema enviada:');
    console.log('Calificación:', rating);
    console.log('Comentario:', comment);

    // Navega a la ruta '/inic' (similar a como lo hace ProductoDevuelto)
    // Asegúrate de que esta ruta esté configurada en tu React Router.
    navigate('/inic');
    // Si 'inic.html' es un archivo HTML estático externo, deberías usar:
    // window.location.href = 'inic.html';
  };

  return  <>
   <Cabe/>
    <div className="contis">
      <h1 className='ssi'>Valoración del Sistema</h1>
      <div className="clin">
        <h2>Calificación</h2>
        <div >
          {/* Mapea sobre un array para renderizar 5 estrellas */}
          {[1, 2, 3, 4, 5].map((starValue) => (
            <FontAwesomeIcon
              key={starValue}
              // Condicionalmente renderiza la estrella sólida o regular
              // basándose en si el valor de la estrella es menor o igual a la calificación actual.
              icon={starValue <= rating ? faStarSolid : faStarRegular}
              onClick={() => handleStarClick(starValue)} // Asocia el clic a la función de manejo
              className="star-icon" // Clase para estilos CSS
            />
          ))}
        </div>
      </div>
      <div className="den">
        <h2>Comentario</h2>
        <input
          type="text"
          value={comment} // El valor del input está vinculado al estado 'comment'
          onChange={handleCommentChange} // Actualiza el estado cuando el usuario escribe
          placeholder="Escribe tu comentario aquí..."
        />
      </div>

      {/* Botón que, al hacer clic, ejecuta la función handleEnviarClick */}
      <button onClick={handleEnviarClick}>
        <h2>Enviar</h2>
      </button>
    </div>
  </>
}

export default SystemRating;