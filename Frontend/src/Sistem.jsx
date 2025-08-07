import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './css/sistem.css';
import Cabe from './menu';

const SystemRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert('Por favor selecciona una calificación');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/guardarValoracion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          calificacion: rating,
          comentario: comment
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.mensaje || 'Error al guardar la valoración');
        return;
      }

      console.log('Valoración guardada:', data);
      setSubmitted(true);

      setTimeout(() => {
        window.location.href = '/inic.html';
      }, 2000);
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Ocurrió un error al enviar la valoración');
    }
  };

  return (
    <> 
      <Cabe />
      <div className="cont">
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <h1 className="title">¿Cómo calificarías el sistema?</h1>
            
            <div className="rating-section">
              <p className="subtitle">Tu calificación:</p>
              <div className="stars-container">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FaStar
                      key={index}
                      className="star"
                      color={ratingValue <= (hover || rating) ? "#FFD700" : "#e4e5e9"}
                      size={40}
                      onClick={() => setRating(ratingValue)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  );
                })}
              </div>
              <p className="rating-text">
                {rating > 0 ? `Seleccionaste ${rating} estrella${rating > 1 ? 's' : ''}` : 'Selecciona una calificación'}
              </p>
            </div>

            <div className="comment-section">
              <label htmlFor="comentario" className="subtitle">Comentario adicional:</label>
              <textarea 
                id="comentario"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe tus comentarios..."
                rows="4"
              />
            </div>
            
            <button type="submit" className="submit-btn">
              Enviar valoración
            </button>
          </form>
        ) : (
          <div className="thank-you-message">
            <h2>¡Gracias por tu valoración!</h2>
            <p>Redirigiendo a la página principal...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SystemRating;
