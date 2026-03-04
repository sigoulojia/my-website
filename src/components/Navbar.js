import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !isOpen ? "hidden" : "visible";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "visible";
  };

  return (
    <nav className="nav-container">
      <div className="nav-brand">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          WHY NOT DZ
        </Link>
      </div>

      <div className={`nav-inner ${isOpen ? "active" : ""}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
        <Link to="/shop" className="nav-link" onClick={closeMenu}>Shop</Link>
        <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>About Us</Link>
      </div>

      <button className={`burger-menu ${isOpen ? "open" : ""}`} onClick={toggleMenu} aria-label="Toggle menu">
        <span className="burger-bar"></span>
        <span className="burger-bar"></span>
        <span className="burger-bar"></span>
      </button>

      {/* Gothic Overlay for mobile */}
      <div className={`nav-overlay ${isOpen ? "active" : ""}`} onClick={closeMenu}></div>
    </nav>
  );
}

export default Navbar;
