import React, { useState } from 'react';
import './css/select.css'; // This will be our new CSS file
import Cabe from './menu';

const SelectPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
       <div>
<Cabe />
            <main className="payment-options-section">
                <div className="payment-heading">
                    <h2>Forma de pago</h2>
                </div>
                <div className="payment-option-group">
                    <a href="inic.html" className="payment-icon-link" aria-label="Pay with Cash">
                        <div className="payment-icon cash-icon"></div>
                    </a>
                    <div className="payment-method-text">Efectivo</div>
                </div>
                <div className="payment-option-group">
                    <a href="inic.html" className="payment-icon-link" aria-label="Pay with Transfer">
                        <div className="payment-icon transfer-icon"></div>
                    </a>
                    <div className="payment-method-text">Transferencia</div>
                </div>
            </main>
        </div>
    );
};

export default SelectPage;