import { useState } from 'react'
import Navbar from './components/Navbar'
import './css/App.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import DataTable from 'react-data-table-component'


function App() {
    const[ showNav, setShowNav ] = useState 
    (false)
const columns =[
  {
 name: "Producto",
 selector: row => row.Producto,

},
 {
 name: "Cantidad",
  selector:row =>row.Cantidad,

}, {
 name: "Precio",
selector: row =>row.Precio

},{
  name:"Hora",
   selector: row =>row.Hora,

}

]
const data =[
  {
 Producto:"Mango",
 Precio:"3000",
 Cantidad:"2"
},
 {
 Producto:"Leche",
 Precio:"12000",
 Cantidad:"3"
},
 {
 Producto:"papa",
 Precio:"3000",
 Cantidad:"2"
},
 {
 Producto:"cilatro",
 Precio:"1000",
 Cantidad:"1.5"
},
 {
 Producto:"pasta",
 Precio:"4000",
 Cantidad:"1"
},
 {
 Producto:"Salsa roja",
 Precio:"2000",
 Cantidad:"1"
},
 {
 Producto:"Yogurt colanta de mora",
 Precio:"12000",
 Cantidad:"3"
},
 {
 Producto:"Trapeador",
 Precio:"6000",
 Cantidad:"1"
},
 {
 Producto:"escoba",
 Precio:"5000",
 Cantidad:"1"
},
 {
 Producto:" crema de Leche",
 Precio:"2500",
 Cantidad:"3"
},
 {
 Producto:"leachuga",
 Precio:"2000",
 Cantidad:"1"
}

]
const customStyles = {
  headCells: {
    style: {
      fontSize: '18px', // tamaño para los encabezados
      fontWeight: 'bold',
      
    },
  },
  cells: {
    style: {
      fontSize: '16px', // tamaño para las celdas
    },
  },
}
 return( <>
 <Router>
  <header>
    <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
        <div className="a">El mango</div>
    </header>
  <Navbar show={showNav} />
<div className='main'>
 
</div>
  </Router>
<div className='el'>
  <DataTable
  columns={columns}
  data={data}
   customStyles={customStyles}
  />
</div>
<div className="p">
<button> Cliente</button>
<button> Facturas</button>
<button> Deudores</button>
<button> Domicilios</button>
<button> Anular</button>
<button> Pago</button>
</div>
  <div className="la"><h1>Total</h1><div className={`lo ${showNav ? 'hidden-line' : ''}`}></div></div>

 </>
 )
}

export default App
