import logo from './img/icons.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import'./crea.css'
function Crea() {
  return (
  
    <div className="container">
      <img src={logo} alt="Logo" />
      <p>Crear cuenta</p>
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
     
      <button><Link to="/">Crear</Link></button>
    </div>  
  )
}

export default Crea;
  