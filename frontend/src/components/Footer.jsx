import React from "react";
import "../css/footer.css";
import logo from "../img/yumotors-rojo-blanco.png";
import { FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiExternalLink } from "react-icons/fi";
import useAuthStore from "../store/authStore";

const Footer = () => {
  const { isAdmin } = useAuthStore();
  return (
    <footer className="footer-container">
      <div className="footer-main">
        <div className="footer-logo">
          <img src={logo} alt="Yu Motors" />
        </div>

        <nav className="footer-nav">
          <a href="/concesionario">Concesionarios</a>
          <a href="https://www.lexus.com.ar/es.html" className="footer-link-external">
            Lexus <FiExternalLink />
          </a>
          <a href="/contacto">Términos y condiciones</a>
          <a href={isAdmin ? "/admin" : "/404"}>Administracion</a>
        </nav>

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

      <div className="footer-copyright">
        <p>©2025 Yu Motors. Todos los derechos reservados.</p>
      </div>

      
    </footer>
  );
};

export default Footer;
