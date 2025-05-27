import { useState } from 'react';
import Cabe from './menu';
import './pinci.css';

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (<>
     <Cabe menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <div className="ki">
     
      <table >
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Leche colanta</td>
            <td>2</td>
            <td>8.400</td>
            <td>12:35</td>
          </tr>
          <tr>
            <td>hueva</td>
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
      
        </tbody>
      </table>

      <div className='ki'>
        <div className="m">
        <button>
          <a href="clien.html">Cliente</a>
        </button>
        <button>
          <a href="domi.html">Domicilios</a>
        </button>
        <button>Factura</button>
        <button>Anular</button>
        <button>
          <a href="deudor.html">Deudores</a>
        </button>
        <button>
          <a href="select.html">Pago</a>
        </button></div>
      </div>
      <div className='i '>
        <h1>
          <b>Total: 48.400</b>
        </h1>
      </div>
    </div></>
  );
}

export default Menu;