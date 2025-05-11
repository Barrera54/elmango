import { useState } from 'react';
import Navbar from './Navbar';
import './css/App.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Routes, Route } from "react-router-dom"; // Removí BrowserRouter as Router
import AboutUs from './lo';

function App() {
  const [showNav, setShowNav] = useState(false);
  const productos = [
    { id: 1, nombre: 'Laptop', Cantidad: 2,precio: 1200, hora: '10:30 AM' },
    { id: 2, nombre: 'Teléfono', Cantidad: 2, precio: 800, hora: '11:45 AM' },
    { id: 3, nombre: 'Tablet', Cantidad: 2, precio: 350, hora: '02:15 PM' },
    { id: 4, nombre: 'Auriculares', Cantidad: 2, precio: 150, hora: '03:20 PM' },
 
    
  ];

  return (
    <div className="APP">
      <header>
        <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
        <div className="he">El mango</div>
      </header>
      <Navbar show={showNav} />
      
      <Routes>
        <Route path="/" element={
          <div className="tabla-container">
            <h1 className="titulo-tabla"></h1>
            <table className="tabla-productos">
              <thead>
                <tr>
                  <th className="encabezado">Producto</th>
                     <th className="encabezado">Cantidad</th>
                  <th className="encabezado">Precio</th>
                  <th className="encabezado">Hora</th>
               
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id} className="fila-producto">
                    <td className="celda">{producto.nombre}</td>
                    <td className="celda">{producto.Cantidad}</td>
                    <td className="celda">${producto.precio.toFixed(2)}</td>
                    <td className="celda">{producto.hora}</td>
                  </tr>
                ))}
              </tbody>
            </table>
           
          </div>
           
        } />
        
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <div className="ni">
        <button>Domicilios</button>
      <button>Cliente</button>
      <button> Factura</button>
      <button>Anular</button>
      <button> Deudores</button>
      <button>Pago</button></div>
      <div className="mi"><h1>Total:</h1></div>
    </div>
  );
}

export default App;