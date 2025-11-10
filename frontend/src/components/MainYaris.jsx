import React from "react";
import {
  FaCogs,
  FaTachometerAlt,
  FaChair,
  FaSnowflake,
  FaFileAlt,
  FaChartBar,
  FaLink,
} from "react-icons/fa";

import gryaris1 from "../img/gryaris1.jpeg";
import gryaris2 from "../img/gryaris2.jpeg";
import gryaris3 from "../img/gryaris3.jpeg";
import gryaris4 from "../img/gryaris4.jpeg";
import gryaris5 from "../img/gryaris5.jpeg";
import gryaris6 from "../img/gryaris6.jpeg";
import gryaris7 from "../img/gryaris7.jpeg";
import gryaris8 from "../img/gryaris8.jpeg";
import gryaris9 from "../img/gryaris9.jpeg";

import gryarisint1 from "../img/yarisint1.jpeg";
import gryarisint2 from "../img/yarisint2.jpeg";
import gryarisint3 from "../img/yarisint3.jpeg";
import gryarisint4 from "../img/yarisint4.jpeg";
import gryarisint5 from "../img/yarisint5.jpeg";
import gryarisint6 from "../img/yarisint6.jpeg";
import gryarisint7 from "../img/yarisint7.jpeg";
import gryarisint8 from "../img/yarisint8.jpeg";

import "../css/gryaris.css";

const MainYaris = () => {
  const exteriorImages = [
    gryaris1, gryaris2, gryaris3, gryaris4, gryaris5,
    gryaris6, gryaris7, gryaris8, gryaris9,
  ];

  const interiorImages = [
    gryarisint1, gryarisint2, gryarisint3, gryarisint4,
    gryarisint5, gryarisint6, gryarisint7, gryarisint8,
  ];

  return (
    <div className="yaris-container">
      <h2 className="section-title">Toyota GR Yaris</h2>

      {/* ===== CARRUSEL EXTERIOR ===== */}
      <section className="carousel-section-yaris">
        <div id="carouselExterior" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner-yaris">
            {exteriorImages.map((img, index) => (
              <div
                key={index}
                className={`carousel-item-yaris ${index === 0 ? "active" : ""}`}
              >
                <img src={img} className="d-block w-100 yaris-img" alt={`Exterior ${index + 1}`} />
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExterior" data-bs-slide="prev">
            <span className="carousel-control-prev-icon-yaris" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExterior" data-bs-slide="next">
            <span className="carousel-control-next-icon-yaris" aria-hidden="true"></span>
          </button>
        </div>
      </section>

      {/* ===== CARRUSEL INTERIOR ===== */}
      <section className="carousel-section-yaris interior">
        <div id="carouselInterior" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner-yaris">
            {interiorImages.map((img, index) => (
              <div
                key={index}
                className={`carousel-item-yaris ${index === 0 ? "active" : ""}`}
              >
                <img src={img} className="d-block w-100 yaris-img" alt={`Interior ${index + 1}`} />
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselInterior" data-bs-slide="prev">
            <span className="carousel-control-prev-icon-yaris" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselInterior" data-bs-slide="next">
            <span className="carousel-control-next-icon-yaris" aria-hidden="true"></span>
          </button>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features-section">
        <div className="feature-box">
          <FaCogs className="feature-icon" />
          <h3>GR-FOUR</h3>
          <p>Tracción total con 3 modos: Normal / Gravel / Track.</p>
        </div>

        <div className="feature-box">
          <FaTachometerAlt className="feature-icon" />
          <h3>PERFORMANCE</h3>
          <p>Motor 1.6L Turbo — 300 HP y máxima eficiencia Gazoo Racing.</p>
        </div>

        <div className="feature-box">
          <FaChair className="feature-icon" />
          <h3>DISEÑO INTERIOR</h3>
          <p>Cabina enfocada al conductor con materiales deportivos premium.</p>
        </div>

        <div className="feature-box">
          <FaSnowflake className="feature-icon" />
          <h3>DISEÑO FUNCIONAL</h3>
          <p>Refrigeración optimizada con difusores de aire y control térmico.</p>
        </div>
      </section>

      {/* ===== DESCARGAS ===== */}
      <section className="downloads-section">
        <div className="download-box">
          <FaFileAlt className="download-icon" />
          <h3>Ficha Técnica</h3>
          <a
            href="https://media.toyota.com.ar/ebbfa9de-bbec-46d1-adfa-843773975234.pdf"
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
            href="https://media.toyota.com.ar/9c389c63-8499-4b27-883e-3d515837d573.pdf"
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

export default MainYaris;
