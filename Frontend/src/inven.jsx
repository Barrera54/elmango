import { useState } from 'react';
import Cabe from './menu';
import './css/inve.css';


function Ventas() {
  

  return (

    <div>    <Cabe/>
      <div className="inve">
        <h1 className='ve'>Inventario</h1>
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

      <table className="ta"> 
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td>Cafe colcafe</td>
            <td>5</td>
            <td>
              <button className="mu">
                Agregar
              </button>
              <button className="mu">
                Editar
              </button>
              <button className="mu" >
            Borrar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Ventas;