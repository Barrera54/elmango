
import logo from './img/icons.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import'./index.css'
import fon from './img/supermarket.jpg'

function Logo() {
  return (
 
    <div className="login-container">
      <img src={logo} alt="Logo" />
      <p>Login</p>
      <div className="fields">
        <div className="data">
          <FontAwesomeIcon icon={faUser} className="nu" />
          <select>
                <option value="administrador"></option>
                <option value="editor">Administrador</option>
                <option value="lector">Empleado</option>
            </select>
        </div>
        <div className="data">
        <FontAwesomeIcon icon={faLock} className="nu"/>
        <input type="password"   />
        </div>
      </div>
     <div className="gu"> 
      <Link to="/crea cuenta">Crear cuenta</Link></div>
     <Link to="/recuperarcontraseña">Recuperar contraseña</Link>
<button><Link to="/Principal">Ingresar</Link></button>
    </div> 
  )
}

export default Logo;