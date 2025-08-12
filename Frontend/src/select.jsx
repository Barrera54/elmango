import React, { useState } from 'react';
import './css/select.css';

const SelectPage = ({ totalAmount, products, quantities, onClose }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cashAmount, setCashAmount] = useState('');
    const [change, setChange] = useState(0);
    const [customerName, setCustomerName] = useState('');

    const handleCashChange = (e) => {
        const value = e.target.value;
        setCashAmount(value);
        if (value && !isNaN(value)) {
            setChange(parseFloat(value) - totalAmount);
        } else {
            setChange(0);
        }
    };

    const handleCustomerNameChange = (e) => {
        setCustomerName(e.target.value);
    };

    const handlePayment = (paymentMethod) => {
        // Aquí podrías agregar lógica para procesar el pago si es necesario
        console.log(`Pago realizado con ${paymentMethod}`);
        console.log('Cliente:', customerName);
        console.log('Productos:', products);
        console.log('Total:', totalAmount);
        onClose(); // Cerrar el modal después de procesar el pago
    };

    return (
        <div className="payment-container">
            <main className="payment-options-section">
                <div className="payment-heading">
                    <h2>Forma de pago</h2>
                </div>

                <div className="payment-details">
                    <div className="customer-input-container">
                        <label>Nombre del cliente:</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={handleCustomerNameChange}
                            placeholder="Ingrese el nombre del cliente"
                        />
                    </div>

                    

                <div className="payment-option-group" onClick={() => {
                    setIsMenuOpen(true);
                    setCashAmount(totalAmount.toFixed(3));
                }}>
                    <div className="payment-icon cash-icon"></div>
                    <div className="payment-method-text">Efectivo</div>
                </div>

                <div className="payment-option-group" onClick={() => handlePayment('Transferencia')}>
                    <div className="payment-icon transfer-icon"></div>
                    <div className="payment-method-text">Transferencia</div>
                </div>

                {isMenuOpen && (
                    <div className="cash-input-container">
                        <label>Efectivo recibido:</label>
                        <input
                            type="number"
                            value={cashAmount}
                            onChange={handleCashChange}
                            min={totalAmount}
                            step="100"
                        />
                        {change > 0 && (
                            <div className="change-display">
                                <p>Cambio:</p>
                                <p>{change.toLocaleString('es-CO', {
                                    style: 'currency',
                                    currency: 'COP',
                                    minimumFractionDigits: 3
                                })}</p>
                            </div>
                        )}
                        <button 
                            className="confirm-button"
                            onClick={() => handlePayment('Efectivo')}
                            disabled={!cashAmount || parseFloat(cashAmount) < totalAmount}
                        >
                            Confirmar
                        </button>
                    </div>
                )}<div className="total-display">
                        <h3>Total:</h3>
                        <p>{totalAmount.toLocaleString('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                            minimumFractionDigits: 3
                        })}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SelectPage;