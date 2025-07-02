import express from 'express';
import morgan from 'morgan';
import productosRoutes from './src/routes/productos.routes.js';
import inventarioRoutes from './src/routes/inventario.routes.js';
import _devuRoutes from './src/routes/clien_devu.routes.js';
import ventasRoutes from './src/routes/ventas.routes.js';
import clien_devuRoutes from './src/routes/clien_devu.routes.js';
import frecuentRoutes from './src/routes/frecuent.js';
const app = express();
const PORT = 3000;

// Middlewares
app.use(morgan('dev'));
app.use(express.json());


// Ruta de prueba
app.get('/', (req, res) => {
    res.send('El servidor está funcionando correctamente');
});

// Rutas de productos
app.use('/api/producto',productosRoutes); // Corregido: plural "productos"
app.use('/api/inventario',inventarioRoutes); // Corregido: plural "productos"
app.use('/api/produ_devu',_devuRoutes); // Corregido: plural "productos"
app.use('/api/ventas',ventasRoutes); // Corregido: plural "productos"
app.use('/api/clien_devu',clien_devuRoutes); // Corregido: plural "productos"
app.use('/api/frecuent',frecuentRoutes); // Corregido: plural "productos"
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`); // Corregido: template string
});