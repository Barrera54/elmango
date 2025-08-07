const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Config DB con charset correcto
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'elmango',
  charset: 'utf8mb4'
});

db.connect(err => {
  if (err) {
    console.error('❌ Error de conexión a MySQL:', err);
  } else {
    console.log('✅ Conexión a MySQL exitosa.');
  }
});

// ----------------- RUTAS -----------------

// LOGIN sin JWT
app.post('/login', (req, res) => {
  const { usuario, contrasena, tipoUsuario } = req.body;

  console.log('--- Nueva solicitud de Login ---');
  console.log('Datos recibidos:', { usuario, contrasena, tipoUsuario });

  if (!usuario || !contrasena || !tipoUsuario) {
    console.log('Faltan campos: Devolviendo 400.');
    return res.status(400).json({ mensaje: 'Faltan campos' });
  }

  const sql = 'SELECT * FROM cuenta WHERE Usuario = ?';
  db.query(sql, [usuario], (err, results) => {
    if (err) {
      console.error('Error en la consulta de la base de datos:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    console.log('Resultados de la consulta SQL (results.length):', results.length);
    if (results.length === 0) {
      console.log('Usuario no encontrado: Devolviendo 401.');
      // Este es el caso para "debería fallar si el usuario no existe"
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    const cuenta = results[0];
    console.log('Cuenta encontrada:', { Usuario: cuenta.Usuario, Contraseña: cuenta.Contraseña, cargo: cuenta.cargo });
    console.log('Contraseña recibida en request:', contrasena);
    console.log('Contraseña en DB:', cuenta.Contraseña);

    if (cuenta.Contraseña !== contrasena) {
      console.log('Contraseña incorrecta: Devolviendo 401.');
      // Este es el caso para "debería fallar con contraseña incorrecta"
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    console.log('Tipo de usuario recibido en request:', tipoUsuario);
    console.log('Cargo en DB:', cuenta.cargo);

    if ((cuenta.cargo || '').toLowerCase() !== tipoUsuario.toLowerCase()) {
      console.log('Rol no coincide: Devolviendo 401.');
      // Este es el caso para "debería fallar si el rol no coincide"
      return res.status(401).json({ mensaje: 'Rol no coincide' });
    }

    console.log('Login exitoso: Devolviendo 200.');
    res.json({ mensaje: 'Login exitoso', nombre: cuenta.Usuario, cargo: cuenta.cargo });
  });
});
// LOGIN con JWT
app.put('/login', (req, res) => {
  const { usuario, contrasena, tipoUsuario } = req.body;
  if (!usuario || !contrasena || !tipoUsuario) {
    return res.status(400).json({ mensaje: 'Faltan campos' });
  }
  const sql = 'SELECT * FROM cuenta WHERE Usuario = ?';
  db.query(sql, [usuario], (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error en el servidor' });
    if (results.length === 0) return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    const cuenta = results[0];
    if (cuenta.Contraseña !== contrasena) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    if ((cuenta.cargo || '').toLowerCase() !== tipoUsuario.toLowerCase()) {
      return res.status(401).json({ mensaje: 'Rol no coincide' });
    }
    const payload = { id: cuenta.id, cargo: cuenta.cargo };
    const token = jwt.sign(payload, 'TU_SECRETO', { expiresIn: '1h' });
    res.json({ mensaje: 'Login exitoso', token, nombre: cuenta.Usuario, cargo: cuenta.cargo });
  });
});

// Cambiar contraseña sin auth
app.put('/cuenta/contrasena', (req, res) => {
  const { usuario, cargo, nuevaContrasena } = req.body;
  if (!usuario || !cargo || !nuevaContrasena) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }
  db.query('SELECT * FROM cuenta WHERE Usuario = ? AND cargo = ?', [usuario, cargo], (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error en el servidor' });
    if (results.length === 0) return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
    const cuenta = results[0];
    db.query('UPDATE cuenta SET Contraseña = ? WHERE id = ?', [nuevaContrasena, cuenta.id], err => {
      if (err) return res.status(500).json({ mensaje: 'Error en el servidor' });
      res.json({ mensaje: 'Contraseña actualizada correctamente' });
    });
  });
});

// Cambiar contraseña autenticado
app.put('/cuenta/:id/contrasena', (req, res) => {
  const { id } = req.params;
  const { contrasena } = req.body;
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });
  jwt.verify(token, 'TU_SECRETO', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    db.query('SELECT cargo FROM cuenta WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Error interno' });
      if (result.length === 0) return res.status(404).json({ error: 'Cuenta no encontrada' });
      if (result[0].cargo !== user.cargo || parseInt(id) !== user.id) {
        return res.status(403).json({ error: 'No autorizado' });
      }
      db.query('UPDATE cuenta SET Contraseña = ? WHERE id = ?', [contrasena, id], err => {
        if (err) return res.status(500).json({ error: 'Error al actualizar contraseña' });
        res.json({ message: 'Contraseña actualizada correctamente' });
      });
    });
  });
});

