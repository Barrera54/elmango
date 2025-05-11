
const Navbar = ({show}) => {
return(
  <div className={ show ? 'sidenav active' :'sidenav '}>
    <ul>
    <li>
    <a href="#">Buscador</a>
  </li>
  <li>
    <a href="#">Catalogo inventario</a>
  </li>
  <li>
    <a href="#">Ventas</a>
  </li>
  <li>
    <a href="#">Traductor</a>
  </li>
  <li>
    <a href="#">Cambiar color</a>
  </li>
  <li>
    <a href="#">Actualizar</a>
  </li>
  <li>
    <a href="#">Actividad</a>
  </li>
  <li>
    <a href="#">Devueltos</a>
  </li>
  <li>
    <a href="#">Encuesta producto</a>
  </li>
  <li>
    <a href="#">Encuesta sistema</a>
  </li>
  <li>
    <a href="#">Papelera de producto</a>
  </li>
  <li>
    <a href="#">LLEGADA DE PRODUCTO</a>
  </li>
    </ul>

  </div>
)
}
export default Navbar