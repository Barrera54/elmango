import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import logo from './img/icons.png';
import './css/login.css';

function Logo({ onLogin }) {
  const [contraseña, setContraseña] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!tipoUsuario || !contraseña) {
      setError('Por favor complete todos los campos');
      return;
    }

    // Here would be the actual authentication logic
    // For now, we simulate a successful authentication
    try {
      // Save authentication status to localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', tipoUsuario);

      // Call the onLogin function provided by the parent component
      onLogin();

      // Redirect to the main page
      navigate('/Principal');
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intente nuevamente.');
      console.error('Error de autenticación:', err);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />
      <h2 className="login-title">Iniciar Sesión</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <div className="input-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <select
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              className="form-control"
              required
            >
              <option value="">Seleccione un rol</option>
              <option value="administrador">Administrador</option>
              <option value="empleado">Empleado</option>
            </select>
          </div>
        </div>
          
        <div className="form-group">
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Contraseña"
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="login">
          <Link to="/crea-cuenta" className="login__link">Crear cuenta</Link>
          <Link to="/recuperar-contrasena" className="login__link">¿Olvidaste tu contraseña?</Link>
        </div>

        <div className="form__actions">
         <button type="submit" className="login-button">Ingresar</button>
        </div>
      </form>
    </div>
  );
}

export default Logo;