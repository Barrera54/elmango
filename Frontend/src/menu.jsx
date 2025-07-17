
import { useState } from 'react';
import './css/menu.css';
import Navbar from './Navnar'
import { GiHamburgerMenu } from 'react-icons/gi';

function Menu() {
  const [showNav, setShowNav ] = useState(false)
  return <div className="App">
    <header>   
      <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
     <div className="man">El mango</div>
      </header>
    <Navbar show={showNav}/>
  </div>
}

export default Menu;