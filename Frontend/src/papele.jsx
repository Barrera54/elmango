import React, { useState, useEffect } from 'react';
import './css/papele.css';
import Cabe from './menu';
import axios from 'axios';

function ProductBin() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Obtener productos de la papelera (usa tu API, ajusta la ruta si es otra tabla)
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = () => {
    axios.get('http://localhost:3001/productos')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error al obtener productos:', err));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    const filteredProducts = products.filter(product =>
      product.Nomproducto.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
    console.log('Buscando:', searchTerm);
  };

  const handleRecover = (ID_produ) => {
    // Aquí depende de tu lógica: ¿marcas como recuperado? ¿mueves de tabla?
    alert(`Funcionalidad de recuperar pendiente para ID ${ID_produ}`);
  };

  const handleDelete = (ID_produ) => {
    const confirmar = window.confirm('¿Estás seguro de que quieres borrar este producto PERMANENTEMENTE?');
    if (!confirmar) return;

    axios.delete(`http://localhost:3001/productos/${ID_produ}`)
      .then(() => {
        alert('Producto eliminado permanentemente');
        setProducts(products.filter(p => p.ID_produ !== ID_produ));
      })
      .catch(err => {
        console.error('Error al borrar producto:', err);
        alert('Error al borrar producto');
      });
  };

  return (
    <>
      <Cabe />
      <div className="inve">
        <h1 className='in'>Papelera de producto</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Buscar</button>
      </div>

      <table className='papel'>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product.ID_produ}>
                <td>{product.Nomproducto}</td>
                <td>{product.precio}</td>
                <td>
                  <button className="mu-recover" onClick={() => handleRecover(product.ID_produ)}>Recuperar</button>
                  <button className="mu-delete" onClick={() => handleDelete(product.ID_produ)}>Borrar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay productos en la papelera o no se encontraron resultados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ProductBin;
