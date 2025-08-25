import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/devuelto.css';
import Cabe from './menu';

function ProductoDevuelto() {
    // Definimos los estados para los campos del formulario
    const [nombreProducto, setNombreProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [total, setTotal] = useState('');
    const navigate = useNavigate();

    // Función para manejar el cambio en el campo de cantidad con validación
    const handleCantidadChange = (e) => {
        const value = e.target.value;
        // Permite solo números y un punto decimal
        const regex = /^[0-9]*\.?[0-9]*$/;
        
        if (regex.test(value) || value === '') {
            setCantidad(value);
        } else {
            alert('Por favor, ingresa solo números para la cantidad.');
        }
    };

    // Función para manejar el cambio en el campo de total con validación
    const handleTotalChange = (e) => {
        const value = e.target.value;
        // Permite solo números y un punto decimal
        const regex = /^[0-9]*\.?[0-9]*$/;
        
        if (regex.test(value) || value === '') {
            setTotal(value);
        } else {
            alert('Por favor, ingresa solo números para el total.');
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Creamos un objeto con los datos que se enviarán a la API
        const devolucionData = {
            producto_Nom: nombreProducto,
            cantidad: cantidad,
            Monto: total,
            fecha_devolucion: new Date().toISOString().slice(0, 10) // Genera la fecha actual en formato YYYY-MM-DD
        };

        try {
            // Realizamos la petición POST a la API
            const response = await fetch('http://localhost:3001/devoluciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(devolucionData),
            });

            // Parseamos la respuesta del servidor
            const result = await response.json();

            // Verificamos si la respuesta fue exitosa
            if (response.ok) {
                console.log('Devolución registrada exitosamente:', result);
                // Si todo sale bien, esperamos 2 segundos antes de navegar
                setTimeout(() => {
                    navigate('/princi');
                }, 2000); // 2000 milisegundos = 2 segundos
            } else {
                console.error('Error al registrar la devolución:', result.error);
                alert('Error al registrar la devolución: ' + result.details);
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error de conexión con el servidor. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <>
            <Cabe />
            <div className="producto-devuelto-container">
                <h1 className="producto-devuelto-title">Registro de Devolución</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="producto-devuelto-field">
                        <label className="producto-devuelto-label">Producto Devuelto</label>
                        <input
                            type="text"
                            className="producto-devuelto-input"
                            value={nombreProducto}
                            onChange={(e) => setNombreProducto(e.target.value)}
                            placeholder="Nombre del producto"
                            required
                        />
                    </div>

                    <div className="producto-devuelto-field">
                        <label className="producto-devuelto-label">Cantidad</label>
                        <input
                            type="text" // Cambiamos a 'text' para controlar la entrada de caracteres
                            className="producto-devuelto-input"
                            value={cantidad}
                            onChange={handleCantidadChange} // Usamos la nueva función de manejo
                            placeholder="Cantidad devuelta"
                            required
                        />
                    </div>

                    <div className="producto-devuelto-field">
                        <label className="producto-devuelto-label">Total a Reembolsar</label>
                        <input
                            type="text" // Cambiamos a 'text' para controlar la entrada de caracteres
                            className="producto-devuelto-input"
                            value={total}
                            onChange={handleTotalChange} // Usamos la nueva función de manejo
                            placeholder="Monto total"
                            required
                        />
                    </div>

                    <button type="submit" className="producto-devuelto-button">
                        Registrar Devolución
                    </button>
                </form>
            </div>
        </>
    );
}

export default ProductoDevuelto;