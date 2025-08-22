import React, { useState } from 'react';
import './css/select.css';

const SelectPage = ({ totalAmount, products, quantities, onClose }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cashAmount, setCashAmount] = useState('');
    const [change, setChange] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    const handlePayment = async (paymentMethod) => {
        try {
            const response = await fetch('http://localhost:3001/ventas_empleado', { // Cambia la URL si es necesario
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emplead_nom: customerName,
                    monto: totalAmount,
                    metodo: paymentMethod
                }),
            });

            if (!response.ok) {
                throw new Error('Error al registrar la venta');
            }

            const data = await response.json();
            console.log('Venta registrada con éxito:', data);

            // Mostrar mensaje de éxito
            setSuccessMessage('✅ Venta registrada con éxito');

            // Ocultar mensaje y cerrar modal después de 2 segundos
            setTimeout(() => {
                setSuccessMessage('');
                onClose();
            }, 2000);

        } catch (error) {
            console.error('Hubo un problema al registrar la venta:', error);
        }
    };

    return (
        <div className="payment-container">
            <main className="payment-options-section">
                <div className="payment-heading">
                    <h2>Forma de pago</h2>
                </div>

                {/* Mensaje de éxito */}
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}

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

                    <div
                        className="payment-option-group"
                        onClick={() => {
                            setIsMenuOpen(true);
                            setCashAmount(totalAmount.toFixed(3));
                            handlePayment('Efectivo');
                        }}
                    >
                        <div className="payment-icon cash-icon"></div>
                        <div className="payment-method-text">Efectivo</div>
                    </div>

                    <div
                        className="payment-option-group"
                        onClick={() => handlePayment('Transferencia')}
                    >
                        <div className="payment-icon transfer-icon"></div>
                        <div className="payment-method-text">Transferencia</div>
                    </div>

                    <div className="total-display">
                        <h3>Total:</h3>
                        <p>
                            {totalAmount.toLocaleString('es-CO', {
                                style: 'currency',
                                currency: 'COP',
                                minimumFractionDigits: 3
                            })}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SelectPage;