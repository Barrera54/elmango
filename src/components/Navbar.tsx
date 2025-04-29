import { Link } from 'react-router-dom';

const Navbar = ({ show }: { show: boolean }) => {
  return (
    <div className={show ? 'sidenav active' : 'sidenav'}>
      <ul>
        <li>
          <Link to="./Catalogo">Catálogo</Link>
        </li>
        <li>
          <Link to="/inventario">Inventario</Link>
        </li>
        <li>
          <Link to="./ventas">Ventas</Link>
        </li>
        <li>
          <Link to="/traductor">Traductor</Link>
        </li>
        <li>
          <Link to="/">Cambiar de color</Link>
        </li>
        <li>
          <Link to="/">Actualizar</Link>
        </li>
        <li>
          <Link to="/">Devueltos</Link>
        </li>
        <li>
          <Link to="/">Encuesta productos</Link>
        </li>
        <li>
          <Link to="/">Encuesta de sistema</Link>
        </li>
        <li>
          <Link to="/">Papelera de producto</Link>
        </li>
        <li>
          <Link to="/">Llegada de producto</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
