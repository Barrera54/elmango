import React, { useState } from 'react';
import './css/cli.css';
import Cabe from './menu';
import { useNavigate } from 'react-router-dom';

export default function ClientsPanel() {
  const [activePanel, setActivePanel] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook here

  const togglePanel = (panelId) => {
    setActivePanel(activePanel === panelId ? null : panelId);
  };

  return (
    <div>
      <Cabe />

      <main className="clients-container">
        <h2 className="clients-subtitle">Clientes</h2>

        <section className="clients-section">
          <div
            className={`clients-card ${activePanel === 1 ? 'active' : ''}`}
            onClick={() => togglePanel(1)}
          >
            <h3>Frecuentes <span className="arrow">{activePanel === 1 ? '▲' : '▼'}</span></h3>
          </div>

          <div className={`clients-panel ${activePanel === 1 ? 'active' : ''}`}>
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Celular</th>
                  <th>N° C.C</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Juan</td>
                  <td>52324242</td>
                  <td>545386750</td>
                </tr>
              </tbody>
            </table>
            <button className="clients-btn"  onClick={() => navigate('/Frecun')}>
              Registrar
            </button>
          </div>
        </section>

        <section className="clients-section">
          <div
            className={`clients-card ${activePanel === 2 ? 'active' : ''}`}
            onClick={() => togglePanel(2)}
          >
            <h3>Deudores <span className="arrow">{activePanel === 2 ? '▲' : '▼'}</span></h3>
          </div>

          <div className={`clients-panel ${activePanel === 2 ? 'active' : ''}`}>
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Deuda</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Luis</td>
                  <td>$55,000</td>
                </tr>
              </tbody>
            </table>
            <div className="clients-actions">
              {/* Corrected: onClick directly on the button */}
              <button className="clients-btn" onClick={() => navigate('/Deudor')}>
                Registrar
              </button>
              <button className="clients-btn clients-btn-secondary">Cancelar</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}