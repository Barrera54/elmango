import React, { useState, useEffect } from 'react';
import './css/datemp.css'; 
import Cabe from './menu';
import { useNavigate } from 'react-router-dom';
import { Table } from "@radix-ui/themes";

function EmployeeData() {
  const [employees, setEmployees] = useState([]); // Lista de empleados
  const [currentPage, setCurrentPage] = useState(0); // Estado de paginación
  const employeesPerPage = 4; // Número de filas por página
  const navigate = useNavigate();

  useEffect(() => {
    // La llamada a la API apunta a la ruta /cuenta
    fetch('http://localhost:3001/cuenta')
      .then(res => res.json())
      .then(data => {
        console.log('Datos recibidos:', data);
        setEmployees(data); // Estado actualizado con datos de la API
      })
      .catch(err => console.error(err));
  }, []);

  // Calcular número total de páginas
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  // Obtener empleados para la página actual
  const employeesOnPage = employees.slice(
    currentPage * employeesPerPage,
    (currentPage + 1) * employeesPerPage
  );

  // Función para ir a la página siguiente (derecha)
  const nextPage = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  // Función para ir a la página anterior (izquierda)
  const previousPage = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="employee-data-container">
      <Cabe/>
      <div className="employee-table-card">
        <h1 className="table-title">Datos de Empleados</h1>
        <div className="table-wrapper">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell className="table-header-cell">Nombre</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="table-header-cell">Telefono</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="table-header-cell">Correo</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="table-header-cell">Cedula</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {employeesOnPage.map((employee, index) => (
                <Table.Row key={index} className="table-row">
                  <Table.RowHeaderCell className="table-cell">{employee.nombre}</Table.RowHeaderCell>
                  <Table.Cell className="table-cell">{employee.Telefono}</Table.Cell>
                  <Table.Cell className="table-cell">{employee.Correo}</Table.Cell>
                  <Table.Cell className="table-cell">{employee.Cedula}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
        <div className="pagination-controls">
          <button 
            onClick={previousPage} 
            disabled={currentPage === 0} 
            className="pagination-button"
          >
            Anterior
          </button>
          <span className="pagination-info">Página {currentPage + 1} de {totalPages}</span>
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages - 1 || totalPages === 0}
            className="pagination-button"
          >
            Siguiente
          </button>
        </div>
      </div>
      <div className="update-button-container">
        <button onClick={() => navigate('/Actualizaremmpl')} className="update-button">
          Actualizar
        </button>
      </div>
    </div>
  );
}

export default EmployeeData;