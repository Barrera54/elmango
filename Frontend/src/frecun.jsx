import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 importamos esto
import './css/frecun.css';
import Cabe from './menu';

const FrequentClientForm = () => {
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const navigate = useNavigate(); // 👈 inicializamos navegación

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
        alert('Cliente registrado con éxito');
        navigate('/Clientes'); // 👈 redirige al componente de cliente
      } else {
        const errorData = await response.json();
        alert('Error al registrar: ' + errorData.error);
        console.error('Error:', errorData);
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Cabe />
      <div className="form-container">
        <h1 className="form-title">Registrar Cliente Frecuente</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="clientNameInput" className="form-label">Nombre del Cliente:</label>
            <input type="text" id="clientNameInput" className="form-input" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumberInput" className="form-label">N° de celular:</label>
            <input type="text" id="phoneNumberInput" className="form-input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="documentNumberInput" className="form-label">N° de CC o TI:</label>
            <input type="text" id="documentNumberInput" className="form-input" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} required />
          </div>
          <button type="submit" className="submit-button">Aceptar</button>
        </form>
      </div>
    </>
  );
};

export default FrequentClientForm;

