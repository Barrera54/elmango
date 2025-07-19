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
  const { usuario, contrasena, tipoUsuario } = req.body;

  if (!usuario || !contrasena || !tipoUsuario) {
    return res.status(400).json({ mensaje: 'Faltan campos' });
  }

  // Busca por nombre de usuario (columna: Usuario)
  const sql = 'SELECT * FROM cuenta WHERE Usuario = ?';
  db.query(sql, [usuario], (err, results) => {
    if (err) {
      console.error('❌ Error al consultar cuenta:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    const cuenta = results[0];

    // Verifica contraseña
    if (cuenta.Contraseña !== contrasena) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Verifica tipo de usuario comparando con cargo
    if ((cuenta.cargo || '').toLowerCase() !== tipoUsuario.toLowerCase()) {
      return res.status(401).json({ mensaje: 'El rol seleccionado no coincide con el cargo del usuario' });
    }

    res.status(200).json({
      mensaje: 'Login exitoso',
      nombre: cuenta.Usuario,
      cargo: cuenta.cargo
    });
  });
});
app.put('/login', (req, res) => {
  const { usuario, contrasena, tipoUsuario } = req.body;

  if (!usuario || !contrasena || !tipoUsuario) {
    return res.status(400).json({ mensaje: 'Faltan campos' });
  }

  const sql = 'SELECT * FROM cuenta WHERE Usuario = ?';
  db.query(sql, [usuario], (err, results) => {
    if (err) {
      console.error('❌ Error al consultar cuenta:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    const cuenta = results[0];

    if (cuenta.Contraseña !== contrasena) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    if ((cuenta.cargo || '').toLowerCase() !== tipoUsuario.toLowerCase()) {
      return res.status(401).json({ mensaje: 'El rol seleccionado no coincide con el cargo del usuario' });
    }

    // ✅ Genera el JWT
    const payload = {
      id: cuenta.id,
      cargo: cuenta.cargo
    };

    const token = jwt.sign(payload, 'TU_SECRETO', { expiresIn: '1h' });

    res.status(200).json({
      mensaje: 'Login exitoso',
      token: token,
      nombre: cuenta.Usuario,
      cargo: cuenta.cargo
    });
  });
});
app.put('/cuenta/contrasena', (req, res) => {
  const { usuario, cargo, nuevaContrasena } = req.body;

  if (!usuario || !cargo || !nuevaContrasena) {
    return res.status(400).json({ mensaje: 'Faltan datos: usuario, cargo o nueva contraseña' });
  }

  // Busca la cuenta por usuario y rol (cargo)
  const sqlSelect = 'SELECT * FROM cuenta WHERE Usuario = ? AND cargo = ?';
  db.query(sqlSelect, [usuario, cargo], (err, results) => {
    if (err) {
      console.error('❌ Error al verificar cuenta:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
    }

    const cuenta = results[0];

    // Si encuentra, actualiza la contraseña
    const sqlUpdate = 'UPDATE cuenta SET Contraseña = ? WHERE id = ?';
    db.query(sqlUpdate, [nuevaContrasena, cuenta.id], (err, result) => {
      if (err) {
        console.error('❌ Error al actualizar contraseña:', err);
        return res.status(500).json({ mensaje: 'Error en el servidor' });
      }

      res.status(200).json({ mensaje: 'Contraseña actualizada correctamente' });
    });
  });
});


app.post('/crearCuenta', (req, res) => {
  // Desestructurar los datos del cuerpo de la petición
  const {
    nombre,
    telefono,
    correo,
    cedula,
    cargo, // Esto se mapea a 'tipoUsuario' en tu frontend
    usuario,
    contrasena
  } = req.body;

  // Validar que todos los campos requeridos estén presentes
  if (!nombre || !telefono || !correo || !cedula || !cargo || !usuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  // Obtener la fecha actual para fecha_registro
  const fecha_registro = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD

  // Primero, verificar si el usuario o la cédula ya existen
  const checkSql = 'SELECT Usuario, Cedula FROM cuenta WHERE Usuario = ? OR Cedula = ?';
  db.query(checkSql, [usuario, cedula], (err, results) => {
    if (err) {
      console.error('❌ Error al verificar cuenta existente:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor al verificar duplicados' });
    }

    if (results.length > 0) {
      if (results[0].Usuario === usuario) {
        return res.status(409).json({ mensaje: 'El nombre de usuario ya existe' });
      }
      if (results[0].Cedula === cedula) {
        return res.status(409).json({ mensaje: 'La cédula ya está registrada' });
      }
    }

    // Si no existen, proceder a insertar la nueva cuenta
    const insertSql = `INSERT INTO cuenta (nombre, fecha_registro, Telefono, Correo, Cedula, cargo, Usuario, Contraseña) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [nombre, fecha_registro, telefono, correo, cedula, cargo, usuario, contrasena];

    db.query(insertSql, values, (err, result) => {
      if (err) {
        console.error('❌ Error al crear cuenta:', err);
        return res.status(500).json({ mensaje: 'Error al registrar la cuenta' });
      }
      res.status(201).json({ mensaje: 'Cuenta creada exitosamente', id: result.insertId });
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
const jwt = require('jsonwebtoken'); // Necesitas instalarlo con npm install jsonwebtoken

app.put('/cuenta/:id/contrasena', (req, res) => {
  const { id } = req.params;
  const { contrasena } = req.body;

  // Extraer token del header Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // Verificar token
  jwt.verify(token, 'TU_SECRETO', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    // user: contiene los datos decodificados, por ejemplo { id: 5, cargo: 'admin' }
    const cargoUsuario = user.cargo;
    const idUsuario = user.id;

    // 1. Verificar que el cargo en BD coincida y que sea su propia cuenta
    const sqlSelect = 'SELECT cargo FROM cuenta WHERE id = ?';
    db.query(sqlSelect, [id], (err, result) => {
      if (err) {
        console.error('Error al verificar cargo:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: 'Cuenta no encontrada' });
      }

      const cargoEnBD = result[0].cargo;

      if (cargoEnBD !== cargoUsuario || parseInt(id) !== idUsuario) {
        return res.status(403).json({ error: 'No autorizado para actualizar esta cuenta' });
      }

      // 2. Si coincide, actualizar solo la contraseña
      const sqlUpdate = `
        UPDATE cuenta 
        SET contrasena = ?
        WHERE id = ?
      `;
      db.query(sqlUpdate, [contrasena, id], (err, result) => {
        if (err) {
          console.error('Error en la actualización de contraseña:', err);
          return res.status(500).json({ error: 'Error al actualizar contraseña' });
        }

        res.json({ message: 'Contraseña actualizada correctamente' });
      });
    });
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
// ✅ GET producto por Codi_produ
app.get('/productos/:Codi_produ', (req, res) => {
  const { Codi_produ } = req.params;
  const sql = 'SELECT * FROM productos WHERE Codi_produ = ?';

  db.query(sql, [Codi_produ], (err, results) => {
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
