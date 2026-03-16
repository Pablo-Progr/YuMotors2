import React, { useState } from "react";
import { FaFireAlt, FaShieldAlt, FaWifi, FaFileAlt, FaChair, FaLink, FaChartBar } from "react-icons/fa";



// ===== IMPORTS SW4 =====
import portada from "../img/autosnuevos/toyota/sw4/sw1.png";

// Exterior
import sw41 from "../img/autosnuevos/toyota/sw4/sw1.png";
import sw42 from "../img/autosnuevos/toyota/sw4/sw2.png";
import sw43 from "../img/autosnuevos/toyota/sw4/sw3.png";
import sw44 from "../img/autosnuevos/toyota/sw4/sw4.png";

// Interior
import sw4int1 from "../img/autosnuevos/toyota/sw4/swint1.png";
import sw4int2 from "../img/autosnuevos/toyota/sw4/swint2.jpeg";
import sw4int3 from "../img/autosnuevos/toyota/sw4/swint3.jpeg";
import sw4int4 from "../img/autosnuevos/toyota/sw4/swint4.jpeg";

// CSS
import "../css/sw4.css";

export default function MainSW4() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const exteriorImages = [sw41, sw42, sw43, sw44];
  const interiorImages = [sw4int1, sw4int2, sw4int3, sw4int4];

  const openModal = (img) => {
    setModalImg(img);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const nextImage = () => {
    setCarouselIndex((prev) => (prev + 1) % exteriorImages.length);
  };

  const prevImage = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? exteriorImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="sw4-container">
            <h2 className="sw4-section-title">Toyota SW4</h2>
      {/* ===== PORTADA ===== */}
      <section className="sw4-portada">
        <img src={portada} alt="SW4 Portada" className="sw4-portada-img" />
      </section>

      {/* ===== CARACTERISTICAS ===== */}
      <section className="sw4-features">

        <div className="sw4-features-grid">
          <div className="sw4-feature-item">
            <FaFireAlt className="sw4-feature-icon" />
            <h3>MOTOR</h3>
            <p>
              Motor 2.8L Turbo-Diesel con gran torque y respuesta inmediata.
            </p>
          </div>

          <div className="sw4-feature-item">
            <FaShieldAlt className="sw4-feature-icon" />
            <h3>SEGURIDAD</h3>
            <p>Toyota Safety Sense con asistencia avanzada a la conducción.</p>
          </div>

          <div className="sw4-feature-item">
            <FaWifi className="sw4-feature-icon" />
            <h3>CONECTIVIDAD</h3>
            <p>
              Pantalla táctil, Android Auto, Apple CarPlay y sistema multimedia
              JBL.
            </p>
          </div>

          <div className="sw4-feature-item">
            <FaChair className="sw4-feature-icon" />
            <h3>CONFORT</h3>
            <p>
              Interior premium con 3 filas de asientos y climatizador
              automático.
            </p>
          </div>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <div className="sw4-showcase">
        <div className="sw4-card" onClick={() => openModal(sw4int1)}>
          <img src={sw4int1} className="sw4-card-img" alt="" />
          <div className="sw4-card-overlay">
            <p>Conocé el</p>
            <h3>Interior</h3>
          </div>
        </div>

        <div className="sw4-card" onClick={() => openModal(sw41)}>
          <img src={sw41} className="sw4-card-img" alt="" />
          <div className="sw4-card-overlay">
            <p>Conocé el</p>
            <h3>Exterior</h3>
          </div>
        </div>
      </div>

      {/* ===== VENTANA MODAL ===== */}
      {modalOpen && (
        <div className="sw4-modal" onClick={closeModal}>
          <button className="sw4-close-btn" onClick={closeModal}>
            ✕
          </button>
          <img src={modalImg} className="sw4-modal-img" alt="" />
        </div>
      )}

      {/* DESCARGAS */}
      {/* DESCARGAS */}
<section className="sw4-downloads">
  <div className="sw4-download-box">
    <FaFileAlt className="sw4-download-icon" />
    <h3>Ficha Técnica</h3>
    <a
      href="https://media.toyota.com.ar/4d2aaca5-e069-4a15-a7e3-38fe3744d2f6.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="sw4-download-link"
    >
      Descargar <FaLink className="sw4-link-icon" />
    </a>
  </div>

  <div className="sw4-download-box">
    <FaChartBar className="sw4-download-icon" />
    <h3>Información de Consumo</h3>
    <a
      href="https://media.toyota.com.ar/4f1c6f35-0a74-4a1a-bf75-bf75fa2c730b.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="sw4-download-link"
    >
      Descargar <FaLink className="sw4-link-icon" />
    </a>
  </div>
</section>

    </div>
  );
}
