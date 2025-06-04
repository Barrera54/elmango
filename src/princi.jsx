import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cabe from './menu';
import './pinci.css';

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="main-container">
      <Cabe menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {menuOpen && <div className="overlay"></div>}

      {/* Nuevo div para el scroll de la tabla */}
      <div className="table-container"> 
        <table className='prin'>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí puedes mapear tus datos dinámicamente si los tienes */}
            <tr>
              <td>Leche colanta</td>
              <td>2</td>
              <td>8.400</td>
              <td>12:35</td>
            </tr>
            <tr>
              <td>Huevo</td>
              <td>12</td>
              <td>32.000</td>
              <td>12:35</td>
            </tr>
            <tr>
              <td>Quesito alpina pequeño</td>
              <td>1</td>
              <td>8.000</td>
              <td>12:36</td>
            </tr>
            <tr>
              <td>Quesito alpina pequeño</td>
              <td>1</td>
              <td>8.000</td>
              <td>12:36</td>
            </tr>
            <tr>
              <td>Quesito alpina pequeño</td>
              <td>1</td>
              <td>8.000</td>
              <td>12:36</td>
            </tr>
            <tr>
              <td>Quesito alpina pequeño</td>
              <td>1</td>
              <td>8.000</td>
              <td>12:36</td>
            </tr>
      
          </tbody>
        </table>
      </div>


      <div className="k">
        <button onClick={() => navigate('/Venta')}>Cliente</button>
        <button>Domicilios</button>
        <button>Factura</button>
        <button>Anular</button>
        <button>Deudores</button>
        <button>Pago</button>
      </div>

      <div className="i">
        <h1><b>Total: 48.400</b></h1>
      </div>
    </div>
  );
}

export default Menu;