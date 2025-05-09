import { useState } from 'react'
import Navbar from './Navbar'
import './css/App.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BrowserRouter as Router } from 'react-router-dom'
import DataTable, { TableColumn } from 'react-data-table-component'



interface ProductoRow {
  Producto: string;
  Precio: string; 
  Cantidad: string; 
  Hora?: string; 
}

function Appsito() {
  const [showNav, setShowNav] = useState(false)

  const columns: TableColumn<ProductoRow>[] = [
    {
      name: "Producto",
      selector: (row: ProductoRow) => row.Producto,
    },
    {
      name: "Cantidad",
      selector: (row: ProductoRow) => row.Cantidad,
    },
    {
      name: "Precio",
      selector: (row: ProductoRow) => row.Precio,
    },
    {
      name: "Hora",
      selector: (row: ProductoRow) => row.Hora || "",
    }
  ];

  const data: ProductoRow[] = [
    { Producto: "Mango", Precio: "3000", Cantidad: "2" },
    { Producto: "Leche", Precio: "12000", Cantidad: "3" },
    { Producto: "Papa", Precio: "3000", Cantidad: "2" },
    { Producto: "Cilantro", Precio: "1000", Cantidad: "1.5" },
    { Producto: "Pasta", Precio: "4000", Cantidad: "1" },
    { Producto: "Salsa roja", Precio: "2000", Cantidad: "1" },
    { Producto: "Yogurt colanta de mora", Precio: "12000", Cantidad: "3" },
    { Producto: "Trapeador", Precio: "6000", Cantidad: "1" },
    { Producto: "Escoba", Precio: "5000", Cantidad: "1" },
    { Producto: "Crema de Leche", Precio: "2500", Cantidad: "3" },
    { Producto: "Lechuga", Precio: "2000", Cantidad: "1" },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    cells: {
      style: {
        fontSize: '16px',
      },
    },
  };

  return (
    <>
      <Router>
        <header>
          <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
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
       <a href="./pages/venta"><button>Cliente</button></a>
        <button>Facturas</button>
        <button>Deudores</button>
        <button>Domicilios</button>
        <button>Anular</button>
        <button>Pago</button>
      </div>

      <div className="la">
       
        <div className={`lo ${showNav ? 'hidden-line' : ''}`}> <div className="ji"> <h1>Total</h1></div></div>
      </div>
    </>
  )
}

export default Appsito
