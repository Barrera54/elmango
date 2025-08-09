import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/frecun.css';
import Cabe from './menu';

const FrequentClientForm = () => {
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nomFrecu: clientName,
      docuFrecu: documentNumber,
      celuFrecu: phoneNumber
    };

    try {
      const response = await fetch('http://localhost:3001/cliente_frecuent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Cliente frecuente registrado con éxito');
        navigate('/Clientes');
      } else {
        const errorData = await response.json();
        alert('Error al registrar: ' + errorData.error);
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Cabe />
      <div className="frequent-client-container">
        <h1 className="frequent-client-title">Registrar Cliente Frecuente</h1>
        <form onSubmit={handleSubmit}>
          <div className="frequent-client-form-group">
            <label className="frequent-client-label">Nombre del Cliente</label>
            <input
              type="text"
              className="frequent-client-input"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Nombre completo del cliente"
              required
            />
          </div>
          
          <div className="frequent-client-form-group">
            <label className="frequent-client-label">Número de Celular</label>
            <input
              type="tel"
              className="frequent-client-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Número de contacto"
              required
            />
          </div>
          
          <div className="frequent-client-form-group">
            <label className="frequent-client-label">Documento de Identidad</label>
            <input
              type="text"
              className="frequent-client-input"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder="Ingrese N° de documento"
              required
            />
          </div>
          
          <button type="submit" className="frequent-client-button">
            Registrar Cliente
          </button>
        </form>
      </div>
    </>
  );
};

export default FrequentClientForm;