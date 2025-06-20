import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Crea from './crea';
import Logo from './log';
import Recupe from './recur';
import Menu from './princi';
import Venta from './vent';
import Inventario from './inven';
import Buscador from './busca';
import Empleado from './datemple';
import Actua from './actualiza';
import Devuel from './devueltos'
import Sistem from './Sistem'
import Papel from './papele'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  // Si estamos en la ruta raíz y ya estamos autenticados, redirigir a Principal
  if (location.pathname === '/' && isAuthenticated) {
    return <Navigate to="/Principal" replace />;
  }

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Logo onLogin={handleLogin} />
            ) : (
              <Navigate to="/Principal" replace />
            )
          }
        />
        <Route
          path="/crea-cuenta"
          element={
            !isAuthenticated ? (
              <Crea />
            ) : (
              <Navigate to="/Principal" replace />
            )
          }
        />
        <Route
          path="/recuperar-contrasena"
          element={
            !isAuthenticated ? (
              <Recupe />
            ) : (
              <Navigate to="/Principal" replace />
            )
          }
        />
        <Route
          path="/Principal"
          element={
            isAuthenticated ? (
              <Menu onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/Venta"
          element={
            isAuthenticated ? (
              <Venta />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/Inventario"
          element={
            isAuthenticated ? (
              <Inventario />
            ) : (
              <Navigate to="/" replace />
            )
          }

        />
        <Route
          path="/Buscador"
          element={
            isAuthenticated ? (
              <Buscador />
            ) : (
              <Navigate to="/" replace />
            )
          }

        />
        <Route
          path="/Datosempleado"
          element={
            isAuthenticated ? (
              <Empleado />
            ) : (
              <Navigate to="/" replace />
            )
          }

        />
        <Route
          path="/Actualizaremmpl"
          element={
            isAuthenticated ? (
              <Actua />
            ) : (
              <Navigate to="/" replace />
            )
          }

        />
        <Route
          path="/Productodevuelto"
          element={
            isAuthenticated ? (
              <Devuel />
            ) : (
              <Navigate to="/" replace />
            )
          }

        />
        <Route
          path="/Encuestasistem"
          element={
            isAuthenticated ? (
              <Sistem />
            ) : (
              <Navigate to="/" replace />
            )
          }


        />
        <Route
          path="/Papelera"
          element={
            isAuthenticated ? (
              <Papel />
            ) : (
              <Navigate to="/" replace />
            )
          }


        />
        {/* Ruta por defecto para rutas no encontradas */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/Principal" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

      </Routes>
    </div>
  );
}

export default App;