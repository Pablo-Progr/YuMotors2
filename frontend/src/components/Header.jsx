import React from "react";
import logoBlancoRojo from "../img/yumotors-rojo-blanco.png";
import "../css/header.css";

const Header = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg w-100">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav w-100 justify-content-around align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <img className="nav-logo" src={logoBlancoRojo} alt="Yu Motors" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/modelos">
                  Modelos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/concesionario">
                  Concesionario
                </a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Post Venta
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
