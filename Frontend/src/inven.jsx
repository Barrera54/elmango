import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Cabe from './menu';
import './css/inve.css';

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

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [notificaciones, setNotificaciones] = useState([]); // Estado para notificaciones
  const productosPorPagina = 3;
  const navigate = useNavigate(); // Instancia navigate

  // Define el umbral mínimo de stock
  const UMBRAL_MINIMO_STOCK = 5;

  useEffect(() => {
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

  // Función para obtener los productos del backend
  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:3001/productos');
      const data = await response.json();
      console.log('Datos recibidos del backend:', data);
      setProductos(data);

      // Verificar stock y generar notificaciones
      const notificacionesGeneradas = data
        .filter(p => p.stock <= UMBRAL_MINIMO_STOCK)
        .map(p => ({
          id: p.ID_produ, // Usamos el ID para identificar la notificación
          message: `El producto "${p.Nomproducto}" está llegando a su cantidad menor a ${UMBRAL_MINIMO_STOCK}.`
        }));
      setNotificaciones(notificacionesGeneradas);

    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  // Función para borrar un producto y moverlo a la papelera
  const borrarProducto = async (id) => {
    const productoABorrar = productos.find(p => p.ID_produ === id);

    if (!productoABorrar) {
      console.error('Producto no encontrado para borrar:', id);
      return;
    }

    const { Nomproducto, precio, descripcion } = productoABorrar;

    try {
      const responsePapelera = await fetch('http://localhost:3001/papelera_producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Nomproducto, precio, descripcion }),
      });

      if (!responsePapelera.ok) {
        throw new Error(`Error HTTP al mover a papelera: ${responsePapelera.status}`);
      }

      const dataPapelera = await responsePapelera.json();
      console.log('Producto movido a papelera exitosamente:', dataPapelera);

      setProductos(productos.filter(producto => producto.ID_produ !== id));
      console.log(`Producto con ID ${id} borrado de la UI.`);

      // Actualizar notificaciones después de borrar
      fetchProductos();

    } catch (error) {
      console.error('Error al borrar o mover producto a papelera:', error);
    }
  };

  const editarProducto = (id) => {
    console.log(`Editar producto con ID: ${id}`);
    navigate(`/Edit/${id}`);
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

      {/* Área para mostrar notificaciones flotantes */}
      <div className="notification-container">
        {notificaciones.map(notificacion => (
          <Notification 
            key={notificacion.id}
            id={notificacion.id}
            message={notificacion.message}
          />
        ))}
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
                <td>{producto.stock}</td>
                <td>{producto.precio}</td>
                <td>
                  <div className="acciones">
                    <button onClick={() => editarProducto(producto.ID_produ)}>Editar</button>
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