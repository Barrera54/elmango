import { Link } from "react-router-dom";

const Navbar = ({ show }) => {
    return (
        <div className={show ? 'sidnav active' : 'sidnav'}>
            <ul className="scroll-vertical">
                <li><Link to="/Principal">Principal</Link></li>
                <li><Link to="/Buscador">Buscador</Link></li>
                <li><Link to="/Buscador">Catálogo</Link></li>
                <li><Link to="/Inventario">Inventario</Link></li>
                <li><Link to="/Venta">Venta</Link></li>
                <li><Link to="#">Traductor</Link></li>
                <li><a href="#">Actividad empleado</a></li>
                <li><a href="#">Cambio de color</a></li>
                <li><Link to="/Datosempleado">Datos empleado</Link></li>
                <li><Link to='/Actualizaremmpl'>Actualizar</Link></li>
                <li><Link to='/Productodevuelto'>Devueltos</Link></li>
                <li><Link to='/Productodevuelto'>Encuesta de producto</Link></li>
                <li><Link to="/Encuestasistem" >Encuesta de sistema</Link></li>
                <li><Link to= "/Papelera"  >Papelera de producto</Link></li>
                <li><a href="llegaprod.html">Llegada de producto</a></li>
            </ul>
        </div>
    );
}

export default Navbar;