// Crear cuenta
app.post('/crearCuenta', (req, res) => {
  const { nombre, telefono, correo, cedula, cargo, usuario, contrasena } = req.body;
  if (!nombre || !telefono || !correo || !cedula || !cargo || !usuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }
  const fecha = new Date().toISOString().slice(0, 10);
  db.query('SELECT Usuario, Cedula FROM cuenta WHERE Usuario = ? OR Cedula = ?', [usuario, cedula], (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error verificando duplicados' });
    if (results.length > 0) {
      if (results[0].Usuario === usuario) return res.status(409).json({ mensaje: 'Usuario ya existe' });
      if (results[0].Cedula === cedula) return res.status(409).json({ mensaje: 'Cédula ya registrada' });
    }
    db.query(
      'INSERT INTO cuenta (nombre, fecha_registro, Telefono, Correo, Cedula, cargo, Usuario, Contraseña) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, fecha, telefono, correo, cedula, cargo, usuario, contrasena],
      (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'Error creando cuenta' });
        res.status(201).json({ mensaje: 'Cuenta creada', id: result.insertId });
      }
    );
  });
});

app.post('/guardarValoracion', (req, res) => {
  const { calificacion, comentario } = req.body;

  if (!calificacion) {
    return res.status(400).json({ mensaje: 'La calificación es obligatoria' });
  }

  db.query(
    'INSERT INTO encusystem (Calificacion, Comentario) VALUES (?, ?)',
    [calificacion, comentario || null],
    (err, result) => {
      if (err) {
        console.error('Error al guardar valoración:', err);
        return res.status(500).json({ mensaje: 'Error al guardar la valoración' });
      }

      res.status(201).json({ mensaje: 'Valoración guardada exitosamente', id: result.insertId });
    }
  );
});
app.post('/guardarValoracion', (req, res) => {
  const { calificacion, comentario } = req.body;

  if (!calificacion) {
    return res.status(400).json({ mensaje: 'La calificación es obligatoria' });
  }

  db.query(
    'INSERT INTO encusystem (Calificacion, Comentario) VALUES (?, ?)',
    [calificacion, comentario || null],
    (err, result) => {
      if (err) {
        console.error('Error al guardar valoración:', err);
        return res.status(500).json({ mensaje: 'Error al guardar la valoración' });
      }

      res.status(201).json({ mensaje: 'Valoración guardada exitosamente', id: result.insertId });
    }
  );
});

// CRUD empleados
app.get('/empleados', (_, res) => {
  db.query('SELECT * FROM empleados', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error consulta empleados' });
    res.json(results);
  });
});

app.put('/cuenta/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, correo, cedula } = req.body;

  // Validar que el ID sea numérico
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  // Construir dinámicamente la consulta con solo los campos válidos
  const campos = [];
  const valores = [];

  if (nombre && nombre.trim() !== '') {
    campos.push('nombre = ?');
    valores.push(nombre.trim());
  }

  if (telefono && telefono.trim() !== '') {
    campos.push('Telefono = ?');
    valores.push(telefono.trim());
  }

  if (correo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    campos.push('Correo = ?');
    valores.push(correo.trim());
  }

  if (cedula && /^\d{5,15}$/.test(cedula)) {
    campos.push('Cedula = ?');
    valores.push(cedula.trim());
  }

  if (campos.length === 0) {
    return res.status(400).json({ error: 'No hay campos válidos para actualizar' });
  }

  const sql = `UPDATE cuenta SET ${campos.join(', ')} WHERE id = ?`;
  valores.push(id);

  db.query(sql, valores, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json({ message: 'Empleado actualizado correctamente' });
  });
});

// CRUD productos
app.get('/productos', (_, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error consulta productos' });
    res.json(results);
  });
});

app.get('/papelera-productos', (_, res) => {
  // Consulta SQL para seleccionar todos los registros de la tabla 'papelera_producto'
  const sql = 'SELECT * FROM papelera_producto';

  // Ejecuta la consulta a la base de datos
  db.query(sql, (err, results) => {
    // Manejo de errores de la base de datos
    if (err) {
      console.error('Error en la consulta de productos de la papelera:', err);
      // Si hay un error en el servidor, devuelve un estado 500 Internal Server Error
      return res.status(500).json({ error: 'Error al consultar productos en papelera' });
    }
    // Si la consulta es exitosa, devuelve los resultados en formato JSON con un estado 200 OK
    res.json(results);
  });
});

