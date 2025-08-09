import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/devuelto.css';
import Cabe from './menu';

function ProductoDevuelto() {
    const [nombreProducto, setNombreProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [total, setTotal] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos enviados:', { nombreProducto, cantidad, total });
        navigate('/inic');
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
                            type="number"
                            className="producto-devuelto-input"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            placeholder="Cantidad devuelta"
                            required
                        />
                    </div>

                    <div className="producto-devuelto-field">
                        <label className="producto-devuelto-label">Total a Reembolsar</label>
                        <input
                            type="number"
                            className="producto-devuelto-input"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
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