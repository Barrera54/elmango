import { Router } from 'express';
import {pool} from '../db.js'

const router = Router();

router.get('/', async(req ,res) =>{
    try{
        const [rows] = await pool.querry('select * from productos');
         res.json(rows);
    }catch(error){res.status(500).json({Error :'al obtener los productos'});}
});
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT nombre, precio FROM productos WHERE id = ?', [req.params.id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        // Devuelve el primer resultado (debería ser único si id es PK)
        res.json({
            nombre: rows[0].nombre,
            precio: rows[0].precio
        });
        
    } catch (error) {
        console.error(error); // Para debugging
        res.status(500).json({ error: 'Error al obtener el producto' });
    }   
});
router.post('/', async(req,res) =>{
  const { nombre, descripcion, precio } = req.body;
    if(!nombre || !precio){
        return res.status(400).json({error:'Nombre y precio son requeridos'});
     
    } try{
        const [Routerult] = await pool.query(
          'INSERT INTO  productos (nombre, descripcion, precio) values (?, ?, ?)',
          [nombre,descripcion,precio]
        ); 
        res.json({id: result.insertId, nombre, descripcion, precio});
    } catch(error){
        res.status(500).json({error: 'Error al crear el producto'});
    }
});
router.put('/:id', async(req,res) =>{
    const { nombre, descripcion, precio } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?',
            [nombre,descripcion,precio,req.params.id]
        );
     
       if(result.affectedRows ==0) return res.status(404).json({error:'Producto no encontrado'}); 
        res.json({id: result.insertId, nombre, descripcion, precio});
    } catch(error){
        res.status(500).json({error: 'Error al crear el producto'});
    } 
});
router.delete('/:id', async(req,res) =>{
    try{
        const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
        if(result.affectedRows ==0) return res.status(404).json({error:'Producto no encontrado'}); 
        res.json({message:'Producto eliminado correctamente'});
    } catch(error){
        res.status(500).json({error: 'Error al eliminar el producto'});
    } 
});

export default router;