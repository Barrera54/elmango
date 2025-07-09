import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cabe from './menu';
import './css/pinci.css';
import { jsPDF } from 'jspdf';


function Menu({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
   fetch("http://localhost:3001/productos")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al obtener los productos');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((e) => {
        setError(e.message);
        console.error('Error:', e);
      });
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Encabezado
    doc.setFontSize(20);
    doc.text('El Mango', 105, 20, { align: 'center' });
    
    // Tabla
    let yPos = 40;
    
    // Títulos de la tabla
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Producto', 20, yPos);
    doc.text('Precio Total', 120, yPos);
    
    // Línea divisora
    doc.setLineWidth(0.5);
    doc.line(20, yPos + 5, 190, yPos + 5);
    
    // Contenido
    doc.setFont('helvetica', 'normal');
    let total = 0;
    
    products.forEach((product) => {
     
      yPos += 10;
      
      // Producto en la primera columna
      doc.text(`${product.Nomproducto}`, 20, yPos);
      
      // Precio total en la segunda columna
      doc.text(product.precio, 120, yPos);
    });
    
    // Línea divisora final
    doc.line(20, yPos + 5, 190, yPos + 5);
    
    // Total general
    yPos += 10;
    doc.setFont('helvetica', );
    doc.text('Total General: 1232 ', 120, yPos);
    doc.text(total.toString(), 150, yPos);
    
    // Mensaje de agradecimiento
    yPos += 15;
    doc.setFont('helvetica', 'normal');
    doc.text('¡Gracias por su compra!', 105, yPos, { align: 'center' });
    
    doc.save('factura.pdf');
  };

  return (
    <div className="main-container">
      <Cabe menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {menuOpen && <div className="overlay"></div>}

      <div className="table-container">
        <table className='prin'>
          <thead>
            <tr>
              <th>id</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Categoria</th>
              
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.ID_produ }</td>
                <td>{product.Nomproducto}</td>
                <td>{product.stock}</td>
                <td>{product.precio}</td>
                <td>{product.categoria}</td>
                
              </tr>
              
            ))}
          </tbody>
        </table>

      </div>
      

      <div className="k">
        <button onClick={() => navigate('/Venta')}>Cliente</button>
        <button>Domicilios</button>
        <button onClick={generatePDF}>Factura</button>
        <button>Anular</button>
        <button>Deudores</button>
        <button>Pago</button>
        <button onClick={onLogout}>Cerrar Sesión</button>
      </div>

      <div className="i">
        <h1><b className='h'>Total:48.400</b></h1>
      </div>
    </div>
  );
}

export default Menu;