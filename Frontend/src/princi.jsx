import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cabe from './menu';
import './css/pinci.css';
import SelectPage from './select'; // Importa el componente de la página de pago
import { jsPDF } from 'jspdf';

function Menu({ onLogout }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const [searchId, setSearchId] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [showPaymentModal, setShowPaymentModal] = useState(false); // Nuevo estado para el modal de pago

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [navigate]);

    const handleSearch = () => {
        if (!searchId) {
            setError('Por favor ingresa un código');
            return;
        }

        const isProductAlreadyAdded = products.some(
            (p) => p.Codi_produ.toString() === searchId
        );
        if (isProductAlreadyAdded) {
            setError('Este producto ya ha sido agregado.');
            setSearchId('');
            return;
        }

        fetch(`http://localhost:3001/productos/${searchId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Producto no encontrado');
                }
                return res.json();
            })
            .then((data) => {
                setProducts((prevProducts) => [...prevProducts, data]);
                setQuantities((prev) => ({
                    ...prev,
                    [data.Codi_produ]: 1
                }));
                setError(null);
                setSearchId('');
            })
            .catch((e) => {
                setError(e.message);
            });
    };

    const handleQuantityChange = (productId, value) => {
        const newQuantity = Math.max(1, parseInt(value) || 1);
        setQuantities((prev) => ({
            ...prev,
            [productId]: newQuantity
        }));
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('El Mango', 105, 20, { align: 'center' });

        let yPos = 40;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Producto', 20, yPos);
        doc.text('Cantidad', 80, yPos);
        doc.text('Precio Unitario', 110, yPos);
        doc.text('Precio Total', 160, yPos);

        doc.setLineWidth(0.5);
        doc.line(20, yPos + 5, 190, yPos + 5);

        doc.setFont('helvetica', 'normal');
        let total = 0;

        products.forEach((product) => {
            yPos += 10;
            const quantity = quantities[product.Codi_produ] || 1;
            const productTotal = parseFloat(product.precio) * quantity;

            doc.text(`${product.Nomproducto}`, 20, yPos);
            doc.text(quantity.toString(), 80, yPos);
            doc.text(parseFloat(product.precio).toFixed(3), 110, yPos);
            doc.text(productTotal.toFixed(3), 160, yPos);
            total += productTotal;
        });

        doc.line(20, yPos + 5, 190, yPos + 5);
        yPos += 10;
        doc.text('Total General:', 120, yPos);
        doc.text(total.toFixed(3), 160, yPos);

        yPos += 15;
        doc.text('¡Gracias por su compra!', 105, yPos, { align: 'center' });

        doc.save('factura.pdf');
    };

    const clearProducts = () => {
        setProducts([]);
        setQuantities({});
        setError(null);
        setSearchId('');
    };

    const totalAmount = products.reduce((sum, product) => {
        const quantity = quantities[product.Codi_produ] || 1;
        return sum + (parseFloat(product.precio || 0) * quantity);
    }, 0);

    return (
        <div className="main-container">
            <Cabe menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            {menuOpen && <div className="overlay"></div>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="table-container">
                <table className="prin">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            const quantity = quantities[product.Codi_produ] || 1;
                            const productTotal = parseFloat(product.precio) * quantity;

                            return (
                                <tr key={product.Codi_produ}>
                                    <td>{product.Nomproducto}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(product.Codi_produ, e.target.value)
                                            }
                                            className="styled-input"
                                        />
                                    </td>
                                    <td>{productTotal.toFixed(3)}</td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Buscar por Código"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch();
                                        }
                                    }}
                                    className="styled-input"
                                />
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="k">
                <button onClick={() => navigate('/Clientes')}>Cliente</button>
                <button onClick={() => navigate('/Domicilios')}>Domicilios</button>
                <button onClick={generatePDF}>Factura</button>
                <button onClick={clearProducts}>Anular</button>
                <button onClick={() => navigate('/Deudor')}>Deudores</button>
                <button onClick={() => setShowPaymentModal(true)}>Pago</button> {/* Cambiado para mostrar el modal */}
                <button onClick={onLogout}>Cerrar Sesión</button>
            </div>

            <div className="i">
                <h1>
                    <b className="h">
                        Total: {totalAmount.toLocaleString('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                            minimumFractionDigits: 3
                        })}
                    </b>
                </h1>
            </div>

            {/* Renderizado condicional del modal de pago */}
            {showPaymentModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setShowPaymentModal(false)}>X</button>
                        <SelectPage />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Menu;