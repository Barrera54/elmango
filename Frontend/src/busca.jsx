import { useState, useEffect } from 'react';
import Cabe from './menu';
import './css/busca.css';

function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todos los productos al inicio
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3001/productos`);
        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        const data = await response.json();
        setAllProducts(data);
      } catch (err) {
        setError('Error al cargar productos: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Filtrar mientras se escribe
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = allProducts.filter(
      prod =>
        prod.Nomproducto.toLowerCase().includes(term) ||
        String(prod.codigo).includes(term)
    );
    setFilteredProducts(results);
  }, [searchTerm, allProducts]);

  return (
    <div>
      <Cabe />

      <div className="inve">
        <h1 className='busca'>Buscador de Producto</h1>
      </div>

      <div className="search-cont">
        <input
          type="text"
          className="search-input"
          placeholder="Ingrese nombre del producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p className="no-results">Cargando productos...</p>}
      {error && <p className="no-results" style={{ color: 'red' }}>{error}</p>}

      {filteredProducts.length > 0 && (
        <div className="products-table-container" style={{ maxWidth: '800px', margin: '2rem auto', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead style={{ background: '#f2f2f2' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Nombre del Producto</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Precio</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod) => (
                <tr key={prod.codigo} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>{prod.Nomproducto}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: '#2ecc71', fontWeight: 'bold' }}>
                    ${prod.precio.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {searchTerm && !loading && filteredProducts.length === 0 && !error && (
        <p className="no-results">No se encontraron productos relacionados.</p>
      )}
    </div>
  );
}

export default ProductSearch;