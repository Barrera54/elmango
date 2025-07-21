import { useState } from 'react';
import Cabe from './menu'; // Asegúrate de que este componente 'menu' existe y funciona correctamente.
import './css/busca.css'; // Asegúrate de que este archivo CSS existe.

function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundProduct, setFoundProduct] = useState(null); // Estado para almacenar el producto encontrado
  const [loading, setLoading] = useState(false); // Estado para indicar si los datos están cargando
  const [error, setError] = useState(null); // Estado para manejar errores de la API

  // Función para buscar el producto por código
  const searchProductByCode = async () => {
    if (!searchTerm) {
      setFoundProduct(null);
      setError(null);
      return; // No buscar si el término está vacío
    }

    setLoading(true);
    setError(null);
    setFoundProduct(null); // Limpiar el producto anterior

    try {
      const response = await fetch(`http://localhost:3001/productos/${searchTerm}`);
      if (response.status === 404) {
        setError('Producto no encontrado con ese código.');
        setFoundProduct(null);
      } else if (!response.ok) {
        throw new Error(`Error HTTP! Estado: ${response.status}`);
      } else {
        const data = await response.json();
        setFoundProduct(data); // Almacena el producto encontrado
      }
    } catch (err) {
      setError('Error al buscar el producto: ' + err.message);
      console.error('Error al buscar el producto:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchProductByCode();
    }
  };

  return (
    <div>
      {/* Componente de cabecera, asumiendo que ya está funcional */}
      <Cabe />

      <div className="inve">
        <h1 className='busca'>Buscador de Producto </h1>
      </div>

      <div className="search-cont">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por código de producto..."
          id="searchInput"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress} // Permite buscar al presionar Enter
        />
       
      </div>

      {loading ? (
        <p className="no-results">Cargando producto...</p>
      ) : error ? (
        <p className="no-results" style={{ color: 'red' }}>{error}</p>
      ) : foundProduct ? (
        <div className="products-table-container" style={{ maxWidth: '800px', margin: '2rem auto', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead style={{ background: '#f2f2f2' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd', color: '#333' }}>Nombre del Producto</th>
                <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #ddd', color: '#333' }}>Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1rem', textAlign: 'left', color: '#555' }}>{foundProduct.	Nomproducto}</td>
                <td style={{ padding: '1rem', textAlign: 'right', color: '#2ecc71', fontWeight: 'bold' }}>${foundProduct.precio.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        searchTerm && <p className="no-results">Ingrese un código de producto para buscar.</p>
      )}
    </div>
  );
}

export default ProductSearch;