// Venta.jsx
import './css/ventas.css'

function Venta() {
  return (
    <div className="venta-container">
      <h1>Venta</h1>
      {/*RT13 como desarrollador frontend quiero crear un apartado donde muestre las ventas totales del dia o del mes */
      }
      <section className="contabilidad-section">
        <h2>Contabilidad</h2>
        <div className="contabilidad-grid">
          
          <div className="contabilidad-item">
            <strong>Ventas del día:</strong>
            <span>$1,200</span>
          </div>
        
          <div className="contabilidad-item">
            <strong>Ventas del mes:</strong>
            <span>$15,000</span>
          </div>
        </div>
      </section>

      <hr className="divider" />
{/*
RT05 Como desarrollador frontend quiero crear un apartado donde el empleado podrá ver cuando a vendido de cierto producto*/}
      <section className="ventas-empleado">
        <h3>Ventas empleado</h3>
        <table className="empleado-table">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Ventas empleado</th>
              <th>Total</th>
            </tr>
            <tr>
              <th></th>
              <th>Cantidad</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Juan</td>
              <td>5</td>
              <td>550</td>
            </tr>
            <tr>
              <td>María</td>
              <td>8</td>
              <td>380</td>
            </tr>
            <tr>
              <td>Pedro</td>
              <td>12</td>
              <td>5120</td>
            </tr>
            <tr>
              <td>Luisa</td>
              <td>6</td>
              <td>360</td>
            </tr>
            <tr>
              <td>Carlos</td>
              <td>9</td>
              <td>590</td>
            </tr>
            <tr>
              <td>Ana</td>
              <td>15</td>
              <td>5150</td>
            </tr>
          </tbody>
        </table>
      </section>

      <hr className="divider" />

      <section className="productos-excepciones">
        <h3>Productos excepciones</h3>
        <div className="producto-destacado">
          <strong>Producto estrella</strong>
          <div className="producto-info">
            <span><strong>Producto:</strong> Paleta dracula</span>
            <span><strong>Cantidad:</strong> 45</span>
          </div>
        </div>
        {/*RT06 Como desarrollador frontend quiero crear un apartado donde el usuario pueda ver cual es el producto mas solitado y el menos solicitado */}
        <div className="producto-destacado">
          <strong>Producto menos deseado</strong>
          <div className="producto-info">
            <span><strong>Producto:</strong> pan bimbo</span>
            <span><strong>Cantidad:</strong> 3</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Venta;