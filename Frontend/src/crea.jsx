import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import logo from './img/icons.png'; // Asumiendo que es el logo de "TIENDA EL MANGO"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone, faIdCard, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './css/crea.css';

function Crea() {
  const navigate = useNavigate(); // Inicializar hook useNavigate

  // Estado para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [cedula, setCedula] = useState('');
  const [cargo, setCargo] = useState(''); // Corresponde a 'tipoUsuario' en el backend
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(''); // Estado para mostrar mensajes al usuario
  const [isError, setIsError] = useState(false); // Estado para indicar si el mensaje es un error

  // Función para alternar visibilidad de contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir comportamiento por defecto del formulario

    // Validación básica del lado del cliente
    if (!nombre || !telefono || !correo || !cedula || !cargo || !usuario || !contrasena) {
      setMessage('Por favor, complete todos los campos obligatorios.');
      setIsError(true);
      return;
    }

    // Datos a enviar a la API
    const formData = {
      nombre,
      telefono,
      correo,
      cedula,
      cargo, // Coincide con el campo 'cargo' del backend
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
        // Opcionalmente limpiar campos del formulario al éxito
        setNombre('');
        setTelefono('');
        setCorreo('');
        setCedula('');
        setCargo('');
        setUsuario('');
        setContrasena('');

        // Navegar a página de login después de un breve retraso
        setTimeout(() => {
          navigate('/login'); // Asumiendo que la ruta de login es '/login'
        }, 2000); // Retraso de 2 segundos
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

      {/* Área de visualización de mensajes */}
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