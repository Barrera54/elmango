import React, { useState } from 'react';
import './css/papele.css'; // Asegúrate de crear este archivo CSS para tus estilos
import Cabe from './menu';
// Puedes tener un componente de botón si lo usas a menudo,
// pero por ahora lo incorporo directamente en el JSX.
// const Button = ({ children, onClick }) => (
//   <button onClick={onClick}>{children}</button>
// );

function ProductBin() {
  // Datos de ejemplo para los productos en la papelera
  const initialProducts = [
    { id: 1, name: 'SR.toronja', price: '3.000' },
    { id: 2, name: 'Manzana Orgánica', price: '2.500' },
    { id: 3, name: 'Leche Deslactosada', price: '4.200' },
    { id: 4, name: 'Pan Integral', price: '3.800' },
    { id: 5, name: 'Aguacate Hass', price: '1.500' },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para manejar el clic en el botón de búsqueda
  const handleSearchClick = () => {
    const filteredProducts = initialProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
    console.log('Buscando:', searchTerm);
  };

  // Función para recuperar un producto (simulado)
  const handleRecover = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    console.log(`Producto con ID ${productId} recuperado.`);
    alert(`Producto recuperado: ${initialProducts.find(p => p.id === productId)?.name}`);
  };

  // Función para borrar un producto permanentemente (simulado)
  const handleDelete = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    console.log(`Producto con ID ${productId} borrado permanentemente.`);
    alert(`Producto borrado: ${initialProducts.find(p => p.id === productId)?.name}`);
  };

  return (
    <>
    <Cabe/>
    <div className="inve">
          <h1 className='in'>Papelera de producto</h1>
        </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar..."
          id="searchInput"
        />

          <svg className="search-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

      <table className=' papel'>
        <thead> {/* Es buena práctica envolver los encabezados de tabla en <thead> */}
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th></th> {/* Añadir una columna para las acciones */}
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button className="mu-recover" onClick={() => handleRecover(product.id)}>Recuperar</button>
                  <button className="mu-delete" onClick={() => handleDelete(product.id)}>Borrar</button>
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

      {/* Los botones generales de Recuperar y Borrar se han movido a la tabla por fila
          Si prefieres botones globales que actúen sobre selecciones, la lógica sería más compleja.
          Aquí los dejo comentados si necesitas una funcionalidad global sin selección de fila específica.
      */}
      {/*
      <button className="mu">
        <div>Recuperar Seleccionados</div>
      </button>
      <button className="mu">
        <div>Borrar Seleccionados</div>
      </button>
      */}

      {/* No está claro qué se espera del <header> y el <div> final.
          Si son parte de un layout global, deberían estar en un componente padre o layout.
          Aquí se incluyen tal cual.
      */}
   
    </>
  );
}

export default ProductBin;