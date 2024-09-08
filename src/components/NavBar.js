import React from 'react';
import { NavLink } from 'react-router-dom';

const ExternalLink = ({ to, children, className }) => {
  const handleClick = () => {
    window.location.href = to;
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

export const NavBar = () => {
  return (
    <>
      <nav className="nav-container">
        <div className="nav-main">
          <div className="nav-icons">
            <ExternalLink to="https://www.uxdevschool.com" className={({ isActive }) => isActive ? "active-nav" : ""}>
              <div className="icon-container">
                <img src="/assets/home-svgrepo-com.svg" alt="Home icon" className="icon"/>
                <span className="icon-text">Inicio</span>
              </div>
            </ExternalLink>
          </div>
          <div className="nav-icons">
            <ExternalLink to="https://uxdevschool.com/cursolanding" className={({ isActive }) => isActive ? "active-nav" : ""}>
              <div className="icon-container">
                <img src="/assets/courses-svgrepo-com.svg" alt="Courses icon" className="icon"/>
                <span className="icon-text">Cursos</span>
              </div>
            </ExternalLink>
          </div>
          <div className="nav-icons">
            <ExternalLink to="https://uxdevschool.com/nosotrospagina" className={({ isActive }) => isActive ? "active-nav" : ""}>
              <div className="icon-container">
                <img src="/assets/about-us-svgrepo-com.svg" alt="About icon" className="icon"/>
                <span className="icon-text">Nosotros</span>
              </div>
            </ExternalLink>
          </div>
          <div className="nav-icons">
            <NavLink to="/postmain" className={({ isActive }) => isActive ? "active-nav" : ""}>
              <div className="icon-container">
                <img src="/assets/blog-svgrepo-com.svg" alt="Blog icon" className="icon"/>
                <span className="icon-text">Blog</span>
              </div>
            </NavLink>
          </div>
          <div className="nav-icons">
            <NavLink to="/login" className={({ isActive }) => isActive ? "active-nav" : ""}>
              <div className="icon-container">
                <img src="/assets/login-svgrepo-com.svg" alt="Login icon" className="icon"/>
                <span className="icon-text">Login</span>
              </div>
            </NavLink>
          </div>
        </div>    
      </nav>
    </>
  );
}
