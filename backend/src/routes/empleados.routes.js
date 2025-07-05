import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// Registrar entrada del empleado
router.post('/entrada/:empleadoId', async (req, res) => {
  try {
    const { empleadoId } = req.params;
    
    // Verificar si hay una sesión activa
    const [actividadActual] = await pool.query(
      'SELECT * FROM registro_actividad WHERE empleado_id = ? AND fecha_hora_salida IS NULL',
      [empleadoId]
    );

    if (actividadActual.length > 0) {
      return res.status(400).json({ error: 'El empleado ya tiene una sesión activa' });
    }

    // Registrar entrada
    await pool.query(
      'INSERT INTO registro_actividad (empleado_id, fecha_hora_entrada) VALUES (?, NOW())',
      [empleadoId]
    );

    res.json({ message: 'Entrada registrada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar entrada' });
  }
});

// Registrar salida del empleado
router.post('/salida/:empleadoId', async (req, res) => {
  try {
    const { empleadoId } = req.params;
    
    // Obtener la sesión activa
    const [actividadActual] = await pool.query(
      'SELECT * FROM registro_actividad WHERE empleado_id = ? AND fecha_hora_salida IS NULL',
      [empleadoId]
    );

    if (actividadActual.length === 0) {
      return res.status(400).json({ error: 'No hay una sesión activa para este empleado' });
    }

    // Calcular horas trabajadas
    const entrada = new Date(actividadActual[0].fecha_hora_entrada);
    const salida = new Date();
    const horasTrabajadas = (salida - entrada) / (1000 * 60 * 60);

    // Registrar salida y horas trabajadas
    await pool.query(
      'UPDATE registro_actividad SET fecha_hora_salida = NOW(), horas_trabajadas = ? WHERE id = ?',
      [horasTrabajadas, actividadActual[0].id]
    );

    res.json({ 
      message: 'Salida registrada exitosamente',
      horas_trabajadas: horasTrabajadas
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar salida' });
  }
});

// Registrar venta para un empleado
router.post('/venta', async (req, res) => {
  try {
    const { empleadoId, ventaId, monto } = req.body;

    await pool.query(
      'INSERT INTO ventas_empleado (empleado_id, venta_id, monto) VALUES (?, ?, ?)',
      [empleadoId, ventaId, monto]
    );

    res.json({ message: 'Venta registrada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar venta' });
  }
});

// Obtener estadísticas de un empleado
router.get('/estadisticas/:empleadoId', async (req, res) => {
  try {
    const { empleadoId } = req.params;

    // Obtener horas trabajadas
    const [horas] = await pool.query(
      `SELECT SUM(horas_trabajadas) as total_horas 
       FROM registro_actividad 
       WHERE empleado_id = ? AND fecha_hora_salida IS NOT NULL`,
      [empleadoId]
    );

    // Obtener ventas totales
    const [ventas] = await pool.query(
      `SELECT COUNT(*) as total_ventas, SUM(monto) as total_monto 
       FROM ventas_empleado 
       WHERE empleado_id = ?`,
      [empleadoId]
    );

    res.json({
      total_horas: horas[0]?.total_horas || 0,
      total_ventas: ventas[0]?.total_ventas || 0,
      total_monto: ventas[0]?.total_monto || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

export default router;
