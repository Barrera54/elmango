import React, { useState, useEffect } from 'react';
import './css/actividadEmpleado.css';
import Cabe from './menu';

function ActividadEmpleado({ empleadoId }) {
  const [estado, setEstado] = useState('inactivo');
  const [horasTrabajadas, setHorasTrabajadas] = useState(0);
  const [ventas, setVentas] = useState(0);
  const [montoTotal, setMontoTotal] = useState(0);
  const [tiempoInicio, setTiempoInicio] = useState(null);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState('00:00:00');

  useEffect(() => {
    // Actualizar estadísticas cada minuto
    const interval = setInterval(() => {
      obtenerEstadisticas();
    }, 60000);

    // Actualizar tiempo transcurrido cada segundo cuando esté activo
    if (estado === 'activo') {
      const actualizarTiempo = () => {
        const ahora = new Date();
        if (tiempoInicio) {
          const diferencia = ahora - tiempoInicio;
          const horas = Math.floor(diferencia / 3600000);
          const minutos = Math.floor((diferencia % 3600000) / 60000);
          const segundos = Math.floor((diferencia % 60000) / 1000);
          
          setTiempoTranscurrido(
            `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
          );
        }
      };

      const intervaloTiempo = setInterval(actualizarTiempo, 1000);
      actualizarTiempo(); // Actualizar inmediatamente al cambiar a activo

      return () => clearInterval(intervaloTiempo);
    }

    return () => clearInterval(interval);
  }, [estado, tiempoInicio, empleadoId]);

  const obtenerEstadisticas = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/empleados/estadisticas/${empleadoId}`);
      const data = await response.json();
      
      setHorasTrabajadas(data.total_horas);
      setVentas(data.total_ventas);
      setMontoTotal(data.total_monto);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
    }
  };

  const registrarEntrada = () => {
    setEstado('activo');
    setTiempoInicio(new Date());
    alert('Registro de entrada exitoso');
  };

  const registrarSalida = () => {
    setEstado('inactivo');
    setTiempoInicio(null);
    alert('Registro de salida exitoso');
  };

  const registrarVenta = async (ventaId, monto) => {
    try {
      const response = await fetch('http://localhost:3000/api/empleados/venta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          empleadoId,
          ventaId,
          monto
        })
      });
      
      if (response.ok) {
        alert('Venta registrada exitosamente');
        obtenerEstadisticas();
      } else {
        alert('Error al registrar la venta');
      }
    } catch (error) {
      console.error('Error al registrar venta:', error);
      alert('Error al registrar venta');
    }
  };

  return (
    <>
    <Cabe/> 
    <div className="actividad-container">
      <div className="estado-actual">
        <h2>Estado del Empleado</h2>
        <div className={`estado ${estado}`}>
          {estado === 'activo' ? 'Activo' : 'Inactivo'}
          {estado === 'activo' && (
            <div className="tiempo-transcurrido">
              Tiempo activo: {tiempoTranscurrido}
            </div>
          )}
        </div>
        {estado === 'inactivo' ? (
          <button onClick={registrarEntrada} className="btn-entrada">
            Registrar Entrada
          </button>
        ) : (
          <button onClick={registrarSalida} className="btn-salida">
            Registrar Salida
          </button>
        )}
      </div>

      <div className="estadisticas">
        <h2>Estadísticas</h2>
        <div className="estadistica">
          <span>Horas Trabajadas:</span>
          <strong>{horasTrabajadas.toFixed(2)} horas</strong>
        </div>
        <div className="estadistica">
          <span>Ventas Realizadas:</span>
          <strong>{ventas}</strong>
        </div>
        <div className="estadistica">
          <span>Monto Total:</span>
          <strong>${montoTotal.toFixed(2)}</strong>
        </div>
      </div>
    </div>
    </>
  );
}

export default ActividadEmpleado;
