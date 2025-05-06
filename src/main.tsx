import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Appsito from './components/Appsito.tsx'
import Inicio from './components/lo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

   
  <Inicio/>
    <Appsito />
  </StrictMode>,
)
