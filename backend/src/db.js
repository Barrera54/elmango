const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'TU_USUARIO_MYSQL',
  password: 'TU_CONTRASEÑA_MYSQL',
  database: 'elmango'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar:', err);
    return;
  }
  console.log('✅ Conexión a la base de datos elmango exitosa.');
});

module.exports = connection;
