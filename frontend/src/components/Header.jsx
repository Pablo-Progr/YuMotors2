import React, { useState } from "react";
import logoBlancoRojo from "../img/yumotors-rojo-blanco.png";
import "../css/header.css";

const Header = () => {
  const [showModelos, setShowModelos] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleModelos = () => setShowModelos(!showModelos);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className="navbar-container">
        <a className="nav-link" href="/">
          <img className="nav-logo" src={logoBlancoRojo} alt="Yu Motors" />
        </a>

        {/* Botón hamburguesa */}
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
          <button
            className="nav-link modelos-btn"
            onClick={toggleModelos}
            aria-expanded={showModelos}
            aria-controls="modelos-dropdown"
          >
            Modelos
          </button>
          <a className="nav-link" href="/usados">Usados</a>
          <a className="nav-link" href="/concesionario">Concesionario</a>
          <a className="nav-link" href="/toyota">Toyota</a>
          <a className="nav-link" href="/accesorios">Accesorios</a>
          <a className="nav-link" href="/repuestos">Repuestos</a>
          <a className="nav-link" href="/posventa">Post Venta</a>
        </nav>
      </div>

      {/* Dropdown de modelos */}
      <div
        id="modelos-dropdown"
        className={`modelos-dropdown ${showModelos ? "show" : ""}`}
      >
        <div className="modelos-grid">
          <div className="categoria">
            <h4>Autos</h4>
            <a href="/marcas/toyota/yaris">Yaris</a>
            <a href="/marcas/toyota/corolla">Corolla</a>
          </div>
          <div className="categoria">
            <h4>Pick-Up</h4>
            <a href="/marcas/toyota/hiluxsr">Hilux SR</a>
            <a href="/marcas/toyota/hilux-srv">Hilux SRV/SRX</a>
          </div>
          <div className="categoria">
            <h4>SUV</h4>
            <a href="/marcas/toyota/corolla-cross">Corolla Cross</a>
            <a href="/marcas/toyota/sw4">SW4</a>
            <a href="/marcas/toyota/rav4">RAV4</a>
          </div>
          <div className="categoria">
            <h4>Comercial</h4>
            <a href="/marcas/toyota/hiace-furgon">Hiace Furgón</a>
            <a href="/marcas/toyota/hiace-commuter">Hiace Commuter</a>
          </div>
          <div className="categoria">
            <h4>Deportivos</h4>
            <a href="/marcas/gr/yaris">GR Yaris</a>
            <a href="/marcas/gr/gr86">GR86</a>
            <a href="/marcas/gr/gr86">GR Supra</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
