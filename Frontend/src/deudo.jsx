import React, { useState } from 'react';
import './css/deudo.css';
import Cabe from './menu';
import { useNavigate } from 'react-router-dom';

const Deudor = () => {
  const [clientName, setClientName] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const navigate = useNavigate();

  const handleAccept = async (e) => {
    e.preventDefault();
    
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
        navigate('/Clientes');
      } else {
        const error = await response.json();
        alert('Error al registrar deudor: ' + error.error);
      }
    } catch (err) {
      alert('Error de conexión con el servidor');
      console.error('Error:', err);
    }
  };

  return (
    <>
      <Cabe />
      
      <div className="deudo-container">
        <h1 className="deudo-title">Registro de Deudor</h1>
        
        <form onSubmit={handleAccept}>
          <div className="deudo-form-group">
            <label className="deudo-label">Nombre del Cliente</label>
            <input
              type="text"
              className="deudo-input"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Ingrese el nombre del cliente"
              required
            />
          </div>
          
          <div className="deudo-form-group">
            <label className="deudo-label">Monto Adeudado</label>
            <input
              type="number"
              className="deudo-input"
              value={debtAmount}
              onChange={(e) => setDebtAmount(e.target.value)}
              placeholder="Ingrese el monto adeudado"
              required
            />
          </div>
          
          <button type="submit" className="deudo-button">
            Registrar Deudor
          </button>
        </form>
      </div>
    </>
  );
};

export default Deudor;