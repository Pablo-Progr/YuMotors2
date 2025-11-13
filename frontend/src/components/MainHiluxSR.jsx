import React, { useState } from "react";
import {
  FaCogs,
  FaTachometerAlt,
  FaChair,
  FaSnowflake,
  FaFileAlt,
  FaChartBar,
  FaLink,
} from "react-icons/fa";

import hilux1 from "../img/autosnuevos/toyota/hilux/hilux1.jpeg";
import hilux2 from "../img/autosnuevos/toyota/hilux/hilux2.jpeg";
import hilux3 from "../img/autosnuevos/toyota/hilux/hilux3.jpeg";
import hilux4 from "../img/autosnuevos/toyota/hilux/hilux4.jpeg";

import hiluxint1 from "../img/autosnuevos/toyota/hilux/hiluxint1.jpeg";
import hiluxint2 from "../img/autosnuevos/toyota/hilux/hiluxint2.jpeg";
import hiluxint3 from "../img/autosnuevos/toyota/hilux/hiluxint3.png";

import portada from "../img/autosnuevos/toyota/hilux/hilux1.jpeg";

import "../css/hiluxsr.css";

const MainHiluxSR = () => {
  const exteriorImages = [hilux1, hilux2, hilux3, hilux4, hilux5];
  const interiorImages = [hiluxint1, hiluxint2, hiluxint3];

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
    <div className="hilux-container">
      <h2 className="section-title">Toyota Hilux SR</h2>

      {/* ===== PORTADA ===== */}
      <section className="hilux-portada">
        <img
          src={portada}
          alt="Toyota Hilux Portada"
          className="hilux-portada-img"
        />
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features-section">
        <div className="feature-box">
          <FaCogs className="feature-icon" />
          <h3>MOTOR</h3>
          <p>
            Motor turbodiésel 2.8L de alto rendimiento con excelente torque y eficiencia.
          </p>
        </div>
        <div className="feature-box">
          <FaTachometerAlt className="feature-icon" />
          <h3>DESEMPEÑO</h3>
          <p>
            Tracción 4x4, suspensión reforzada y control de estabilidad para todo tipo de terreno.
          </p>
        </div>
        <div className="feature-box">
          <FaChair className="feature-icon" />
          <h3>CONFORT INTERIOR</h3>
          <p>
            Interior ergonómico, asientos cómodos y tecnología pensada para el conductor.
          </p>
        </div>
        <div className="feature-box">
          <FaSnowflake className="feature-icon" />
          <h3>SEGURIDAD</h3>
          <p>
            Sistema Toyota Safety Sense: control de tracción, asistencia de frenado y airbags múltiples.
          </p>
        </div>
      </section>

      {/* ===== SHOWCASE ===== */}
      <section className="hilux-showcase">
        <div className="hilux-card" onClick={() => openModal(interiorImages)}>
          <img
            src={hiluxint1}
            alt="Interior Hilux"
            className="hilux-card-img"
          />
          <div className="hilux-card-overlay">
            <p>Conocé el</p>
            <h3>Interior</h3>
          </div>
        </div>

        <div className="hilux-card" onClick={() => openModal(exteriorImages)}>
          <img
            src={hilux1}
            alt="Exterior Hilux"
            className="hilux-card-img"
          />
          <div className="hilux-card-overlay">
            <p>Conocé el</p>
            <h3>Exterior</h3>
          </div>
        </div>
      </section>

      {/* ===== MODAL ===== */}
      {modalOpen && (
        <div className="hilux-modal">
          <button className="close-btn" onClick={closeModal}>
            ×
          </button>
          <button className="nav-btn prev" onClick={prevImage}>
            ‹
          </button>
          <img
            src={currentImages[currentIndex]}
            alt="Hilux"
            className="hilux-modal-img"
          />
          <button className="nav-btn next" onClick={nextImage}>
            ›
          </button>
        </div>
      )}

      {/* ===== DESCARGAS ===== */}
      <section className="downloads-section">
        <div className="download-box">
          <FaFileAlt className="download-icon" />
          <h3>Ficha Técnica</h3>
          <a
            href="https://media.toyota.com.ar/HiluxFichaTecnica.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="download-link"
          >
            Descargar <FaLink className="link-icon" />
          </a>
        </div>

        <div className="download-box">
          <FaChartBar className="download-icon" />
          <h3>Información de Consumo</h3>
          <a
            href="https://media.toyota.com.ar/HiluxConsumo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="download-link"
          >
            Descargar <FaLink className="link-icon" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default MainHiluxSR;
