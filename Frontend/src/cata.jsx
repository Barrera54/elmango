import React, { useState, useEffect } from "react";
import "./css/cata.css";
import Cabe from './menu'; // Asegúrate de que este componente 'menu' existe y funciona correctamente.

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch products from the API
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3001/productos');
        if (!response.ok) {
          throw new Error(`Error HTTP! Status: ${response.status}`);
        }
        const data = await response.json();
        setProductos(data); // Update state with products from the API
      } catch (err) {
        setError('Error loading products: ' + err.message);
        console.error('Error loading products:', err);
      } finally {
        setLoading(false); // End loading, whether successful or with error
      }
    };

    fetchProductos(); // Call the fetch function when the component mounts
  }, []); // The empty array ensures it runs only once on mount

  return (
    <div>
      <Cabe />

      <div className="inve">
        <h1>Catálogo de Productos</h1>
      </div>

      {/* The search section is maintained, although it does not have real-time search functionality here */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar..."
          id="searchInput"
          // No real-time search logic here, it's just a visual input
        />
        
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
            <div key={producto.Imagen} className="lu">
              {/* Imagen del producto */}
              
              <div className="mu">
                <h1>Producto: {producto.Nomproducto}</h1>
                <h1>Precio: ${producto.precio ? producto.precio.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}</h1>
                <h1>Categoria: {producto.categoria}</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalogo;