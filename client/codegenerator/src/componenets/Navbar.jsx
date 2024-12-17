import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.css'
function Navbar() {
  const [activeLink, setActivLink] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems=[
    {name:'Home',link:'#home'},
    {name:'DesignPattern',link:'#DesignPattern'},
    {name:'Catalogs',link:'#Catologs'},
  ];

  return (
    <>
      <nav className="navbar">
        <div>
          <ul className="navbar-list">
            <li><Link to={'/'}>Home</Link></li>
            {/* <li><Link to={'/patternpage'}>Design Pattern</Link></li> */}
            <li><Link to={'/desginselect'}>Design Select</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
