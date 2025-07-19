import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from './img/icons.png'; // Assuming this is "TIENDA EL MANGO" logo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone, faIdCard, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './css/crea.css';

function Crea() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // State for form fields
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [cedula, setCedula] = useState('');
  const [cargo, setCargo] = useState(''); // Corresponds to 'tipoUsuario' in backend
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(''); // State to display messages to the user
  const [isError, setIsError] = useState(false); // State to indicate if the message is an error

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Basic client-side validation
    if (!nombre || !telefono || !correo || !cedula || !cargo || !usuario || !contrasena) {
      setMessage('Por favor, complete todos los campos obligatorios.');
      setIsError(true);
      return;
    }

    // Data to be sent to the API
    const formData = {
      nombre,
      telefono,
      correo,
      cedula,
      cargo, // This matches the backend's 'cargo' field
      usuario,
      contrasena
    };

    try {
      const response = await fetch('http://localhost:3001/crearCuenta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.mensaje || 'Cuenta creada exitosamente.');
        setIsError(false);
        // Optionally clear form fields on success
        setNombre('');
        setTelefono('');
        setCorreo('');
        setCedula('');
        setCargo('');
        setUsuario('');
        setContrasena('');

        // Navigate to login page after a short delay
        setTimeout(() => {
          navigate('/login'); // Assuming your login route is '/login'
        }, 2000); // 2-second delay
      } else {
        setMessage(data.mensaje || 'Error al crear la cuenta. Inténtelo de nuevo.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setMessage('Error de conexión con el servidor. Inténtelo más tarde.');
      setIsError(true);
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo Tienda El Mango" className="logo-image" />
      <p className="form-title">CREAR CUENTA</p>

      {/* Message display area */}
      {message && (
        <div className={`message ${isError ? 'error-message' : 'success-message'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="fields">
        {/* Nombre */}
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input
            type="text"
            placeholder="Nombre completo"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {/* Teléfono */}
        <div className="input-group">
          <FontAwesomeIcon icon={faPhone} className="input-icon" />
          <input
            type="tel"
            placeholder="Teléfono"
            className="form-control"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        {/* Correo */}
        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        {/* Cédula */}
        <div className="input-group">
          <FontAwesomeIcon icon={faIdCard} className="input-icon" />
          <input
            type="text"
            placeholder="Cédula"
            className="form-control"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
        </div>

        {/* Cargo */}
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <select
            className="form-control"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          >
            <option value="">Seleccione el cargo</option>
            <option value="administrador">Administrador</option>
            <option value="empleado">Empleado</option>
          </select>
        </div>

        {/* Usuario */}
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input
            type="text"
            placeholder="Usuario"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        {/* Contraseña */}
        <div className="input-group password-field">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className="form-control"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="password-toggle"
            onClick={togglePasswordVisibility}
          />
        </div>

        <button type="submit" className="create-button">Crear cuenta</button>
      </form>
    </div>
  );
}

export default Crea;