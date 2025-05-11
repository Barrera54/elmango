import './css/login.css';
import Inicio from './App';
import { BrowserRouter, Route, Routes, Link, useLocation } from 'react-router-dom';
import'./css/img/supermarket.jpg'

function LoginForm() {
  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <h1>Login</h1>
        </div>
        <div className="divider"></div>
        <div className="form-group">
          <h1>Rol</h1>
        </div>
        <div className="dropdown-container">
          <select className="dropdown">
            <option value=""></option>
            <option value="admin">Administrador</option>
            <option value="empleado">Empleado</option>
          </select>
        </div>
        <div className="form-group">
          <h1>Contraseña</h1>
          <input type="password" />
        </div>
        <div className="button-container">
          <button>
            <Link to="/inicio">Ingresar</Link>
          </button>
        </div>
        <div className="link">Recuperar contraseña</div>
        <div className="link create-profile">Crear perfil</div>
      </div>
    </div>
  );
}

// ... (el resto del código se mantiene igual)

function AppRouter() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && <LoginForm />}
      <Routes>
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </>
  );
}

function Lo() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default Lo;