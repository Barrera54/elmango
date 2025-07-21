import React, { useState } from 'react';
import './css/frecun.css'; // This will be our new CSS file
import Cabe from './menu';
const FrequentClientForm = () => {
    const [clientName, setClientName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        // Here you would typically handle the form submission,
        // e.g., send data to a backend or update global state.
        console.log('Frequent Client Data:', {
            clientName,
            phoneNumber,
            documentNumber,
        });
        alert('Datos del cliente frecuente registrados con éxito!');
        // For now, we'll just redirect to the home page as in the original HTML
        window.location.href = 'inic.html';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
          <Cabe />

            <div className="form-container">
                <h1 className="form-title">Registrar Cliente Frecuente</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="clientNameInput" className="form-label">Nombre del Cliente:</label>
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
                        <label htmlFor="phoneNumberInput" className="form-label">N° de celular:</label>
                        <input
                            type="text"
                            id="phoneNumberInput"
                            className="form-input"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="documentNumberInput" className="form-label">N° de CC o TI:</label>
                        <input
                            type="text"
                            id="documentNumberInput"
                            className="form-input"
                            value={documentNumber}
                            onChange={(e) => setDocumentNumber(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Aceptar
                    </button>
                </form>
            </div>
        </>
    );
};

export default FrequentClientForm;