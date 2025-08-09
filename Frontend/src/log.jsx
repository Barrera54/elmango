import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from './img/icons.png';
import './css/login.css';

function Logo({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !contrasena || !tipoUsuario) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario,
          contrasena,
          tipoUsuario
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', data.cargo);
        localStorage.setItem('userName', data.nombre);

        onLogin();
        navigate('/Principal');
      } else {
        setError(data.mensaje || data.error || 'Credenciales incorrectas');
        setUsuario('');
        setContrasena('');
      }
    } catch (err) {
      console.error('Error de conexión:', err);
      setError('No se pudo conectar con el servidor');
      setUsuario('');
      setContrasena('');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-title">Iniciar Sesión</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Selector de tipo de usuario */}
          <div className="form-group">
            <div className="input-group">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <select
                value={tipoUsuario}
                onChange={(e) => setTipoUsuario(e.target.value)}
                className="custom-input"
                required
              >
                <option value="">Seleccione un rol</option>
                <option value="Administrador">Administrador</option>
                <option value="Empleado">Empleado</option>
              </select>
            </div>
          </div>

          {/* Campo Usuario */}
          <div className="form-group">
            <div className="input-group">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Usuario"
                className="custom-input"
                required
              />
            </div>
          </div>

          {/* Campo Contraseña con toggle */}
          <div className="form-group">
            <div className="input-group">
              <FontAwesomeIcon icon={faIdCard} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Contraseña"
                className="custom-input"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="input-icon toggle-password"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
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
    </div>
  );
}

export default Logo;
