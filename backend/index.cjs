const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia si tienes clave
  database: 'elmango'
});

// Probar conexión
db.connect(err => {
  if (err) {
    console.error('❌ Error de conexión a MySQL:', err);
    return;
  }
  console.log('✅ Conexión a MySQL exitosa.');
});


// ✅ LOGIN usando tabla CUENTA (solo correo y tipoUsuario)
app.post('/login', (req, res) => {
  const { correo, tipoUsuario } = req.body;

  if (!correo || !tipoUsuario) {
    return res.status(400).json({ mensaje: 'Faltan campos' });
  }

  const sql = 'SELECT * FROM cuenta WHERE correo = ?';
  db.query(sql, [correo], (err, results) => {
    if (err) {
      console.error('❌ Error al consultar cuenta:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ mensaje: 'Correo no encontrado' });
    }

    const cuenta = results[0];
    // Compara el cargo con el tipo seleccionado (ignorando mayúsculas/minúsculas)
    if ((cuenta.cargo || '').toLowerCase() !== tipoUsuario.toLowerCase()) {
      return res.status(401).json({ mensaje: 'El rol seleccionado no coincide con el cargo del usuario' });
    }

    res.status(200).json({
      mensaje: 'Login exitoso',
      nombre: cuenta.nombre,
      cargo: cuenta.cargo
    });
  });
});



// ✅ GET empleados
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

// ✅ PUT empleados
app.put('/empleados/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, correo, cedula } = req.body;

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

// ✅ POST productos
app.post('/productos', (req, res) => {
  const { nombre, descripcion, precio, stock, categoria, imagen_url } = req.body;
  const sql = 'INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [nombre, descripcion, precio, stock, categoria, imagen_url], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    res.json(results);
  });
});

// ✅ PUT productos
app.put('/productos/:ID_produ', (req, res) => {
  const { ID_produ } = req.params;
  const { nombre, descripcion, precio, stock, categoria, imagen_url } = req.body;
  const sql = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ?, imagen_url = ? WHERE ID_produ = ?';
  db.query(sql, [nombre, descripcion, precio, stock, categoria, imagen_url, ID_produ], (err, results) => {
    if (err) {
      console.error('Error en la actualización:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    res.json(results);
  });
});

// ✅ GET productos
app.get('/productos', (req, res) => {
  const sql = 'SELECT * FROM productos';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error en la consulta' });
      console.error('Error en la consulta:', err);
      return;
    }
    res.json(results);
  });
});

// ✅ DELETE productos
app.delete('/productos/:ID_produ', (req, res) => {
  const { ID_produ } = req.params;
  const sql = 'DELETE FROM productos WHERE ID_produ = ?';

  db.query(sql, [ID_produ], (err, result) => {
    if (err) {
      console.error('Error al eliminar producto:', err);
      return res.status(500).json({ error: 'Error al eliminar el producto' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  });
});
// ✅ GET producto por ID_produ
app.get('/productos/:ID_produ', (req, res) => {
  const { ID_produ } = req.params;
  const sql = 'SELECT * FROM productos WHERE ID_produ = ?';
  
  db.query(sql, [ID_produ], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error en la consulta' });
      console.error('Error en la consulta:', err);
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.json(results[0]);
  });
});

app.get('/ventas-empleado', (req, res) => {
  const sql = 'SELECT * FROM ventas_empleado';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    res.json(results);
  });
});
// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
