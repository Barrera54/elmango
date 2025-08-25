import { useState } from 'react';
import Cabe from './menu';
import './css/edit.css'; // Archivo base de CSS
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

function EditProductForm() { // Componente renombrado para mayor claridad
  const navigate = useNavigate();

  // Estado para el nombre original del producto a actualizar (usado en la URL del PUT)
  const [originalNomproducto, setOriginalNomproducto] = useState('');

  // Estado para los datos del producto a enviar (SIN incluir el nombre, ya que no se actualiza desde aquí)
  const [nuevoProducto, setNuevoProducto] = useState({
    Codi_produ: '', // Nuevo campo para el código del producto
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validación para el campo 'precio'
    if (name === 'precio') {
      const regex = /^[0-9.]*$/;
      if (!regex.test(value)) {
        alert('Solo se permiten números y un punto (.) para el precio.');
        return;
      }
    }

    // Validación para el campo 'stock'
    if (name === 'stock') {
      const regex = /^\d*$/;
      if (!regex.test(value)) {
        alert('Solo se permiten números para la cantidad.');
        return;
      }
    }

    // Actualiza el estado solo si la validación pasa
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Maneja el cambio en el campo del nombre original del producto
  const handleOriginalNomproductoChange = (e) => {
    setOriginalNomproducto(e.target.value);
  };

  // Función para actualizar un producto existente
  const handleUpdateProduct = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del envío del formulario
    setStatusMessage(''); // Limpia mensajes anteriores
    setMessageType('');

    if (!originalNomproducto) {
      setStatusMessage('Por favor, ingresa el nombre original del producto a actualizar.');
      setMessageType('error');
      return;
    }

    try {
      // Envía la solicitud PUT para actualizar el producto por su Nomproducto original (ingresado por el usuario)
      const response = await fetch(`http://localhost:3001/productos/${originalNomproducto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // Envía los campos que se van a actualizar, incluyendo Codi_produ
        body: JSON.stringify({
          Codi_produ: nuevoProducto.Codi_produ, // Incluye Codi_produ en el body
          descripcion: nuevoProducto.descripcion,
          precio: nuevoProducto.precio,
          stock: nuevoProducto.stock,
          categoria: nuevoProducto.categoria,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error desconocido al actualizar el producto');
      }

      setStatusMessage('Producto actualizado correctamente.');
      setMessageType('success');

      // Limpiar el formulario después de la actualización exitosa
      setOriginalNomproducto('');
      setNuevoProducto({
        Codi_produ: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: '',
      });

      // Redirige a la página principal después de un retraso
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirige después de 3 segundos

    } catch (error) {
      console.error('Error al actualizar Producto:', error);
      setStatusMessage('Error al actualizar Producto: ' + error.message);
      setMessageType('error');
    }
  };

  return (
    <div>
      <Cabe />

      <div className="container">
        <h1 className="title">Actualizar Producto</h1> {/* Título ajustado */}

        {/* Muestra el mensaje de estado */}
        {statusMessage && (
          <p className={`status-message ${messageType === 'success' ? 'success' : 'error'}`}>
            {statusMessage}
          </p>
        )}
        
        <form onSubmit={handleUpdateProduct} className="product-form">
          <input
            type="text"
            name="originalNomproducto"
            value={originalNomproducto}
            onChange={handleOriginalNomproductoChange}
            placeholder="Nombre del Producto a Actualizar"
            required
          />
          <input
            type="text"
            name="Codi_produ"
            value={nuevoProducto.Codi_produ}
            onChange={handleInputChange}
            placeholder="Código del producto"
            required
          />
          <input
            type="text"
            name="descripcion"
            value={nuevoProducto.descripcion}
            onChange={handleInputChange}
            placeholder="Descripción"
            required
          />
          <input
            type="text"
            name="precio"
            value={nuevoProducto.precio}
            onChange={handleInputChange}
            placeholder="Precio"
            required
          />
          <input
            type="text"
            name="stock"
            value={nuevoProducto.stock}
            onChange={handleInputChange}
            placeholder="Cantidad"
            required
          />
          <select
            name="categoria"
            value={nuevoProducto.categoria}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Comun">Común</option>
            <option value="Especial">Especial</option>
          </select>
          
          <button type="submit" className="btn">Actualizar Producto</button>
        </form>
      </div>
    </div>
  );
}

export default EditProductForm;