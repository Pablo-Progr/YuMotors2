import React, { useState } from "react";
import {
  FaCogs,
  FaTachometerAlt,
  FaChair,
  FaShieldAlt,
  FaFileAlt,
  FaChartBar,
  FaLink,
} from "react-icons/fa";

import lsext1 from "../img/autosnuevos/lexus/ls/lsext1.jpg";
import lsext2 from "../img/autosnuevos/lexus/ls/lsext2.jpg";
import lsext3 from "../img/autosnuevos/lexus/ls/lsext3.jpg";
import lsext4 from "../img/autosnuevos/lexus/ls/lsext4.jpg";
import lsext5 from "../img/autosnuevos/lexus/ls/lsext5.jpg";

import lsint1 from "../img/autosnuevos/lexus/ls/lsint1.jpg";
import lsint2 from "../img/autosnuevos/lexus/ls/lsint2.jpg";
import lsint3 from "../img/autosnuevos/lexus/ls/lsint3.jpg";
import lsint4 from "../img/autosnuevos/lexus/ls/lsint4.jpg";
import lsint5 from "../img/autosnuevos/lexus/ls/lsint5.jpg";
import lsint6 from "../img/autosnuevos/lexus/ls/lsint6.jpg";

import portada from "../img/autosnuevos/lexus/ls/lexus-ls.jpg";

import "../css/ls.css";

const MainLexusLS = () => {
  const exteriorImages = [lsext1, lsext2, lsext3, lsext4, lsext5];
  const interiorImages = [lsint1, lsint2, lsint3, lsint4, lsint5, lsint6];

  const [modalOpen, setModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (images, index = 0) => {
    setCurrentImages(images);
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  const nextImage = () =>
    setCurrentIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1
    );

  return (
    <div className="ls-container">
      <h2 className="ls-section-title">Lexus LS</h2>

      {/* PORTADA */}
      <section className="ls-portada">
        <img src={portada} alt="Lexus LS Portada" className="ls-portada-img" />
      </section>

      {/* FEATURES */}
      <section className="ls-features">
        <div className="ls-feature">
          <FaCogs className="ls-feature-icon" />
          <h3>MOTOR</h3>
          <p>Motor V8 5.0L de aspiración natural o V6 3.5L Híbrido Multi Stage — potencia y refinamiento excepcionales.</p>
        </div>
        <div className="ls-feature">
          <FaTachometerAlt className="ls-feature-icon" />
          <h3>TECNOLOGÍA</h3>
          <p>Sistema multimedia Lexus Premium con pantalla táctil 12.3", sonido Mark Levinson® y conectividad total.</p>
        </div>
        <div className="ls-feature">
          <FaChair className="ls-feature-icon" />
          <h3>CONFORT SUPERIOR</h3>
          <p>Asientos de cuero semi-anilina con calefacción, ventilación y masaje. Aislamiento acústico de última generación.</p>
        </div>
        <div className="ls-feature">
          <FaShieldAlt className="ls-feature-icon" />
          <h3>SEGURIDAD</h3>
          <p>Lexus Safety System+ con frenado de emergencia, control de carril, monitoreo de punto ciego y visión nocturna.</p>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="ls-showcase">
        <div className="ls-card" onClick={() => openModal(interiorImages, 0)}>
          <img src={lsint1} alt="Interior Lexus LS" className="ls-card-img" />
          <div className="ls-card-overlay">
            <p>Conocé el</p>
            <h3>Interior</h3>
          </div>
        </div>

        <div className="ls-card" onClick={() => openModal(exteriorImages, 0)}>
          <img src={lsext1} alt="Exterior Lexus LS" className="ls-card-img" />
          <div className="ls-card-overlay">
            <p>Conocé el</p>
            <h3>Exterior</h3>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalOpen && (
        <div className="ls-modal">
          <button className="ls-close-btn" onClick={closeModal}>×</button>
          <button className="ls-nav-btn prev" onClick={prevImage}>‹</button>
          <img src={currentImages[currentIndex]} alt="Lexus LS" className="ls-modal-img" />
          <button className="ls-nav-btn next" onClick={nextImage}>›</button>
        </div>
      )}

      {/* DOWNLOADS */}
      <section className="ls-downloads">
        <div className="ls-download-box">
          <FaFileAlt className="ls-download-icon" />
          <h3>Ficha Técnica</h3>
          <a
            href="https://lacddam.lexusasia.com/lexus-v3-argentina/models/brochures/sedan/Ficha%20T%C3%A9cnica%20LS%20500h%20Executive.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ls-download-link"
          >
            Descargar <FaLink className="ls-link-icon" />
          </a>
        </div>

        <div className="ls-download-box">
          <FaChartBar className="ls-download-icon" />
          <h3>Información de Consumo</h3>
          <a
            href="https://lacddam.lexusasia.com/lexus-v3-argentina/models/brochures/sedan/Información%20de%20Consumo%20LS%20500h%20Executive.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ls-download-link"
          >
            Descargar <FaLink className="ls-link-icon" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default MainLexusLS;
