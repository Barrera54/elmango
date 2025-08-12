import React, { useState, useEffect } from "react";
import "./css/cata.css";
import Cabe from './menu';
import { useNavigate } from 'react-router-dom';

// Componente de notificación flotante
const Notification = ({ message }) => {
  return (
    <div className="notification-spam">
      <div className="notification-content">
        <span role="img" aria-label="alert">⚠️</span> {message}
      </div>
    </div>
  );
};

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notificaciones, setNotificaciones] = useState([]); // Estado para notificaciones
  const navigate = useNavigate();

  // Define el umbral mínimo de stock
  const UMBRAL_MINIMO_STOCK = 5;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3001/productos');
        if (!response.ok) {
          throw new Error(`Error HTTP! Status: ${response.status}`);
        }
        const data = await response.json();
        setProductos(data);

        // Verificar stock y generar notificaciones
        const notificacionesGeneradas = data
          .filter(p => p.stock <= UMBRAL_MINIMO_STOCK)
          .map(p => ({
            id: p.ID_produ, // Usamos el ID para identificar la notificación
            message: `El producto "${p.Nomproducto}" está llegando a su cantidad menor a ${UMBRAL_MINIMO_STOCK}.`
          }));
        setNotificaciones(notificacionesGeneradas);

      } catch (err) {
        setError('Error cargando productos: ' + err.message);
        console.error('Error cargando productos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();

    // Función para manejar el clic en cualquier parte de la pantalla
    const handleDocumentClick = () => {
      setNotificaciones([]);
    };

    // Agregar el event listener al documento
    document.addEventListener('click', handleDocumentClick);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div>
      <Cabe />

      <div className="inve">
        <h1>Catálogo de Productos</h1>
      </div>

      {/* Área para mostrar notificaciones flotantes */}
      <div className="notification-container">
        {notificaciones.map(notificacion => (
          <Notification 
            key={notificacion.id}
            message={notificacion.message}
          />
        ))}
      </div>

      {loading ? (
        <p className="message">Cargando productos...</p>
      ) : error ? (
        <p className="message error-message">Error: {error}</p>
      ) : productos.length === 0 ? (
        <p className="message">No hay productos disponibles en el catálogo.</p>
      ) : (
        <div className="ld">
          {productos.map((producto) => (
            <div key={producto.ID_produ} className="lu">
              {/* Imagen del producto */}
              <img
                src={producto.imagen || "https://placehold.co/150x150/cccccc/ffffff?text=Sin+Imagen"}
                alt={producto.Nomproducto}
                className="product-image-small"
              />
              <div className="mu">
                <h1>Producto: {producto.Nomproducto}</h1>
                <h1>Precio: ${producto.precio ? producto.precio.toLocaleString('es-CO', { minimumFractionDigits: 2 }) : 'N/A'}</h1>
                <h1>Categoría: {producto.categoria}</h1>
                <h1>Código: {producto.Codi_produ}</h1>
                <button onClick={() => navigate('/Edit')}>Editar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalogo;