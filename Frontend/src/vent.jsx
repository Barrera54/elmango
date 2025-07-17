import { useState, useEffect } from 'react';
import Cabe from './menu';
import './css/ventas.css';
import axios from 'axios';

function Ventas() {
  const [showAccounting, setShowAccounting] = useState(false);
  const [showEmployeeSales, setShowEmployeeSales] = useState(false);
  const [showProductExceptions, setShowProductExceptions] = useState(false);

  const [employeeSales, setEmployeeSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // New state for current page
  const employeesPerPage = 2; // New constant for employees per page

  const toggleAccounting = () => setShowAccounting(!showAccounting);
  const toggleEmployeeSales = () => setShowEmployeeSales(!showEmployeeSales);
  const toggleProductExceptions = () => setShowProductExceptions(!showProductExceptions);

  const accounting = [
    // Aquí pon tus datos de contabilidad si los tienes
  ];

  const productExceptions = [
    // Aquí pon tus datos de productos excepcionales si los tienes
  ];

  useEffect(() => {
    obtenerVentasEmpleados();
  }, []);

  const obtenerVentasEmpleados = () => {
    axios.get('http://localhost:3001/ventas-empleado') // ✅ Usa tu ruta real
      .then(res => setEmployeeSales(res.data))
      .catch(err => console.error('Error al obtener ventas por empleado:', err));
  };

  const ventasFiltradas = employeeSales.filter(emp =>
    emp.emplead_nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the employees to display on the current page
  const startIndex = currentPage * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const displayedEmployees = ventasFiltradas.slice(startIndex, endIndex);

  // Functions to navigate pages
  const goToNextPage = () => {
    if (endIndex < ventasFiltradas.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
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
              <div className="search-container">
                {/* Search input if needed */}
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Empleado</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedEmployees.length > 0 ? (
                    displayedEmployees.map((emp) => (
                      <tr key={emp.id_Vent}>
                        <td>{emp.emplead_nom}</td>
                        <td>${emp.monto.toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No se encontraron resultados.</td> {/* Changed colspan to 2 */}
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <button onClick={goToPreviousPage} disabled={currentPage === 0}>
                  &larr; Anterior
                </button>
                <button onClick={goToNextPage} disabled={endIndex >= ventasFiltradas.length}>
                  Siguiente &rarr;
                </button>
              </div>
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