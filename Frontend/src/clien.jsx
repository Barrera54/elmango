import React, { useState, useEffect } from 'react';
import './css/cli.css';
import Cabe from './menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ClientsPanel() {
  const [activePanel, setActivePanel] = useState(null);
  const [clientesFrecuentes, setClientesFrecuentes] = useState([]);
  const [deudores, setDeudores] = useState([]); // ✅ Estado para deudores
  const [currentPageFrecuentes, setCurrentPageFrecuentes] = useState(1);
  const [currentPageDeudores, setCurrentPageDeudores] = useState(1);
  const navigate = useNavigate();
  const rowsPerPage = 2;

  // ✅ Cargar clientes frecuentes
  useEffect(() => {
    axios.get('http://localhost:3001/cliente_frecuent')
      .then(res => setClientesFrecuentes(res.data))
      .catch(err => console.error('Error al obtener clientes frecuentes:', err));
  }, []);

  // ✅ Cargar deudores desde API
  useEffect(() => {
    axios.get('http://localhost:3001/deudor')
      .then(res => setDeudores(res.data))
      .catch(err => console.error('Error al obtener deudores:', err));
  }, []);

  const togglePanel = (panelId) => {
    setActivePanel(activePanel === panelId ? null : panelId);
  };

  // Paginación clientes frecuentes
  const indexOfLastFrecuente = currentPageFrecuentes * rowsPerPage;
  const indexOfFirstFrecuente = indexOfLastFrecuente - rowsPerPage;
  const currentFrecuentes = clientesFrecuentes.slice(indexOfFirstFrecuente, indexOfLastFrecuente);
  const totalPagesFrecuentes = Math.ceil(clientesFrecuentes.length / rowsPerPage);

  // Paginación deudores
  const indexOfLastDeudor = currentPageDeudores * rowsPerPage;
  const indexOfFirstDeudor = indexOfLastDeudor - rowsPerPage;
  const currentDeudores = deudores.slice(indexOfFirstDeudor, indexOfLastDeudor);
  const totalPagesDeudores = Math.ceil(deudores.length / rowsPerPage);

  const paginateFrecuentes = (pageNumber) => setCurrentPageFrecuentes(pageNumber);
  const paginateDeudores = (pageNumber) => setCurrentPageDeudores(pageNumber);

  return (
    <div>
      <Cabe />
      <main className="clients-container">
        <h2 className="clients-subtitle">Clientes</h2>

        {/* Sección Frecuentes */}
        <section className="clients-section">
          <div
            className={`clients-card ${activePanel === 1 ? 'active' : ''}`}
            onClick={() => togglePanel(1)}
          >
            <h3>Frecuentes <span className="arrow">{activePanel === 1 ? '▲' : '▼'}</span></h3>
          </div>

          <div className={`clients-panel ${activePanel === 1 ? 'active' : ''}`}>
            <div className="table-scroll-wrapper">
              <table className="clients-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Celular</th>
                    <th>N° C.C</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFrecuentes.map((cliente, index) => (
                    <tr key={index}>
                      <td>{cliente.nomFrecu}</td>
                      <td>{cliente.celuFrecu}</td>
                      <td>{cliente.docuFrecu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="clients-navigation">
              <button 
                onClick={() => paginateFrecuentes(currentPageFrecuentes - 1)}
                disabled={currentPageFrecuentes === 1}
              >
                Anterior
              </button>
              <span>Página {currentPageFrecuentes} de {totalPagesFrecuentes}</span>
              <button 
                onClick={() => paginateFrecuentes(currentPageFrecuentes + 1)}
                disabled={currentPageFrecuentes === totalPagesFrecuentes || totalPagesFrecuentes === 0}
              >
                Siguiente
              </button>
            </div>

            <button className="clients-btn" onClick={() => navigate('/Frecun')}>
              Registrar
            </button>
          </div>
        </section>

        {/* Sección Deudores */}
        <section className="clients-section">
          <div
            className={`clients-card ${activePanel === 2 ? 'active' : ''}`}
            onClick={() => togglePanel(2)}
          >
            <h3>Deudores <span className="arrow">{activePanel === 2 ? '▲' : '▼'}</span></h3>
          </div>

          <div className={`clients-panel ${activePanel === 2 ? 'active' : ''}`}>
            <div className="table-scroll-wrapper">
              <table className="clients-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Deuda</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDeudores.map((deudor, index) => (
                    <tr key={index}>
                      <td>{deudor.nomDeu}</td>
                      <td>{deudor.valoDeu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="clients-navigation">
              <button 
                onClick={() => paginateDeudores(currentPageDeudores - 1)}
                disabled={currentPageDeudores === 1}
              >
                Anterior
              </button>
              <span>Página {currentPageDeudores} de {totalPagesDeudores}</span>
              <button 
                onClick={() => paginateDeudores(currentPageDeudores + 1)}
                disabled={currentPageDeudores === totalPagesDeudores || totalPagesDeudores === 0}
              >
                Siguiente
              </button>
            </div>

            <div className="clients-actions">
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
