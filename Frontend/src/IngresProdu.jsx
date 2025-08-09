import React from 'react';
import './css/Ingresprodu.css';
import { Link } from 'react-router-dom';
import Cabe from './menu';

const LlegadaProductoForm = () => {
  return (
    <>
    <Cabe/>
    <div className="llegadProdu-cont">
      <h1>Llegada de producto</h1>
  
      <div className="llegadProdu-de">
        <h2>Producto</h2>
        <input type="text" />
      </div>
      <div className="llegadProdu-de">
        <h2>Precio</h2>
        <input type="text" />
      </div>
      <div className="llegadProdu-de">
        <h2>Cantidad</h2>
        <input type="text" />
      </div>
      <div className="llegadProdu-de">
        <h2>Rareza</h2>
        <select>
          <option value="administrador"></option>
          <option value="editor">Comun</option>
          <option value="lector">Temporada</option>
        </select>
      </div>
      <button>
        <   Link to="/Principal">
          <h2>Aceptar</h2>
        </Link>
      </button>
    </div>
    </>
  );
};

export default LlegadaProductoForm;