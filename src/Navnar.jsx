import { Link } from "react-router-dom";

const Navbar = ({ show }) => {
    return (
        <div className={show ? 'sidnav active' : 'sidnav'}>
            <ul className="scroll-vertical">
                <li><Link to="/Principal">Principal</Link></li>
                <li><Link to="/Buscador">Buscador</Link></li>
                <li><a href="cata.html">Catálogo</a></li>
                <li><Link to="/Inventario">Inventario</Link></li>
                <li><Link to="/Venta">Venta</Link></li>
                <li><Link to="#">Traductor</Link></li>
                <li><a href="#">Actividad empleado</a></li>
                <li><a href="#">Cambio de color</a></li>
                <li><Link to="/Datosempleado">Datos empleado</Link></li>
                <li><Link to='/Actualizaremmpl'>Actualizar</Link></li>
                <li><a href="devuel.html">Devueltos</a></li>
                <li><a href="encuespro.html">Encuesta de producto</a></li>
                <li><a href="sistem.html">Encuesta de sistema</a></li>
                <li><a href="papel.html">Papelera de producto</a></li>
                <li><a href="llegaprod.html">Llegada de producto</a></li>
            </ul>
        </div>
    );
}

export default Navbar;

