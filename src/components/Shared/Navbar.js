import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Sistema de Tickets</div>
      <div className="navbar-links">
        <Link to="/login">Login</Link>
        <Link to="/admin">Administrador</Link>
        <Link to="/mesa-ayuda">Mesa de Ayuda</Link>
        <Link to="/tecnico">Técnico</Link>
      </div>
    </nav>
  );
};

export default Navbar;