app.get('/productos/:Codi_produ', (req, res) => {
  db.query('SELECT * FROM productos WHERE Codi_produ = ?', [req.params.Codi_produ], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error consulta producto' });
    if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(results[0]);
  });
});
app.get('/cliente_frecuent', (req, res) => {
  db.query('SELECT * FROM cliente_frecuent', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

app.post('/productos', (req, res) => {
  const { Codi_produ, Nomproducto, descripcion, precio, stock, categoria } = req.body;
  db.query(
    'INSERT INTO productos (Codi_produ, Nomproducto, descripcion, precio, stock, categoria) VALUES (?, ?, ?, ?, ?, ?)',
    [Codi_produ, Nomproducto, descripcion, precio, stock, categoria],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error insertando producto' });
      res.json(results);
    }
  );
});


app.post('/papelera_producto', (req, res) => {
  const { Nomproducto, precio, descripcion } = req.body;
  db.query(
    'INSERT INTO papelera_producto (Nomproducto, precio, descripcion) VALUES (?, ?, ?)',
    [Nomproducto, precio, descripcion],
    (err, results) => {
      if (err) {
        console.error('Error insertando producto en papelera:', err);
        return res.status(500).json({ error: 'Error insertando producto en la tabla papelera_producto', details: err.message });
      }
      res.status(201).json({ message: 'Producto insertado exitosamente en papelera_producto', id: results.insertId, results });
    }
  );
});
app.post('/cliente_frecuent', (req, res) => {
  const { nomFrecu, docuFrecu, celuFrecu } = req.body;
  db.query(
    'INSERT INTO cliente_frecuent (nomFrecu, docuFrecu, celuFrecu) VALUES (?, ?, ?)',
    [nomFrecu, docuFrecu, celuFrecu],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Cliente agregado', id: results.insertId });
    }
  );
});
app.post('/deudor', (req, res) => {
  const { nomDeu, valoDeu } = req.body;

  db.query(
    'INSERT INTO deudor (nomDeu, valoDeu) VALUES (?, ?)',
    [nomDeu, valoDeu],
    (err, results) => {
      if (err) {
        console.error('Error insertando deudor:', err);
        return res.status(500).json({
          error: 'Error insertando en la tabla deudor',
          details: err.message
        });
      }

      res.status(201).json({
        message: 'Deudor insertado exitosamente',
        id: results.insertId,
        results
      });
    }
  );
});

app.get('/deudor', (req, res) => {
  db.query('SELECT * FROM deudor', (err, results) => {
    if (err) {
      console.error('Error consultando deudores:', err);
      return res.status(500).json({ error: 'Error consultando deudores', details: err.message });
    }
    res.status(200).json(results);
  });
});
app.put('/productos/:NomproductoActual', (req, res) => {
  const { NomproductoActual } = req.params;
  const { Codi_produ, descripcion, precio, stock, categoria } = req.body;
  db.query(
    'UPDATE productos SET Codi_produ = ?, descripcion = ?, precio = ?, stock = ?, categoria = ? WHERE Nomproducto = ?',
    [Codi_produ, descripcion, precio, stock, categoria, NomproductoActual],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error actualizando producto' });
      if (results.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json({ message: 'Producto actualizado' });
    }
  );
});


// Tu API de eliminación actual
app.delete('/papelera-productos/:ID_produ', (req, res) => {
  const productoId = req.params.ID_produ; // El ID del producto a eliminar

  // Consulta SQL para eliminar el producto de la tabla 'papelera_producto'
  // Usamos 'id' como la columna de clave primaria en papelera_producto
  db.query('DELETE FROM papelera_producto WHERE id = ?', [productoId], (err, result) => {
    if (err) {
      console.error('Error al eliminar producto de la papelera:', err);
      return res.status(500).json({ error: 'Error eliminando producto de la papelera' });
    }

    // Si no se afectó ninguna fila, significa que el producto no fue encontrado
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado en la papelera' });
    }

    // Si la eliminación fue exitosa
    res.json({ message: 'Producto eliminado de la papelera con éxito' });
  });
});

// Ventas empleado
app.get('/ventas-empleado', (_, res) => {
  db.query('SELECT * FROM ventas_empleado', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error consulta ventas empleado' });
    res.json(results);
  });
});

// --- ✅ Listen solo si NO es test ---
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  });
}

// Exportar para Supertest
module.exports = { app, db };
