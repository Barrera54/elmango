import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard } from '@fortawesome/free-solid-svg-icons';
import logo from './img/icons.png';
import './css/login.css';

function Logo({ onLogin }) {
  const [correo, setCorreo] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correo || !tipoUsuario) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, tipoUsuario })
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
        setCorreo('');
      }
    } catch (err) {
      console.error('Error de conexión:', err);
      setError('No se pudo conectar con el servidor');
      setCorreo('');
    }
  };

  return (
    <div className="login-wrapper">
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
                <option value="Administrador">Administrador</option>
                <option value="Asistente">Asistente</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Correo"
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
    </div>
  );
}

export default Logo;