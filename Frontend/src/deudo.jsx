import React, { useState } from 'react';
import './css/deudo.css'; // This will be our new CSS file
import Cabe from './menu';
const Deudor = () => {
    const [clientName, setClientName] = useState('');
    const [debtAmount, setDebtAmount] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

    const handleAccept = () => {
        // Here you would typically handle the form submission,
        // e.g., send data to a backend or update global state.
        console.log('Client:', clientName);
        console.log('Debt:', debtAmount);
        alert('Deudor information submitted!');
        // For now, we'll just redirect to the home page as in the original HTML
        window.location.href = 'inic.html';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="debtAmountInput" className="form-label">Deuda:</label>
                    <input
                        type="text"
                        id="debtAmountInput"
                        className="form-input"
                        value={debtAmount}
                        onChange={(e) => setDebtAmount(e.target.value)}
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