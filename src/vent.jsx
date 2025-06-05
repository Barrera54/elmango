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
        backgroundColor: ' #99FFCF',
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
  const vent = {
    labels: ['Dia', 'Mes', ],
    datasets: [
      {
        label: 'Contabilidad ',
        
        data: [20000, 59000],
        backgroundColor: ' #94F0A9',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const valor = {
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
  const produ = {
    labels: ['Coco cola', 'Huevos' ],
    datasets: [
      {
        label: 'Producto Excepcionales',
    
        data: [21, 10],
        backgroundColor: ' #BBFFAD',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const soliti = {
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
        <h1>Ventas</h1>
        
        <div className="section">
          <div className="section-header" onClick={toggleAccounting}>
            <h2>Contabilidad</h2>
           
          </div>
          {showAccounting && (
            <div className="accounting">
              <div className="accounting-item">
              <Bar data={vent} options={valor} />
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
              <Bar data={data} options={options} />
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
              <Bar data={produ} options={soliti} />
              </div>
             
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Ventas;