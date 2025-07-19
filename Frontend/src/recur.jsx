import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './css/recupe.css';
import logo from './img/icons.png';

function PasswordRecovery() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('seleccione-un-rol');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || userType === 'seleccione-un-rol') {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/cuenta/contrasena', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: username,
          cargo: userType,
          nuevaContrasena: password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.mensaje || 'Contraseña actualizada correctamente.');
      } else {
        setMessage(data.mensaje || 'Error al actualizar la contraseña.');
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      setMessage('Error de conexión con el servidor.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="recovery-container">
      <div className="recovery-card">
        <img src={logo} alt="Tienda El Mango Logo" className="logo" />
        <h1 className="recovery-title">Cambiar Contraseña</h1>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit} className="recovery-form">
          <div className="form-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="form-select"
                required
              >
                <option value="seleccione-un-rol" disabled>Seleccione un rol</option>
                <option value="administrador">Administrador</option>
                <option value="empleado">Asistente</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nueva contraseña"
                className="form-input"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <button type="submit" className="recovery-button">
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordRecovery;
