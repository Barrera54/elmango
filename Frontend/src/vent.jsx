import { useState } from 'react';
import Cabe from './menu';
import './css/ventas.css';

function Ventas() {
  const [showAccounting, setShowAccounting] = useState(false);
  const [showEmployeeSales, setShowEmployeeSales] = useState(false);
  const [showProductExceptions, setShowProductExceptions] = useState(false);

  const toggleAccounting = () => setShowAccounting(!showAccounting);
  const toggleEmployeeSales = () => setShowEmployeeSales(!showEmployeeSales);
  const toggleProductExceptions = () => setShowProductExceptions(!showProductExceptions);

  const employeeSales = [
    { name: 'Jose', sales: 65 },
    { name: 'Maria', sales: 59 },
  ];

  const accounting = [
    { period: 'Dia', amount: 20000 },
    { period: 'Mes', amount: 59000 },
  ];

  const productExceptions = [
    { product: 'Coca Cola', quantity: 21 },
    { product: 'Huevos', quantity: 10 },
  ];

  return (
    <>
      <Cabe />
      <div className="dashboard">
        <h1>Ventas</h1>

        <div className="section">
          <div className="section-header" onClick={toggleAccounting}>
            <h2>Contabilidad</h2>
          </div>
          {showAccounting && (
            <div className="accounting">
              <table>
                <thead>
                  <tr>
                    <th>Periodo</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {accounting.map((item, index) => (
                    <tr key={index}>
                      <td>{item.period}</td>
                      <td>${item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="divider"></div>

        <div className="section">
          <div className="section-header" onClick={toggleEmployeeSales}>
            <h2>Ventas por Empleado</h2>
          </div>
          {showEmployeeSales && (
            <div className="employee-sales">
              <table>
                <thead>
                  <tr>
                    <th>Empleado</th>
                    <th>Ventas</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeSales.map((emp, index) => (
                    <tr key={index}>
                      <td>{emp.name}</td>
                      <td>{emp.sales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="divider"></div>

        <div className="section">
          <div className="section-header" onClick={toggleProductExceptions}>
            <h2>Productos Excepcionales</h2>
          </div>
          {showProductExceptions && (
            <div className="product-exceptions">
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {productExceptions.map((prod, index) => (
                    <tr key={index}>
                      <td>{prod.product}</td>
                      <td>{prod.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Ventas;
