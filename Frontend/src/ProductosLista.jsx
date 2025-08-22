import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductosLista = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = () => {
    axios.get('http://localhost:3001/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al obtener productos:', err));
  };

  const eliminarProducto = (ID_produ) => {
    const confirmar = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (!confirmar) return;

    axios.delete(`http://localhost:3001/productos/${ID_produ}`)
      .then(() => {
        alert('Producto eliminado');
        setProductos(productos.filter(p => p.ID_produ !== ID_produ));
      })
      .catch(err => {
        console.error('Error al eliminar producto:', err);
        alert('Error al eliminar producto');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {productos.map(p => (
            <li key={p.ID_produ} style={{ marginBottom: '10px' }}>
              <strong>{p.Nomproducto}</strong> - ${p.precio}
              <button
                onClick={() => eliminarProducto(p.ID_produ)}
                style={{
                  marginLeft: '10px',
                  color: 'white',
                  backgroundColor: 'red',
                  border: 'none',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductosLista;