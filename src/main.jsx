
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Incio from'./log.jsx'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
 <BrowserRouter>  
    <App /><Incio/>
  </BrowserRouter>
  //</StrictMode>,
)