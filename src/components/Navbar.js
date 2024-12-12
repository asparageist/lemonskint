import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <ul className="nav-links">
          <li><Link to="/">Dev Log</Link></li>
          <li><Link to="/downloads">Downloads</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 