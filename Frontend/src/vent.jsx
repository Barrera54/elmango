import { useState, useEffect } from 'react';
import Cabe from './menu';
import './css/ventas.css';
import axios from 'axios';

function Ventas() {
  const [showAccounting, setShowAccounting] = useState(false);
  const [showEmployeeSales, setShowEmployeeSales] = useState(false);
  const [showProductExceptions, setShowProductExceptions] = useState(false);

  const [employeeSales, setEmployeeSales] = useState([]);
  const [totalDia, setTotalDia] = useState(0); 
  // Nuevo estado para el total general de todas las ventas
  const [totalGeneral, setTotalGeneral] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 2;

  const toggleAccounting = () => setShowAccounting(!showAccounting);
  const toggleEmployeeSales = () => setShowEmployeeSales(!showEmployeeSales);
  const toggleProductExceptions = () => setShowProductExceptions(!showProductExceptions);

  useEffect(() => {
    obtenerVentasEmpleados();
    obtenerTotalDia(); 
    obtenerTotalGeneral(); // Llamar a la nueva función de API
  }, []);

  const obtenerVentasEmpleados = () => {
    axios.get('http://localhost:3001/ventas-empleado')
      .then(res => setEmployeeSales(res.data))
      .catch(err => console.error('Error al obtener ventas por empleado:', err));
  };

  const obtenerTotalDia = () => {
    axios.get('http://localhost:3001/ventas-empleado/hoy') 
      .then(res => setTotalDia(res.data.total_dia || 0))
      .catch(err => console.error('Error al obtener total del día:', err));
  };

  // Nueva función para obtener el total general de todas las ventas
  const obtenerTotalGeneral = () => {
    axios.get('http://localhost:3001/ventas-empleado/total-hoy') // Endpoint de la nueva API
      .then(res => setTotalGeneral(res.data.total_dia || 0))
      .catch(err => console.error('Error al obtener total general:', err));
  };

  const ventasFiltradas = employeeSales.filter(emp =>
    emp.emplead_nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = currentPage * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const displayedEmployees = ventasFiltradas.slice(startIndex, endIndex);

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
                  <tr> 
                    <td>${totalDia.toLocaleString()}</td>
                    <td>${totalGeneral.toLocaleString()}</td>
                  </tr>
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
                {/* Aquí podrías poner un input para buscar empleados */}
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
                    <>
                      {displayedEmployees.map((emp) => (
                        <tr key={emp.id_Vent}>
                          <td>{emp.emplead_nom}</td>
                          <td>${emp.monto.toLocaleString()}</td>
                        </tr>
                      ))}
                      
                    </>
                  ) : (
                    <tr>
                      <td colSpan="2">No se encontraron resultados.</td>
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
                  {/* Aquí podrías listar productos excepcionales */}
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