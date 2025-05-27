import { useState } from 'react';
import Cabe from './menu';
import './ventas.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function Ventas() {
  const [showAccounting, setShowAccounting] = useState(false);
  const [showEmployeeSales, setShowEmployeeSales] = useState(false);
  const [showProductExceptions, setShowProductExceptions] = useState(false);

  const toggleAccounting = () => setShowAccounting(!showAccounting);
  const toggleEmployeeSales = () => setShowEmployeeSales(!showEmployeeSales);
  const toggleProductExceptions = () => setShowProductExceptions(!showProductExceptions);

  const data = {
    labels: ['Jose', 'maria', ],
    datasets: [
      {
        label: 'Ventas ',
        data: [65, 59, ],
        backgroundColor: 'rgb(21, 226, 150)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
       
      },
    },
  };

  return (
    <>
      <Cabe />
      <div className="dashboard">
        <h1>Venta</h1>
        
        <div className="section">
          <div className="section-header" onClick={toggleAccounting}>
            <h2>Contabilidad</h2>
           
          </div>
          {showAccounting && (
            <div className="accounting">
              <div className="accounting-item">
                <h3>Ventas del día</h3>
                <p><strong>Ventas del día:</strong> ---</p>
                <p><strong>Total de venta:</strong> ---</p>
              </div>
        
              <div className="accounting-item">
              <h3>Ventas del mes</h3>
                <p><strong>Ventas del mes:</strong> ---</p>
                <p><strong>Total de venta:</strong> ---</p>
              </div>
            </div>
          )}
        </div>

        <div className="divider"></div>

        <div className="section">
          <div className="section-header" onClick={toggleEmployeeSales}>
            <h2>Ventas empleado</h2>
            
          </div>
          {showEmployeeSales && (
            <div className="employee-sales">
              <Bar data={data} options={options} />;
            </div>
          )}
        </div>

        <div className="divider"></div>

        <div className="section">
          <div className="section-header" onClick={toggleProductExceptions}>
            <h2>Productos excepciones</h2>
          </div>
          {showProductExceptions && (
            <div className="product-exceptions">
              <div className="product-item">
                <h3>Producto estrella</h3>
                <p><strong>Producto:</strong> ---</p>
                <p><strong>Cantidad:</strong> #</p>
              </div>
              <div className="product-item">
                <h3>Producto menos deseado</h3>
                <p><strong>Producto:</strong> ---</p>
                <p><strong>Cantidad:</strong> #</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Ventas;