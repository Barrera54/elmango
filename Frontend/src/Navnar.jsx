import { Link } from "react-router-dom";

const Navbar = ({ show }) => {
    return (
        <div className={show ? 'sidnav active' : 'sidnav'}>
            <ul className="scroll-vertical">
                <li><Link to="/Principal">🏠Principal</Link></li>
                <li><Link to="/Buscador">&#128269;Buscador</Link></li>
                <li><Link to="/Buscador">&#128722;Catálogo</Link></li>
                <li><Link to="/Inventario">&#128230;Inventario</Link></li>
                <li><Link to="/Venta">&#128178;Venta</Link></li>
                <li><Link to="#">&#127760;Traductor</Link></li>
                <li><a href="#">&#129333;Actividad empleado</a></li>
                <li><a href="#">&#127752;Cambio de color</a></li>
                <li><Link to="/Datosempleado">&#128221;Datos empleado</Link></li>
                <li><Link to='/Actualizaremmpl'>&#128260;Actualizar</Link></li>
                <li><Link to='/Productodevuelto'>&#128229;Devueltos</Link></li>
                <li><Link to='/Productodevuelto'>&#128227;Encuesta de producto</Link></li>
                <li><Link to="/Encuestasistem" >&#128242;Encuesta de sistema</Link></li>
                <li><Link to="/Papelera" >&#128465;Papelera de producto</Link></li>
                <li><a href="llegaprod.html">&#128666;Llegada de producto</a></li>

            </ul>
        </div>
    );
}

export default Navbar;

