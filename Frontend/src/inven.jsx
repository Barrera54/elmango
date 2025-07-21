import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Importa useNavigate
import Cabe from './menu';
import './css/inve.css';

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const productosPorPagina = 3;
  const navigate = useNavigate(); // ✅ Instancia navigate

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:3001/productos');
      const data = await response.json();
      console.log('Datos recibidos del backend:', data);
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const borrarProducto = (id) => {
    console.log(`Borrar producto con ID: ${id}`);
  };

  const editarProducto = (id) => {
    console.log(`Editar producto con ID: ${id}`);
    navigate(`/Edit/${id}`); // ✅ Mejor: pasa el ID
  };

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const inicio = (pagina - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPagina = productos.slice(inicio, fin);

  const avanzarPagina = () => {
    if (pagina < totalPaginas) {
      setPagina(pagina + 1);
    }
  };

  const retrocederPagina = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  return (
    <div>
      <Cabe />
      <div className="inve">
        <h1 className='ve'>Inventario</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar..."
        />
        <svg className="search-icon" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="lupa-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF512F" />
              <stop offset="50%" stopColor="#DD2476" />
              <stop offset="100%" stopColor="#1A2980" />
            </linearGradient>
          </defs>
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="url(#lupa-gradient)" />
        </svg>
      </div>

      <table className="ta">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosPagina.length > 0 ? (
            productosPagina.map((producto) => (
              <tr key={producto.ID_produ}>
                <td>{producto.Nomproducto}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.precio}</td>
                <td>
                  <div className="acciones">
                    <button onClick={() => navigate('/Edit')}>Editar</button>
                    <button onClick={() => borrarProducto(producto.ID_produ)}>Borrar</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">No hay productos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="paginacion">
        <button className="pagina-btn" onClick={retrocederPagina} disabled={pagina === 1}>⬅️ Anterior</button>
        <span className="pagina-info">Página {pagina} de {totalPaginas}</span>
        <button className="pagina-btn" onClick={avanzarPagina} disabled={pagina === totalPaginas}>Siguiente ➡️</button>
      </div>
    </div>
  );
}

export default Inventario;
