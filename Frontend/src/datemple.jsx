import React, { useState, useEffect } from 'react';
import './css/datemp.css'; 
import Cabe from './menu';
import { useNavigate } from 'react-router-dom';
import { Table } from "@radix-ui/themes";
function EmployeeData() {
  const [empleados, setEmpleados] = useState([]); // Lista de empleados
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/empleados')
      .then(res => res.json())
      .then(data => {
        console.log('Datos recibidos:', data);
        setEmpleados(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Cabe/>
      <div>
        <h1 className="ple">Datos empleados</h1>
      </div>
      <Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Telefono</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Correo</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Cedula</Table.ColumnHeaderCell>
		</Table.Row>
	</Table.Header>

	<Table.Body>
		<Table.Row>
			<Table.RowHeaderCell>Marlon Palacio</Table.RowHeaderCell>
			<Table.Cell>356465</Table.Cell>
			<Table.Cell>Marlonp@gmail.com</Table.Cell>
      <Table.Cell>311444569</Table.Cell>
		</Table.Row>

		<Table.Row>
			<Table.RowHeaderCell>Samuel Barrera</Table.RowHeaderCell>
      <Table.Cell>564644</Table.Cell>
			<Table.Cell>Samuelb@gmail.com</Table.Cell>
      <Table.Cell>320517486</Table.Cell>
		</Table.Row>

		<Table.Row>
			<Table.RowHeaderCell>Santiago Lopera</Table.RowHeaderCell>
      <Table.Cell>564679</Table.Cell>
			<Table.Cell>Salto@gmail.com</Table.Cell>
      <Table.Cell>321465465</Table.Cell>
		</Table.Row>
	</Table.Body>
</Table.Root>
      <div className="trab">
        <button onClick={() => navigate('/Actualizaremmpl')} className='ji'>Actualizar</button>
      </div>
    </div>
  );
}

export default EmployeeData;

