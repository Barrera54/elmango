import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Cabe from './menu';
import './css/inve.css';

// Componente de notificación flotante
const Notification = ({ message, type }) => {
  return (
    <div className={`notification-spam ${type === 'error' ? 'error' : 'success'}`}>
      <div className="notification-content">
        {type === 'error' ? '❌' : '✅'} {message}
      </div>
    </div>
  );
};

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const productosPorPagina = 3;
  const navigate = useNavigate();

  // Define el umbral mínimo de stock
  const UMBRAL_MINIMO_STOCK = 5;

  useEffect(() => {
    // Función para obtener los productos (solo lectura)
    const fetchProductos = async () => {
      try {
        setCargando(true);
        const response = await fetch('http://localhost:3001/productos');
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Datos recibidos del backend:', data);
        setProductos(data);

        // Verificar stock y generar notificaciones
        const notificacionesGeneradas = data
          .filter(p => p.stock <= UMBRAL_MINIMO_STOCK)
          .map(p => ({
            id: p.ID_produ,
            message: `El producto "${p.Nomproducto}" está llegando a su cantidad menor a ${UMBRAL_MINIMO_STOCK}.`,
            type: 'error'
          }));
        setNotificaciones(notificacionesGeneradas);

      } catch (error) {
        console.error('Error al cargar productos:', error);
        setNotificaciones([{ id: 'error', message: 'Error al cargar los productos. Verifica que el servidor esté funcionando.', type: 'error' }]);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();

    // Función para limpiar notificaciones al hacer clic
    const handleDocumentClick = () => {
      setNotificaciones([]);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  // 🔹 Nueva función: borrar producto y enviarlo a la papelera
  const borrarProducto = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas enviar este producto a la papelera?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error al borrar producto: ${response.status}`);
      }

      const result = await response.json();

      // Notificación de éxito
      setNotificaciones([{ id, message: result.message, type: 'success' }]);

      // Eliminar del estado local
      setProductos(productos.filter(producto => producto.ID_produ !== id));
    } catch (error) {
      console.error('Error al borrar producto:', error);
      setNotificaciones([{ id: 'error', message: '❌ No se pudo enviar el producto a la papelera.', type: 'error' }]);
    }
  };

  const editarProducto = (id) => {
    console.log(`Editar producto con ID: ${id}`);
    navigate(`/Edit/${id}`);
  };

  // 🔹 CORRECCIÓN: Asegurar que siempre haya al menos 1 página
  const totalPaginas = Math.max(1, Math.ceil(productos.length / productosPorPagina));
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

      {/* Área para mostrar notificaciones flotantes */}
      <div className="notification-container">
        {notificaciones.map(notificacion => (
          <Notification 
            key={notificacion.id}
            message={notificacion.message}
            type={notificacion.type}
          />
        ))}
      </div>

      {cargando ? (
        <div className="cargando">Cargando productos...</div>
      ) : (
        <>
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
                    <td>{producto.stock}</td>
                    <td>${producto.precio}</td>
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
                  <td colSpan="4" className="no-data">
                    {productos.length === 0 
                      ? 'No hay productos disponibles en el inventario' 
                      : 'No hay productos en esta página'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {productos.length > 0 && (
            <div className="paginacion">
              <button className="pagina-btn" onClick={retrocederPagina} disabled={pagina === 1}>
                ⬅️ Anterior
              </button>
              
              <div className="pagina-actual-texto">
                <span className="pagina-numero">{pagina}</span>
                <span className="pagina-de">de {totalPaginas}</span>
              </div>

              <button className="pagina-btn" onClick={avanzarPagina} disabled={pagina === totalPaginas}>
                Siguiente ➡️
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Inventario;
