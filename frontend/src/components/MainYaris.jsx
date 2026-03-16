import React, { useState } from "react";
import { FaCogs, FaTachometerAlt, FaChair, FaSnowflake, FaFileAlt, FaChartBar, FaLink } from "react-icons/fa";

import gryaris1 from "../img/autosnuevos/gr/gryaris/gryaris1.jpeg";
import gryaris2 from "../img/autosnuevos/gr/gryaris/gryaris2.jpeg";
import gryaris3 from "../img/autosnuevos/gr/gryaris/gryaris3.jpeg";
import gryaris4 from "../img/autosnuevos/gr/gryaris/gryaris4.jpeg";
import gryaris5 from "../img/autosnuevos/gr/gryaris/gryaris5.jpeg";
import gryaris6 from "../img/autosnuevos/gr/gryaris/gryaris6.jpeg";
import gryaris7 from "../img/autosnuevos/gr/gryaris/gryaris7.jpeg";
import gryaris8 from "../img/autosnuevos/gr/gryaris/gryaris8.jpeg";
import gryaris9 from "../img/autosnuevos/gr/gryaris/gryaris9.jpeg";

import gryarisint1 from "../img/autosnuevos/gr/gryaris/yarisint1.jpeg";
import gryarisint2 from "../img/autosnuevos/gr/gryaris/yarisint2.jpeg";
import gryarisint3 from "../img/autosnuevos/gr/gryaris/yarisint3.jpeg";
import gryarisint4 from "../img/autosnuevos/gr/gryaris/yarisint4.jpeg";
import gryarisint5 from "../img/autosnuevos/gr/gryaris/yarisint5.jpeg";
import gryarisint6 from "../img/autosnuevos/gr/gryaris/yarisint6.jpeg";
import gryarisint7 from "../img/autosnuevos/gr/gryaris/yarisint7.jpeg";
import gryarisint8 from "../img/autosnuevos/gr/gryaris/yarisint8.jpeg";

import portada from "../img/autosnuevos/gr/gryaris/gr-yaris-portada.jpeg";

import "../css/gryaris.css";

const MainYaris = () => {
  const exteriorImages = [gryaris1, gryaris2, gryaris3, gryaris4, gryaris5, gryaris6, gryaris7, gryaris8, gryaris9];
  const interiorImages = [gryarisint1, gryarisint2, gryarisint3, gryarisint4, gryarisint5, gryarisint6, gryarisint7, gryarisint8];

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
    <div className="yaris-container">
      <h2 className="yaris-section-title">Toyota GR Yaris</h2>

      {/* PORTADA */}
      <section className="yaris-portada">
        <img src={portada} alt="Toyota GR Yaris Portada" className="yaris-portada-img" />
      </section>


      {/* CARACTERISTICAS */}
      <section className="yaris-features">
        <div className="yaris-feature">
          <FaCogs className="yaris-feature-icon" />
          <h3>GR-FOUR</h3>
          <p>Tracción total con 3 modos: Normal / Gravel / Track.</p>
        </div>
        <div className="yaris-feature">
          <FaTachometerAlt className="yaris-feature-icon" />
          <h3>PERFORMANCE</h3>
          <p>Motor 1.6L Turbo — 300 HP y máxima eficiencia Gazoo Racing.</p>
        </div>
        <div className="yaris-feature">
          <FaChair className="yaris-feature-icon" />
          <h3>DISEÑO INTERIOR</h3>
          <p>Cabina enfocada al conductor con materiales deportivos premium.</p>
        </div>
        <div className="yaris-feature">
          <FaSnowflake className="yaris-feature-icon" />
          <h3>DISEÑO FUNCIONAL</h3>
          <p>Refrigeración optimizada con difusores de aire y control térmico.</p>
        </div>
      </section>

      {/* GALERIA */}
      <section className="yaris-showcase">
        <div className="yaris-card" onClick={() => openModal(interiorImages, 0)}>
          <img src={gryarisint1} alt="Interior GR Yaris" className="yaris-card-img" />
          <div className="yaris-card-overlay">
            <p>Conocé el</p>
            <h3>Interior</h3>
          </div>
        </div>

        <div className="yaris-card" onClick={() => openModal(exteriorImages, 0)}>
          <img src={gryaris1} alt="Exterior GR Yaris" className="yaris-card-img" />
          <div className="yaris-card-overlay">
            <p>Conocé el</p>
            <h3>Exterior</h3>
          </div>
        </div>
      </section>

      {/* VENTANA MODAL */}
      {modalOpen && (
        <div className="yaris-modal">
          <button className="yaris-close-btn" onClick={closeModal}>×</button>
          <button className="yaris-nav-btn prev" onClick={prevImage}>‹</button>
          <img src={currentImages[currentIndex]} alt="GR Yaris" className="yaris-modal-img" />
          <button className="yaris-nav-btn next" onClick={nextImage}>›</button>
        </div>
      )}

      {/* DESCARGAS */}
      <section className="yaris-downloads">
        <div className="yaris-download-box">
          <FaFileAlt className="yaris-download-icon" />
          <h3>Ficha Técnica</h3>
          <a href="https://media.toyota.com.ar/ebbfa9de-bbec-46d1-adfa-843773975234.pdf" target="_blank" rel="noopener noreferrer" className="yaris-download-link">
            Descargar <FaLink className="yaris-link-icon" />
          </a>
        </div>

        <div className="yaris-download-box">
          <FaChartBar className="yaris-download-icon" />
          <h3>Información de Consumo</h3>
          <a href="https://media.toyota.com.ar/9c389c63-8499-4b27-883e-3d515837d573.pdf" target="_blank" rel="noopener noreferrer" className="yaris-download-link">
            Descargar <FaLink className="yaris-link-icon" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default MainYaris;
