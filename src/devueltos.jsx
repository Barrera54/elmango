import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asumiendo que usas React Router para la navegación
import './Devuelto.css'; // Asegúrate de crear este archivo CSS para tus estilos
import Cabe from './menu';

function ProductoDevuelto() {
  // Estados para cada campo del formulario.
  // 'useState('')' inicializa cada campo con una cadena de texto vacía.
  const [nombreProducto, setNombreProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [total, setTotal] = useState('');

  // Hook de React Router para manejar la navegación entre rutas.
  const navigate = useNavigate();

  // Función que se ejecuta cuando se hace clic en el botón "Aceptar".
  const handleAceptarClick = () => {
    // Aquí puedes añadir la lógica para procesar los datos del producto devuelto.
    // Por ejemplo, enviar esta información a una API, validarla, etc.
    console.log('Datos de producto devuelto:');
    console.log('Producto:', nombreProducto);
    console.log('Cantidad:', cantidad);
    console.log('Total:', total);

    // Navega a la ruta '/inic' de tu aplicación usando React Router.
    // Si 'inic.html' es un archivo HTML estático externo, deberías usar:
    // window.location.href = 'inic.html';
    navigate('/inic');
  };

  return (
    <>
        <Cabe/>
    <div className="contdev">
     <h1 className="sa">Producto devuelto</h1>

      <div className="cli">
        <h2>Producto</h2>
        <input
          type="text"
          value={nombreProducto} // El valor del input está vinculado al estado 'nombreProducto'.
          onChange={(e) => setNombreProducto(e.target.value)} // Actualiza el estado cuando el usuario escribe.
        />
      </div>

      <div className="de">
        <h2>Cantidad</h2>
        <input
          type="text"
          value={cantidad} // El valor del input está vinculado al estado 'cantidad'.
          onChange={(e) => setCantidad(e.target.value)} // Actualiza el estado cuando el usuario escribe.
        />
      </div>

      <div className="de">
        <h2>Total</h2>
        <input
          type="text"
          value={total} // El valor del input está vinculado al estado 'total'.
          onChange={(e) => setTotal(e.target.value)} // Actualiza el estado cuando el usuario escribe.
        />
      </div>

      {/* Botón que, al hacer clic, ejecuta la función handleAceptarClick. */}
      <button onClick={handleAceptarClick}>
        <h2>Aceptar</h2>
      </button>
    </div></>
  );
}

export default ProductoDevuelto;