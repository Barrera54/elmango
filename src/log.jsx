
import logo from './img/icons.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import'./index.css'

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
      <Link to="/crea cuenta"> Crear cuenta</Link>
      <Link to="/recuperarcontraseña">Reacuperar contraseña</Link>
      <button><a href="">Ingresar</a></button>

    </div>  
  )
}

export default Logo