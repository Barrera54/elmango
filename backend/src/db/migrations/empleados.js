import { pool } from '../db.js';

export const crearTablasEmpleados = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS empleados (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        rol VARCHAR(50) NOT NULL,
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS registro_actividad (
        id INT AUTO_INCREMENT PRIMARY KEY,
        empleado_id INT,
        fecha_hora_entrada TIMESTAMP,
        fecha_hora_salida TIMESTAMP,
        horas_trabajadas DECIMAL(5,2),
        FOREIGN KEY (empleado_id) REFERENCES empleados(id)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ventas_empleado (
        id INT AUTO_INCREMENT PRIMARY KEY,
        empleado_id INT,
        venta_id INT,
        monto DECIMAL(10,2),
        fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (empleado_id) REFERENCES empleados(id)
      )
    `);

    console.log('Tablas de empleados creadas exitosamente');
  } catch (error) {
    console.error('Error al crear las tablas de empleados:', error);
  }
};
