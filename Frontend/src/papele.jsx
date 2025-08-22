import React, { useState, useEffect, useMemo } from 'react';
import './css/papele.css';
import Cabe from './menu';
import axios from 'axios';

function ProductBin() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const productsPerPage = 3;

  // Obtener productos de la papelera
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await axios.get('http://localhost:3001/papelera-productos');
      setProducts(Array.isArray(res.data) ? res.data : []);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error al obtener productos de la papelera:', err);
      setErrorMsg('Error al obtener productos de la papelera. Verifica el servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Borrar producto definitivamente
  const handleDelete = async (idPALE) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto de la papelera?')) return;
    try {
      await axios.delete(`http://localhost:3001/papelera-productos/${idPALE}`);
      alert('🗑️ Producto eliminado de la papelera');
      obtenerProductos();
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      alert('❌ Error al eliminar producto de la papelera');
    }
  };

  // Recuperar producto al inventario
  const handleRecover = async (product) => {
    try {
      // Insertar en productos con valores por defecto
      await axios.post('http://localhost:3001/productos', {
        Codi_produ: product.Codi_produ || `REC-${product.idPALE}`, // generar código si no existe
        Nomproducto: product.Nomproducto,
        descripcion: product.descripcion || '',
        precio: product.precio || 0,
        stock: product.stock || 0, // por defecto 0
        categoria: product.categoria || 'General' // por defecto "General"
      });

      // Eliminar de la papelera después de insertarlo en inventario
      await axios.delete(`http://localhost:3001/papelera-productos/${product.idPALE}`);

      alert('♻️ Producto recuperado al inventario');
      obtenerProductos();
    } catch (err) {
      console.error('Error al recuperar producto:', err.response?.data || err.message);
      alert('❌ Error al recuperar producto');
    }
  };

  // Filtrado
  const filteredProducts = useMemo(() => {
    const term = (searchTerm || '').toLowerCase().trim();
    if (!term) return products;
    return products.filter(p =>
      String(p.Nomproducto || '').toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const formatCurrency = (value) => {
    const num = Number(value);
    if (Number.isNaN(num)) return value;
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <>
      <Cabe />
      <div className="inve">
        <h1 className='Papelera'>Papelera de producto</h1>
      </div>

      {loading ? (
        <div className="cargando">Cargando productos…</div>
      ) : errorMsg ? (
        <div className="error-message">{errorMsg}</div>
      ) : (
        <>
          {/* Tabla */}
          <table className='papel'>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map(product => (
                  <tr key={product.idPALE}>
                    <td>{product.Nomproducto}</td>
                    <td>{formatCurrency(product.precio)}</td>
                    <td>{product.descripcion}</td>
                    <td>
                      <button
                        className="recover-btn"
                        style={{ background: 'green', color: 'white', marginRight: '8px' }}
                        onClick={() => handleRecover(product)}
                      >
                        ♻️ Recuperar
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(product.idPALE)}
                        style={{ color: 'white', background: 'red' }}
                      >
                        🗑️ Borrar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No hay productos en la papelera o no se encontraron resultados.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>⬅️ Anterior</button>
            
            <span className="page-indicator">
              📄 Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
            </span>

            <button onClick={nextPage} disabled={currentPage === totalPages}>Siguiente ➡️</button>
          </div>
        </>
      )}
    </>
  );
}

export default ProductBin;
