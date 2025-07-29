import React, { useState } from 'react';
import './css/deudo.css';
import Cabe from './menu';
    import { useNavigate } from 'react-router-dom';

const Deudor = () => {
  const [clientName, setClientName] = useState('');
  const [debtAmount, setDebtAmount] = useState('');

  const navigate = useNavigate();

  const handleAccept = async () => {
    const data = {
      nomDeu: clientName,
      valoDeu: debtAmount
    };

    try {
      const response = await fetch('http://localhost:3001/deudor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Deudor registrado con éxito');
        setClientName('');
        setDebtAmount('');
        navigate('/Clientes') // Redirección tras éxito
      } else {
        const error = await response.json();
        alert('Error al registrar deudor: ' + error.error);
        console.error('Error:', error);
      }
    } catch (err) {
      alert('Error de conexión con el servidor');
      console.error('Error:', err);
    }
  };

  return (
    <>
      <Cabe />

      <div className="debtor-container">
        <h1 className="form-title">Deudor</h1>
        <div className="form-group">
          <label htmlFor="clientNameInput" className="form-label">Cliente:</label>
          <input
            type="text"
            id="clientNameInput"
            className="form-input"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="debtAmountInput" className="form-label">Deuda:</label>
          <input
            type="number"
            id="debtAmountInput"
            className="form-input"
            value={debtAmount}
            onChange={(e) => setDebtAmount(e.target.value)}
            required
          />
        </div>
        <button onClick={handleAccept} className="submit-button">
          <h2>Aceptar</h2>
        </button>
      </div>
    </>
  );
};

export default Deudor;
