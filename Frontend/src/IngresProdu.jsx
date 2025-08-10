import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la redirección
import './css/Ingresprodu.css';
import Cabe from './menu';

const LlegadaProductoForm = () => {
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    Codi_produ: '',
    Nomproducto: '',
    descripcion: '', // Nuevo campo para la descripción
    precio: '',
    stock: '',
    categoria: ''
  });

  // Estado para manejar el mensaje de la API (éxito o error)
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Manejador de cambios para actualizar el estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Manejador de envío del formulario
  const handleSubmit = async () => {
    // Validar que los campos no estén vacíos, incluyendo la nueva descripción
    if (!formData.Codi_produ || !formData.Nomproducto || !formData.descripcion || !formData.precio || !formData.stock || !formData.categoria) {
      setMessage('Por favor, completa todos los campos.');
      setIsError(true);
      return;
    }

    try {
      // Lógica para enviar los datos a la API
      const response = await fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Codi_produ: formData.Codi_produ,
          Nomproducto: formData.Nomproducto,
          descripcion: formData.descripcion, // Usamos la descripción del formulario
          precio: parseFloat(formData.precio),
          stock: parseInt(formData.stock),
          categoria: formData.categoria
        })
      });

      if (!response.ok) {
        throw new Error('Error al insertar el producto.');
      }

      const result = await response.json();
      console.log('Producto agregado:', result);
      setMessage('✅ Producto agregado exitosamente.');
      setIsError(false);
      
      // Redirigir al apartado principal después del éxito
      setTimeout(() => {
        navigate('/Principal');
      }, 1500); // Esperamos 1.5 segundos para que el usuario vea el mensaje de éxito

    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ ' + error.message);
      setIsError(true);
    }
  };

  return (
    <>
      <Cabe/>
      <div className="llegadProdu-cont">
        <h1>Llegada de producto</h1>
        
        {/* Mensaje de éxito o error */}
        {message && (
          <div className={isError ? "error-message" : "success-message"}>
            {message}
          </div>
        )}

        <div className="llegadProdu-de">
          <h2>Código de producto</h2>
          <input 
            type="text" 
            name="Codi_produ"
            value={formData.Codi_produ}
            onChange={handleChange}
          />
        </div>

        <div className="llegadProdu-de">
          <h2>Producto</h2>
          <input 
            type="text" 
            name="Nomproducto"
            value={formData.Nomproducto}
            onChange={handleChange}
          />
        </div>

        {/* Nuevo campo para la descripción */}
        <div className="llegadProdu-de">
          <h2>Descripción</h2>
          <input 
            type="text" 
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="llegadProdu-de">
          <h2>Precio</h2>
          <input 
            type="text" 
            name="precio"
            value={formData.precio}
            onChange={handleChange}
          />
        </div>
        <div className="llegadProdu-de">
          <h2>Cantidad</h2>
          <input 
            type="text" 
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div className="llegadProdu-de">
          <h2>Rareza (Categoría)</h2>
          <select 
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="Comun">Comun</option>
            <option value="Temporada">Temporada</option>
          </select>
        </div>
        <button className='prod' onClick={handleSubmit}>
          <h2>Aceptar</h2>
        </button>
      </div>
    </>
  );
};

export default LlegadaProductoForm;