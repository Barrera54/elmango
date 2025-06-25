import express from 'express';
import morgan from 'morgan';
import productosRoutes from './src/routes/productos.routes.js';

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
app.use('/api/productos', productosRoutes); // Corregido: plural "productos"

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`); // Corregido: template string
});