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

import corolla1 from "../img/autosnuevos/toyota/corolla/corolla1.webp";
import corolla2 from "../img/autosnuevos/toyota/corolla/corolla2.jpeg";
import corolla3 from "../img/autosnuevos/toyota/corolla/corolla3.jpeg";
import corolla4 from "../img/autosnuevos/toyota/corolla/corolla4.png";
import corolla5 from "../img/autosnuevos/toyota/corolla/corolla5.jpeg";

import corollaint1 from "../img/autosnuevos/toyota/corolla/corollaint1.jpeg";
import corollaint2 from "../img/autosnuevos/toyota/corolla/corollaint2.jpeg";
import corollaint3 from "../img/autosnuevos/toyota/corolla/corollaint3.jpeg";
import corollaint4 from "../img/autosnuevos/toyota/corolla/corollaint4.jpeg";
import corollaint5 from "../img/autosnuevos/toyota/corolla/corollaint5.jpeg";
import corollaint6 from "../img/autosnuevos/toyota/corolla/corollaint6.jpeg";
import corollaint7 from "../img/autosnuevos/toyota/corolla/corollaint7.jpeg";
import corollaint8 from "../img/autosnuevos/toyota/corolla/corollaint8.jpeg";
import corollaint9 from "../img/autosnuevos/toyota/corolla/corollaint9.jpeg";

import portada from "../img/autosnuevos/toyota/corolla/corolla-portada.webp";

import "../css/corolla.css";

const MainCorolla = () => {
  const exteriorImages = [corolla1, corolla2, corolla3, corolla4, corolla5];
  const interiorImages = [corollaint1, corollaint2, corollaint3, corollaint4, corollaint5, corollaint6, corollaint7, corollaint8, corollaint9];

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
    <div className="corolla-container">
      <h2 className="corolla-section-title">Toyota Corolla</h2>

      {/* PORTADA */}
      <section className="corolla-portada">
        <img src={portada} alt="Toyota Corolla Portada" className="corolla-portada-img" />
      </section>

      

      {/* FEATURES */}
      <section className="corolla-features">
        <div className="corolla-feature">
          <FaCogs className="corolla-feature-icon" />
          <h3>MOTOR</h3>
          <p>Motor 2.0L Dynamic Force o 1.8L Híbrido — eficiencia y rendimiento óptimos.</p>
        </div>
        <div className="corolla-feature">
          <FaTachometerAlt className="corolla-feature-icon" />
          <h3>TECNOLOGÍA</h3>
          <p>Conectividad avanzada con pantalla táctil y compatibilidad con Android Auto / Apple CarPlay.</p>
        </div>
        <div className="corolla-feature">
          <FaChair className="corolla-feature-icon" />
          <h3>CONFORT INTERIOR</h3>
          <p>Amplio espacio interior con materiales suaves al tacto y diseño ergonómico.</p>
        </div>
        <div className="corolla-feature">
          <FaSnowflake className="corolla-feature-icon" />
          <h3>SEGURIDAD</h3>
          <p>Equipado con Toyota Safety Sense: asistencia de manejo, frenado y mantenimiento de carril.</p>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="corolla-showcase">
        <div className="corolla-card" onClick={() => openModal(interiorImages, 0)}>
          <img src={corollaint1} alt="Interior Corolla" className="corolla-card-img" />
          <div className="corolla-card-overlay">
            <p>Conocé el</p>
            <h3>Interior</h3>
          </div>
        </div>

        <div className="corolla-card" onClick={() => openModal(exteriorImages, 0)}>
          <img src={corolla1} alt="Exterior Corolla" className="corolla-card-img" />
          <div className="corolla-card-overlay">
            <p>Conocé el</p>
            <h3>Exterior</h3>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalOpen && (
        <div className="corolla-modal">
          <button className="corolla-close-btn" onClick={closeModal}>×</button>
          <button className="corolla-nav-btn prev" onClick={prevImage}>‹</button>
          <img src={currentImages[currentIndex]} alt="Corolla" className="corolla-modal-img" />
          <button className="corolla-nav-btn next" onClick={nextImage}>›</button>
        </div>
      )}

      {/* DOWNLOADS */}
      <section className="corolla-downloads">
        <div className="corolla-download-box">
          <FaFileAlt className="corolla-download-icon" />
          <h3>Ficha Técnica</h3>
          <a href="https://media.toyota.com.ar/CorollaFichaTecnica.pdf" target="_blank" rel="noopener noreferrer" className="corolla-download-link">
            Descargar <FaLink className="corolla-link-icon" />
          </a>
        </div>

        <div className="corolla-download-box">
          <FaChartBar className="corolla-download-icon" />
          <h3>Información de Consumo</h3>
          <a href="https://media.toyota.com.ar/CorollaConsumo.pdf" target="_blank" rel="noopener noreferrer" className="corolla-download-link">
            Descargar <FaLink className="corolla-link-icon" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default MainCorolla;
