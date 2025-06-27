import { useState } from 'react';
import Cabe from './menu'; // Asegúrate de que este componente 'menu' existe y funciona correctamente.
import './css/busca.css'; // Asegúrate de que este archivo CSS existe.

// Importar los iconos de React que usarás
import { FaMagic, FaWater, FaToiletPaper, FaSprayCan, FaTshirt, FaBroom, FaFan } from 'react-icons/fa';

function ProductSearch() {
  // 1. Constante para almacenar los productos (el "catálogo" en el frontend)
  const productosAseo = [
    {
      id: 1,
      nombre: "Jabón en Polvo Eficaz",
      precio: 2.99,
      imagen: "https://via.placeholder.com/80/E8B88B/ffffff?text=Jabón",
      categoria: "Lavandería",
      icono: <FaMagic className="floating-icon" />, // Agregué una clase para estilo si la necesitas
    },
    {
      id: 2,
      nombre: "Detergente líquido premium",
      precio: 5.99,
      imagen: "https://via.placeholder.com/80/000000/ffffff?text=Detergente",
      categoria: "Lavandería",
      icono: <FaWater className="floating-icon" />,
    },
    {
      id: 3,
      nombre: "Papel higiénico suave",
      precio: 6.99,
      imagen: "https://via.placeholder.com/80/F5DEB3/000000?text=Papel",
      categoria: "Baño",
      icono: <FaToiletPaper className="floating-icon" />,
    },
    {
      id: 4,
      nombre: "Desinfectante pino",
      precio: 6.3,
      imagen: "https://via.placeholder.com/80/87CEEB/000000?text=Desinfectante",
      categoria: "Limpieza",
      icono: <FaSprayCan className="floating-icon" />,
    },
    {
      id: 5,
      nombre: "Suavizante de ropa floral",
      precio: 4.5,
      imagen: "https://via.placeholder.com/80/4682B4/ffffff?text=Suavizante",
      categoria: "Lavandería",
      icono: <FaTshirt className="floating-icon" />,
    },
    {
      id: 6,
      nombre: "Escoba de cerdas duras",
      precio: 8.99,
      imagen: "https://via.placeholder.com/80/8B4513/ffffff?text=Escoba",
      categoria: "Limpieza",
      icono: <FaBroom className="floating-icon" />,
    },
    {
      id: 7,
      nombre: "Trapeador de microfibra",
      precio: 7.99,
      imagen: "https://via.placeholder.com/80/4169E1/ffffff?text=Trapeador",
      categoria: "Limpieza",
      icono: <FaBroom className="floating-icon" />,
    },
    {
      id: 8,
      nombre: "Limpiador multiusos limón",
      precio: 2.99,
      imagen: "https://via.placeholder.com/80/FFD700/000000?text=Limpiador",
      categoria: "Limpieza",
      icono: <FaSprayCan className="floating-icon" />,
    },
    {
      id: 9,
      nombre: "Esponjas abrasivas",
      precio: 1.99,
      imagen: "https://via.placeholder.com/80/32CD32/ffffff?text=Esponjas",
      categoria: "Limpieza",
      icono: <FaSprayCan className="floating-icon" />,
    },
    {
      id: 10,
      nombre: "Ambientador de aerosoles lavanda",
      precio: 3.5,
      imagen: "https://via.placeholder.com/80/F5F5DC/000000?text=Ambientador",
      categoria: "Limpieza",
      icono: <FaFan className="floating-icon" />,
    },
    {
      id: 11,
      nombre: "Toallas húmedas desinfectantes",
      precio: 4.25,
      imagen: "https://via.placeholder.com/80/F8F8FF/000000?text=Toallas",
      categoria: "Baño",
      icono: <FaToiletPaper className="floating-icon" />,
    },
    {
      id: 12,
      nombre: "Detergente líquido Salvo",
      precio: 5.75,
      imagen: "https://via.placeholder.com/80/1E90FF/ffffff?text=Salvo",
      categoria: "Lavandería",
      icono: <FaWater className="floating-icon" />,
    },

  ];


  const [searchTerm, setSearchTerm] = useState("");


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); 
  };


  const agregarAlCarrito = (idProducto, nombreProducto) => {
    console.log(`¡Producto "${nombreProducto}" (ID: ${idProducto}) añadido al carrito!`);
    // Aquí podrías agregar lógica para añadirlo a un estado global de carrito
    // o enviarlo a un backend si tuvieras uno.
    alert(`¡"${nombreProducto}" añadido al carrito!`);
  };

  // 5. Filtrar los productos basándose en el término de búsqueda
  // Se ejecutará cada vez que 'searchTerm' o 'productosAseo' cambien.
  // Mejorar la búsqueda para incluir ID y nombre
  const productosFiltrados = productosAseo.filter((producto) =>
    producto.id.toString().includes(searchTerm) ||
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Componente de cabecera, asumiendo que ya está funcional */}
      <Cabe /> 

      <div className="inve">
        <h1 className='in'>Buscador de Producto</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre o categoría..."
          id="searchInput"
          value={searchTerm} // El valor del input está controlado por el estado
          onChange={handleSearchChange} // Cuando el input cambia, actualiza el estado
        />
        {/* El SVG de la lupa sigue siendo puramente decorativo en este contexto */}
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

      <div className="products-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <div key={producto.id} className="product-card">
              <div className="product-image-container">
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre} 
                  className="product-image"
                />
                {producto.icono}
              </div>
              <div className="product-info">
                <h2>{producto.nombre}</h2>
                <p className="product-price">${producto.precio.toLocaleString('es-CO', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</p>
                <button 
                  onClick={() => seleccionarProducto(producto.id, producto.nombre)}
                  className="select-btn"
                >
                  Seleccionar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No se encontraron productos que coincidan con su búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductSearch;