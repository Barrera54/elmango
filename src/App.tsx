import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
    const[ showNav, setShowNav ] = useState 
    (false)
 return <>
 <Router>
  <header>
    <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
        
    </header>
  <Navbar show={showNav} />
ro
  </Router>
 </>
}

export default App
