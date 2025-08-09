import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Cabe from './menu';
import './css/inve.css';

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const productosPorPagina = 3;
  const navigate = useNavigate(); // Instancia navigate

  useEffect(() => {
    fetchProductos();
  }, []);

  // Función para obtener los productos del backend
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

  // Función para borrar un producto y moverlo a la papelera
  const borrarProducto = async (id) => {
    // Encuentra el producto a borrar por su ID
    const productoABorrar = productos.find(p => p.ID_produ === id);

    if (!productoABorrar) {
      console.error('Producto no encontrado para borrar:', id);
      return;
    }

    // Prepara los datos para enviar a la papelera
    const { Nomproducto, precio, descripcion } = productoABorrar;

    try {
      // Envía el producto a la API de papelera
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

      // Si se movió a la papelera exitosamente, ahora elimina el producto de la lista
      // (asumiendo que también quieres eliminarlo de la tabla principal en el backend)
      // Si el borrado de la tabla principal se maneja en el backend después de mover a papelera,
      // podrías necesitar otra API call aquí o que la API de papelera lo haga.
      // Por ahora, solo lo eliminamos del estado local para que desaparezca de la UI.
      setProductos(productos.filter(producto => producto.ID_produ !== id));
      console.log(`Producto con ID ${id} borrado de la UI.`);

    } catch (error) {
      console.error('Error al borrar o mover producto a papelera:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const editarProducto = (id) => {
    console.log(`Editar producto con ID: ${id}`);
    navigate(`/Edit/${id}`); // Mejor: pasa el ID
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
                    {/* El botón de editar ahora usa la función editarProducto */}
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
