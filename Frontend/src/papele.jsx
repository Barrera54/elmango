import React, { useState, useEffect } from 'react';
import './css/papele.css'; // Asegúrate de que tus estilos estén en este archivo
import Cabe from './menu';
import axios from 'axios';

// Componente de Notificación/Toast
const NotificationToast = ({ message, onConfirm, onCancel, type = 'alert', duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (type === 'alert') {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onConfirm) onConfirm(); // Llama a onConfirm si existe después de desaparecer
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [type, duration, onConfirm]);

  if (!isVisible) return null;

  return (
    <div className="notification-overlay"> {/* Este overlay es para el toast, no para el modal de confirmación */}
      <div className="notification-content">
        <p>{message}</p>
        {type === 'confirm' && (
          <div className="notification-actions">
            <button onClick={onConfirm} className="modal-button confirm">Sí</button>
            <button onClick={onCancel} className="modal-button cancel">No</button>
          </div>
        )}
      </div>
    </div>
  );
};

function ProductBin() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null); // Estado para controlar la notificación/modal
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const productsPerPage = 3; // Número de productos por página

  // Obtener productos de la papelera
  useEffect(() => {
    obtenerProductos();
  }, []); // Se ejecuta una vez al montar el componente

  const obtenerProductos = () => {
    axios.get('http://localhost:3001/papelera-productos')
      .then(res => {
        // Asegúrate de que cada producto tenga un ID_produ único para la key
        setProducts(res.data.map(p => ({ ...p, ID_produ: p.id || p.ID_produ })));
        setCurrentPage(1); // Reinicia a la primera página cada vez que se cargan los productos
      })
      .catch(err => {
        console.error('Error al obtener productos de la papelera:', err);
        setNotification({ message: 'Error al obtener productos de la papelera.', type: 'alert', onConfirm: () => setNotification(null) });
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    // Cuando se busca, filtramos los productos y reiniciamos la página a 1
    const filteredProducts = products.filter(product =>
      product.Nomproducto.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts); // Esto actualizará la lista de productos
    setCurrentPage(1); // Vuelve a la primera página después de la búsqueda
    console.log('Buscando:', searchTerm);
  };

  const handleRecover = (ID_produ) => {
    setNotification({
      message: `¿Estás seguro de que quieres recuperar el producto con ID ${ID_produ}?`,
      type: 'confirm',
      onConfirm: async () => { // Hacemos la función asíncrona
        try {
          // 1. Encontrar el producto completo en el estado 'products'
          const productToRecover = products.find(p => p.ID_produ === ID_produ);

          if (!productToRecover) {
            console.error('Producto a recuperar no encontrado:', ID_produ);
            setNotification({ message: 'Error: Producto no encontrado para recuperar.', type: 'alert', onConfirm: () => setNotification(null) });
            return;
          }

          // Desestructurar los campos necesarios para la API /productos
          const { ID_produ: Codi_produ, Nomproducto, descripcion, precio, stock, categoria } = productToRecover;

          // Asumiendo que 'stock' y 'categoria' también están presentes en los datos de la papelera
          // Si no lo están, necesitarías obtenerlos de otra manera o asignarlos por defecto.
          // Para este ejemplo, asumimos que la papelera guarda todos los datos originales.
          const stockValue = stock || 1; // Valor por defecto si stock no está presente
          const categoryValue = categoria || 'General'; // Valor por defecto si categoria no está presente


          // 2. Enviar el producto a la API de productos principales
          const recoverResponse = await axios.post('http://localhost:3001/productos', {
            Codi_produ: Codi_produ, // Usamos ID_produ de la papelera como Codi_produ para productos
            Nomproducto,
            descripcion,
            precio,
            stock: stockValue, // Usar el valor de stock
            categoria: categoryValue // Usar el valor de categoría
          });

          console.log('Producto recuperado en tabla principal:', recoverResponse.data);

          // 3. Si la recuperación fue exitosa, eliminar el producto de la papelera
          const deleteResponse = await axios.delete(`http://localhost:3001/papelera-productos/${ID_produ}`);
          console.log('Producto eliminado de papelera:', deleteResponse.data);

          // 4. Mostrar notificación de éxito y refrescar la lista
          setNotification({
            message: 'Producto recuperado con éxito.',
            type: 'alert',
            onConfirm: () => {
              setNotification(null);
              obtenerProductos(); // Vuelve a cargar los productos para actualizar la lista
            }
          });

        } catch (err) {
          console.error('Error al recuperar producto:', err);
          setNotification({ message: 'Error al recuperar producto.', type: 'alert', onConfirm: () => setNotification(null) });
        }
      },
      onCancel: () => setNotification(null)
    });
  };

  const handleDelete = (ID_produ) => {
    setNotification({
      message: `¿Estás seguro de que quieres eliminar permanentemente el producto con ID ${ID_produ}?`,
      type: 'confirm',
      onConfirm: () => {
        axios.delete(`http://localhost:3001/papelera-productos/${ID_produ}`)
          .then(() => {
            // Muestra la notificación de éxito
            setNotification({
              message: 'Producto eliminado correctamente.', // Mensaje de notificación
              type: 'alert',
              onConfirm: () => { // Esto se ejecutará cuando la notificación desaparezca automáticamente
                setNotification(null);
                obtenerProductos(); // Vuelve a cargar los productos para actualizar la lista y la paginación
              }
            });
          })
          .catch(err => {
            console.error('Error al borrar producto:', err);
            setNotification({ message: 'Error al borrar producto.', type: 'alert', onConfirm: () => setNotification(null) });
          });
      },
      onCancel: () => setNotification(null)
    });
  };

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Cabe />
      <div className="inve">
        <h1 className='Papelera'>Papelera de producto</h1>
      </div>
      
      {/* Renderiza la notificación/toast si el estado 'notification' no es nulo */}
      {notification && (
        <NotificationToast
          message={notification.message}
          onConfirm={notification.onConfirm}
          onCancel={notification.onCancel}
          type={notification.type}
        />
      )}

      {/* Barra de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearchClick}>Buscar</button>
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
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
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

      {/* Controles de paginación */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>⬅️ Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Siguiente ➡️</button>
      </div>
    </>
  );
}

export default ProductBin;