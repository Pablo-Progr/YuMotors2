import React from "react";
import "../css/footer.css";
import logo from "../img/yumotors-rojo-blanco.png";
import { FiInstagram, FiFacebook, FiYoutube, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-logo">
          <img src={logo} alt="Yu Motors" />
        </div>

        <div className="footer-links">
          <a href="/">Volver al principio</a>
          <a href="/concesionario">Nosotros</a>
          <a href="#">Servicios</a>
          <a href="#">Contacto</a>
        </div>

        <div className="footer-social">
          <a href="https://instagram.com" aria-label="Instagram">
            <FiInstagram />
          </a>
          <a href="https://facebook.com" aria-label="Facebook">
            <FiFacebook />
          </a>
          <a href="https://youtube.com" aria-label="YouTube">
            <FiYoutube />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>©2025 Yu Motors. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
