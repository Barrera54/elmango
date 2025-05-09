{/*
RT08 Como desarrollador frontend quiero diseñar un apartado de clientes donde aparezcan los cliente frecuentes y lo deudores*/}
import './css/cliente.css'
function client(){
    return(
       <div className="venta-container">
      <h1>Cliente</h1>
     
{/*
RT05 Como desarrollador frontend quiero crear un apartado donde el empleado podrá ver cuando a vendido de cierto producto*/}
      <section className="ventas-empleado">
        <h3>Ventas empleado</h3>
        <table className="empleado-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Celular</th>
              <th>N° de C.C</th>
            </tr>
           
          </thead>
          <tbody>
            <tr>
              <td>Juan</td>
              <td>545 2451 666</td>
              <td>3445453</td>
            </tr>
            <tr>
              <td>María</td>
              <td>85151</td>
              <td>380 2654</td>
            </tr>
            <tr>
              <td>Pedro</td>
              <td>124545</td>
              <td>5120241</td>
            </tr>
            <tr>
              <td>Luisa</td>
              <td>6354475</td>
              <td>36545440</td>
            </tr>
            <tr>
              <td>Carlos</td>
              <td>931351</td>
              <td>590 3541</td>
            </tr>
            <tr>
              <td>Ana</td>
              <td>152112345</td>
              <td>515155140</td>
            </tr>
          </tbody>
        </table>
      </section>

      <hr className="divider" />

      <section className="productos-excepciones">
        <h3>Clientea deudores</h3>
    <table className="empleado-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Celular</th>
         
            </tr>
           
          </thead>
          <tbody>
            <tr>
              <td>Juan</td>
              <td>70000</td>
            
            </tr>
            <tr>
              <td>María</td>
              <td>800000</td>
         
            </tr>
            <tr>
              <td>Pedro</td>
              <td>2000</td>
          
            </tr>
            <tr>
              <td>Luisa</td>
              <td>700</td>
           
            </tr>
            <tr>
              <td>Carlos</td>
              <td>500</td>
           
            </tr>
            <tr>
              <td>Ana</td>
              <td>5000</td>
           
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    )
}
export default client;