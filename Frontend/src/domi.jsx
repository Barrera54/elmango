import React, { useState } from 'react';
import './css/domi.css'; // Archivo CSS para estilos
import Cabe from './menu';

const Domicilios = () => {
    const [openPanel, setOpenPanel] = useState(null);

    const toggleInfo = (panelNumber) => {
        setOpenPanel(openPanel === panelNumber ? null : panelNumber);
    };

    return (
        <>
            <Cabe />

            <div className="primary-content-wrapper"> {/* Contenedor principal */}
                <div className="page-title-section">
                    <h1 className="page-title">Detalles de Domicilios</h1>
                </div>

                {/* Sección de GPS */}
                <div className={`collapsible-rectangle ${openPanel === 2 ? 'active' : ''}`} onClick={() => toggleInfo(2)}>
                    <h2 className="rectangle-title">
                        Información GPS
                        <span className="toggle-arrow"></span>
                    </h2>
                </div>
                <div className={`info-display-panel ${openPanel === 2 ? 'active' : ''}`} id="infoPanel2">
                    <div className="panel-content">
                        <div className="data-section">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Costo de Envío</th>
                                        <th>Distancia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>$5000</td>
                                        <td>25km</td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* Imagen ilustrativa del GPS */}
                            <img src="./css/img/gps.jpg" alt="GPS Illustration" className="panel-image" />
                        </div>
                    </div>
                </div>

                {/* Sección de Contabilidad */}
                <div className={`collapsible-rectangle ${openPanel === 1 ? 'active' : ''}`} onClick={() => toggleInfo(1)}>
                    <h2 className="rectangle-title">
                        Contabilidad de Domicilios
                        <span className="toggle-arrow"></span>
                    </h2>
                </div>
                <div className={`info-display-panel ${openPanel === 1 ? 'active' : ''}`} id="infoPanel1">
                    <div className="panel-content">
                        <div className="accounting-details">
                            <p className="accounting-item">Cantidad: #</p>
                            <p className="accounting-item">Total: #</p>
                            <p className="accounting-item">Domiciliario: ----</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Domicilios;