const request = require('supertest');
const { app, db } = require('../index.cjs'); // Asegúrate de que index.cjs exporta app y db

describe('API de Productos', () => {
  it('debería devolver un producto existente', async () => {
    const codigoExistente = 'Acei'; // ⚠️ Cambia por un código de producto real en tu DB

    const res = await request(app).get(`/productos/${codigoExistente}`);

    console.log('➡️ Respuesta:', res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Codi_produ', codigoExistente);
  });

  it('debería devolver 404 si el producto no existe', async () => {
    const codigoInexistente = 'NO_EXISTE'; // Este código NO debe existir en tu DB

    const res = await request(app).get(`/productos/${codigoInexistente}`);

    console.log('➡️ Respuesta 404:', res.statusCode, res.body);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Producto no encontrado');
  });

  it('debería devolver todos los productos', async () => {
    const res = await request(app).get('/productos');

    console.log('➡️ Respuesta todos los productos:', res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('Codi_produ');
  });
});

describe('API de Login', () => {
  it('debería loguear correctamente con credenciales válidas', async () => {
    const loginData = {
      usuario: 'ana', // Asegúrate de que 'ana' exista en tu DB con 'pass1' y 'Administrador'
      contrasena: 'pass1',
      tipoUsuario: 'Administrador'
    };

    const res = await request(app).post('/login').send(loginData);

    console.log('➡️ Login válido:', res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensaje', 'Login exitoso');
    expect(res.body).toHaveProperty('nombre', loginData.usuario);
    expect(res.body).toHaveProperty('cargo');
  });

  it('debería fallar si faltan campos', async () => {
    const res = await request(app).post('/login').send({
      usuario: 'ana'
      // Falta contrasena y tipoUsuario intencionadamente
    });

    console.log('➡️ Login faltan campos:', res.statusCode, res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('mensaje', 'Faltan campos');
  });

  it('debería fallar con contraseña incorrecta', async () => {
    const res = await request(app).post('/login').send({
      usuario: 'ana',
      contrasena: 'contrasena_incorrecta', // 🚨 CAMBIADO: Contraseña incorrecta
      tipoUsuario: 'Administrador'
    });

    console.log('➡️ Login contraseña incorrecta:', res.statusCode, res.body);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('mensaje', 'Contraseña incorrecta');
  });

  it('debería fallar si el usuario no existe', async () => {
    const res = await request(app).post('/login').send({
      usuario: 'usuario_no_existente', // 🚨 CAMBIADO: Usuario que NO debe existir en tu DB
      contrasena: 'cualquier_pass',
      tipoUsuario: 'CualquierRol'
    });

    console.log('➡️ Login usuario no existe:', res.statusCode, res.body);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('mensaje', 'Usuario no encontrado');
  });

  it('debería fallar si el rol no coincide', async () => {
    const res = await request(app).post('/login').send({
      usuario: 'ana', // Usuario que sí existe
      contrasena: 'pass1', // Contraseña correcta para 'ana'
      tipoUsuario: 'RolIncorrecto' // 🚨 CAMBIADO: Un rol que NO sea 'Administrador' para 'ana'
    });

    console.log('➡️ Login rol incorrecto:', res.statusCode, res.body);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('mensaje', 'Rol no coincide');
  });
});

afterAll(done => {
  // Cierra la conexión a la base de datos después de todas las pruebas
  db.end(err => {
    if (err) console.error('❌ Error cerrando conexión DB:', err);
    done();
  });
});