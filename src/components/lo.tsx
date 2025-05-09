{/*RT14 Como desarrollador frontend quiero crear un login para que el usuario se logue antes de entrar a la pagina*/}
import './css/login.css';

function Lo() {
  return (
    <div>
      <div className="l">
        <div className="k">
          <div className="n">
            <h1>Login</h1>
          </div>
          <div className="j"></div>
          <div className="h">
            <h1>Rol</h1>
          </div>
          <div className="o">
            <select className="dropdown">
              <option value=""></option>
              <option value="admin">Administrador</option>
              <option value="empleado">Empleado</option>
            </select>
          </div>
          <div className="ma"> <h1>Contraseña</h1>
          <input type="text" /></div>   <button>ingresar</button>
          <div className="po"> Recuperar 
            contraseña</div>
            <div className="mi">Crear perfil</div>
        </div>
     
      </div>
    </div>
  );
}

export default Lo;
