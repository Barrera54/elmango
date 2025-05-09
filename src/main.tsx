import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Appsito from './components/Appsito.tsx'
import Inicio from './components/lo.tsx'
import Buscador from'./components/Buscador.tsx'
import Venta from './components/ventas.tsx'
import Clie from './components/Cliente.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Inicio/> 
   <Appsito />
<Buscador/>
<Venta/>
<Clie/>
  </StrictMode>,
)
