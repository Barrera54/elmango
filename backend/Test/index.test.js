const request = require('supertest');
const { app, db } = require('../index.cjs');

describe('API de Productos', () => {
  it('debería devolver un producto existente', async () => {
    const codigoExistente = 'helchoco'; // ⚠️ Cambia por uno que exista

    const res = await request(app).get(`/productos/${codigoExistente}`);

    console.log('➡️ Respuesta:', res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Codi_produ', codigoExistente);
  });

  it('debería devolver 404 si el producto no existe', async () => {
    const codigoInexistente = 'NO_EXISTE';

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
    // Opcional: verifica que haya al menos 1 producto si sabes que la tabla no está vacía
    expect(res.body.length).toBeGreaterThan(0);
    // Opcional: verifica que tenga las propiedades esperadas
    expect(res.body[0]).toHaveProperty('Codi_produ');
  });

  afterAll(done => {
    db.end(err => {
      if (err) console.error('❌ Error cerrando conexión DB:', err);
      done();
    });
  });
});
