import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM producto');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM producto WHERE id = ?', [req.params.id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    
    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Nombre y precio son requeridos' });
    }
    
    try {
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)',
            [nombre, descripcion, precio]
        );
        
        res.json({
            id: result.insertId,
            nombre,
            descripcion,
            precio
        });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    
    try {
        const [result] = await pool.query(
            'UPDATE producto SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?',
            [nombre, descripcion, precio, req.params.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json({
            id: req.params.id,
            nombre,
            descripcion,
            precio
        });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM producto WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

export default router;