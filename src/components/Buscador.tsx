{/*
RT04 Como desarrollador frontend quiero crear un apartado llamado inventario para que el usuario pueda agregar, editar y eliminar productos*/}
import './css/buca.css'; // Importa el archivo de estilos

function Inventario() {
  return (
    <div className="">
   <div className="li"><h1>Inventario</h1></div>
      <div className="search-container"> 
      <div className="multicolor-search">
        <input 
          type="text" 
          placeholder="Buscar..." 
          className="search-input"
        />
        <button className="search-button">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </div>
    </div>
       <div className="pro">
        <h1>Producto</h1>
      </div><div className="linea-horizontal">
      </div>
      <div className="linea-vertical"><div className="pi"></div><div className="botones-fila">
        <button className="edit">Editar</button>
        <button className="borro">Borrar</button>
        <button className="agre">Agrega</button></div>
      </div>
      
    </div>
  );
}

export default Inventario;