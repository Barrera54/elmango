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

// RUTAS GET
// Obtener todos los empleados
app.get('/cuenta', (_, res) => {
  db.query('SELECT * FROM Cuenta', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error consulta empleados' });
    res.json(results);
  });
});

// Obtener todos los productos
app.get('/productos', (_, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error consulta productos' });
    }

    // Convertir BLOB a Base64
    const productosConImagen = results.map(prod => ({
      ...prod,
      imagen: prod.imagen
        ? `data:image/jpeg;base64,${prod.imagen.toString('base64')}`
        : null
    }));

    res.json(productosConImagen);
  });
});


// Obtener productos de la papelera
app.get('/papelera-productos', (_, res) => {
  const sql = 'SELECT * FROM papelera_producto';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error en la consulta de productos de la papelera:', err);
      return res.status(500).json({ error: 'Error al consultar productos en papelera' });
    }
    res.json(results);
  });
});

// Obtener un producto por su código
app.get('/productos/:Codi_produ', (req, res) => {
  db.query('SELECT * FROM productos WHERE Codi_produ = ?', [req.params.Codi_produ], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error consulta producto' });
    if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(results[0]);
  });
});

// Obtener clientes frecuentes
app.get('/cliente_frecuent', (req, res) => {
  db.query('SELECT * FROM cliente_frecuent', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Obtener deudores
app.get('/deudor', (req, res) => {
  db.query('SELECT * FROM deudor', (err, results) => {
    if (err) {
      console.error('Error consultando deudores:', err);
      return res.status(500).json({ error: 'Error consultando deudores', details: err.message });
    }
    res.status(200).json(results);
  });
});

// Obtener ventas de empleado
app.get('/ventas-empleado', (_, res) => {
  db.query('SELECT * FROM ventas_empleado', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error consulta ventas empleado' });
    res.json(results);
  });
});

app.get('/ventas-empleado/total-hoy', (_, res) => {
  db.query(
    'SELECT SUM(monto) AS total_dia FROM ventas_empleado',
    (err, results) => {
      if (err) {
        console.error('Error al obtener total:', err);
        return res.status(500).json({ error: 'Error al obtener total' });
      }

      res.json({ total_dia: results[0].total_dia || 0 });
    }
  );
});

app.get('/ventas-empleado/hoy', (_, res) => {
  const sql = `
    SELECT SUM(monto) AS total_dia
    FROM ventas_empleado
    WHERE DATE(fecha_hora) = CURDATE()
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener total del día:', err);
      return res.status(500).json({ error: 'Error al obtener total del día' });
    }

    res.json({ total_dia: results[0].total_dia || 0 });
  });
});

// RUTAS DELETE
// Eliminar producto de la papelera
app.delete('/papelera-productos/:ID_produ', (req, res) => {
  const productoId = req.params.ID_produ;
  db.query('DELETE FROM papelera_producto WHERE id = ?', [productoId], (err, result) => {
    if (err) {
      console.error('Error al eliminar producto de la papelera:', err);
      return res.status(500).json({ error: 'Error eliminando producto de la papelera' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado en la papelera' });
    }
    res.json({ message: 'Producto eliminado de la papelera con éxito' });
  });
});

app.delete('/deudor/:idDeudor', (req, res) => {
  // Extraemos el idDeudor de los parámetros de la URL
  const deudorId = req.params.idDeudor;

  // Verificamos si el ID es válido
  if (!deudorId || isNaN(deudorId)) {
    return res.status(400).json({ error: 'ID de deudor inválido' });
  }

  // Consulta SQL para eliminar el deudor con el ID proporcionado
  db.query('DELETE FROM deudor WHERE idDeudor = ?', [deudorId], (err, result) => {
    // Si hay un error en la consulta, lo registramos y enviamos una respuesta 500
    if (err) {
      console.error('Error al eliminar deudor:', err);
      return res.status(500).json({ error: 'Error eliminando deudor' });
    }

    // Si no se eliminó ninguna fila, significa que el deudor no fue encontrado
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Deudor no encontrado' });
    }

    // Si la eliminación fue exitosa, enviamos una respuesta JSON
    res.json({ message: 'Deudor eliminado con éxito' });
  });
});

// RUTAS PUT
// Login con JWT
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

// Actualizar cuenta
app.put('/cuenta/:nombre', (req, res) => {
  const { nombre } = req.params; // Obtener el nombre del parámetro de la URL
  const { telefono, correo, cedula } = req.body; // Obtener los campos del cuerpo de la solicitud

  // Campos a actualizar y sus valores
  const campos = [];
  const valores = [];

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

  // Se añade el campo "nombre" a la cláusula WHERE
  const sql = `UPDATE cuenta SET ${campos.join(', ')} WHERE nombre = ?`;
  valores.push(nombre); // Se añade el nombre al final de los valores

  db.query(sql, valores, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json({ message: 'Empleado actualizado correctamente' });
  });
});

// Actualizar deuda sumando al valor existente (PUT por nombre)
app.put('/deudor/:nombre', (req, res) => {
  const { nombre } = req.params;
  const { valoDeu } = req.body;

  if (!valoDeu || isNaN(valoDeu)) {
    return res.status(400).json({ error: 'Monto de deuda inválido' });
  }

  // Obtener deuda actual
  db.query('SELECT valoDeu FROM deudor WHERE nomDeu = ?', [nombre], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error consultando deuda' });
    if (results.length === 0) return res.status(404).json({ error: 'Deudor no encontrado' });

    const deudaActual = results[0].valoDeu || 0;
    const nuevaDeuda = deudaActual + parseFloat(valoDeu);

    // Actualizar con el nuevo valor
    db.query('UPDATE deudor SET valoDeu = ? WHERE nomDeu = ?', [nuevaDeuda, nombre], (err) => {
      if (err) return res.status(500).json({ error: 'Error actualizando deuda' });
      res.json({ message: 'Deuda actualizada correctamente', nuevaDeuda });
    });
  });
});
// Actualizar producto
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


// RUTAS POST
// Login sin JWT
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
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }
    const cuenta = results[0];
    console.log('Cuenta encontrada:', { Usuario: cuenta.Usuario, Contraseña: cuenta.Contraseña, cargo: cuenta.cargo });
    console.log('Contraseña recibida en request:', contrasena);
    console.log('Contraseña en DB:', cuenta.Contraseña);
    if (cuenta.Contraseña !== contrasena) {
      console.log('Contraseña incorrecta: Devolviendo 401.');
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }
    console.log('Tipo de usuario recibido en request:', tipoUsuario);
    console.log('Cargo en DB:', cuenta.cargo);
    if ((cuenta.cargo || '').toLowerCase() !== tipoUsuario.toLowerCase()) {
      console.log('Rol no coincide: Devolviendo 401.');
      return res.status(401).json({ mensaje: 'Rol no coincide' });
    }
    console.log('Login exitoso: Devolviendo 200.');
    res.json({ mensaje: 'Login exitoso', nombre: cuenta.Usuario, cargo: cuenta.cargo });
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

// Guardar valoración
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
app.post('/guardarValoracionProducto', (req, res) => {
  const { producto_Cal, calificacion } = req.body;

  // Validación de campos obligatorios
  if (!producto_Cal || !calificacion) {
      return res.status(400).json({ mensaje: 'El nombre del producto y la calificación son obligatorios.' });
  }

  // Consulta SQL para insertar los datos
  const sql = 'INSERT INTO encuestas_producto (producto_Cal, calificacion, fecha) VALUES (?, ?, NOW())';
  
  // Ejecutar la consulta
  db.query(sql, [producto_Cal, calificacion], (err, result) => {
      if (err) {
          console.error('Error al guardar la valoración del producto:', err);
          return res.status(500).json({ mensaje: 'Error al guardar la valoración.' });
      }
      res.status(201).json({ mensaje: 'Valoración guardada exitosamente.', id: result.insertId });
  });
});

// Agregar producto
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

// Agregar producto a la papelera
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

// Agregar cliente frecuente
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

// Agregar deudor
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

app.post('/devolucion', (req, res) => {
  // Extrae los datos del cuerpo de la petición.
  // Es importante que los nombres de las propiedades coincidan con los nombres de las columnas en tu base de datos
  const { producto_Nom, cantidad, Monto, fecha_devolucion } = req.body;

  // Consulta SQL para insertar los datos en la tabla 'devoluciones'
  const sql = 'INSERT INTO devoluciones (producto_Nom, cantidad, Monto, fecha_devolucion) VALUES (?, ?, ?, ?)';
  
  // Ejecuta la consulta
  db.query(
    sql,
    [producto_Nom, cantidad, Monto, fecha_devolucion],
    (err, results) => {
      // Manejo de errores
      if (err) {
        console.error('Error insertando devolución:', err);
        return res.status(500).json({
          error: 'Error insertando en la tabla devoluciones',
          details: err.message
        });
      }
      
      // Si la inserción es exitosa, envía una respuesta
      res.status(201).json({
        message: 'Devolución insertada exitosamente',
        id: results.insertId,
        results
      });
    }
  );
});
// app.post es para manejar la solicitud POST desde el cliente
app.post('/ventas_empleado', (req, res) => {
  // Se obtienen los datos del cuerpo de la solicitud (request body)
  // 'req.body' debería contener los datos que el cliente quiere enviar
  // a la base de datos, en este caso 'emplead_nom' y 'monto'.
  const { emplead_nom, monto, metodo } = req.body;

  // Se realiza una consulta SQL para insertar los datos en la tabla 'ventas_empleado'
  // El 'fecha_hora' se establece automáticamente con el valor actual de la base de datos
  // por lo que no es necesario enviarlo desde el cliente.
  db.query(
    'INSERT INTO ventas_empleado (emplead_nom, monto, metodo) VALUES (?, ?, ?)',
    [emplead_nom, monto, metodo],
    (err, results) => {
      // Manejo de errores
      if (err) {
        // Si hay un error, se envía una respuesta con estado 500
        // y un mensaje de error en formato JSON.
        console.error('Error al insertar la venta:', err);
        return res.status(500).json({ error: 'Error al registrar la venta del empleado' });
      }
      // Si la operación es exitosa, se envía la respuesta con los resultados.
      res.json(results);
    }
  );
});
app.post('/restar-stock', (req, res) => {
  const { Codi_produ, cantidadVendida } = req.body;

  if (!Codi_produ || !cantidadVendida) {
      return res.status(400).json({ error: 'Faltan datos: Codi_produ y cantidadVendida son requeridos' });
  }

  // 1. Obtener el stock actual
  db.query(
      'SELECT stock FROM productos WHERE Codi_produ = ?',
      [Codi_produ],
      (err, results) => {
          if (err) {
              console.error('Error al obtener stock:', err);
              return res.status(500).json({ error: 'Error al obtener el stock' });
          }

          if (results.length === 0) {
              return res.status(404).json({ error: 'Producto no encontrado' });
          }

          const stockActual = results[0].stock;
          const nuevoStock = stockActual - cantidadVendida;

          if (nuevoStock < 0) {
              return res.status(400).json({ error: 'Stock insuficiente para la venta' });
          }

          // 2. Actualizar el stock en la base de datos
          db.query(
              'UPDATE productos SET stock = ? WHERE Codi_produ = ?',
              [nuevoStock, Codi_produ],
              (err, updateResults) => {
                  if (err) {
                      console.error('Error al actualizar stock:', err);
                      return res.status(500).json({ error: 'Error al actualizar el stock' });
                  }

                  res.json({
                      message: 'Stock actualizado correctamente',
                      Codi_produ,
                      stockAnterior: stockActual,
                      cantidadVendida,
                      nuevoStock
                  });
              }
          );
      }
  );
});
// --- Listen solo si NO es test ---
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  });
}

// Exportar para Supertest
module.exports = { app, db };