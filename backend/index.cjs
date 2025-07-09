const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware CORS y JSON
app.use(cors());
app.use(express.json()); // <<--- ¡IMPORTANTE para leer req.body!

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia si tienes clave
  database: 'elmango'
});

// Prueba de conexión
db.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL exitosa.');
});

// Endpoint GET empleados
app.get('/empleados', (req, res) => {
  const sql = 'SELECT * FROM empleados';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    res.json(results);
  });
});

// ✅ NUEVO: Endpoint PUT para actualizar empleado
app.put('/empleados/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, correo, cedula } = req.body;

  console.log('ID:', id);
  console.log('Body:', req.body);

  const sql = 'UPDATE empleados SET nombre = ?, telefono = ?, correo = ?, cedula = ? WHERE id = ?';
  db.query(sql, [nombre, telefono, correo, cedula, id], (err, result) => {
    if (err) {
      console.error('Error en la actualización:', err);
      res.status(500).json({ error: 'Error al actualizar empleado' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Empleado no encontrado' });
      return;
    }
    res.json({ message: 'Empleado actualizado correctamente' });
  });
});

// Endpoint GET productos por ID_produ
app.get('/productos/:ID_produ', (req, res) => {
  const { ID_produ } = req.params;
  const sql = 'SELECT * FROM producto WHERE ID_produ = ?';
  db.query(sql, [ID_produ], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint GET productos
app.get('/productos', (req, res) => {
  const sql = 'SELECT * FROM producto';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error en la consulta' });
      console.error('Error en la consulta:', err);
      return;
    }
    res.json(results);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
