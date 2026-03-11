import React, { useEffect } from 'react';
import foto from '../img/toyota-prana.jpg';
import '../css/concesionario.css';
import { FaCar, FaWrench, FaCog, FaCreditCard, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';

const MainConcesionario = () => {
  // Efecto para animar los elementos cuando hacen scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 } // Se activa cuando el 10% del elemento es visible
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="concesionario-page">
      {/* ===== HERO BANNER (IMAGEN COMPLETA) ===== */}
      <div 
        className="concesionario-hero"
        style={{ backgroundImage: `url(${foto})` }}
      >
        <div className="hero-overlay">
          <h1 className="hero-title animate-on-scroll">Bienvenido a Yu Motors</h1>
          <p className="hero-subtitle animate-on-scroll">Tu Concesionario de Confianza en Tucumán</p>
        </div>
      </div>

      {/* ===== CONTENEDOR PRINCIPAL ===== */}
      <div className="concesionario-container">
        
        {/* ===== INFORMACIÓN PRINCIPAL ===== */}
        <div className="concesionario-info-section animate-on-scroll">
          <h2>Excelencia y Trayectoria</h2>
          <div className="section-divider"></div>
          <p>
            En Yu Motors nos especializamos en ofrecer las mejores opciones de vehículos Toyota 
            en la provincia. Con años de experiencia en el mercado automotriz, brindamos un servicio 
            personalizado y sumamente profesional para que encuentres el vehículo ideal para ti y tu familia.
          </p>
        </div>

        {/* ===== NUESTRA PROPUESTA ===== */}
        <div className="concesionario-history-section animate-on-scroll">
          <h2>Nuestra Propuesta</h2>
          <div className="section-divider"></div>
          <p>
            Somos distribuidores oficiales de Toyota, ofreciendo una amplia gama de vehículos 
            nuevos y usados, junto con servicios de posventa, repuestos originales y accesorios. 
            Nuestro compromiso inquebrantable es brindarte la mejor experiencia de compra y mantenimiento.
          </p>
        </div>

        {/* ===== SERVICIOS ===== */}
        <div className="concesionario-facts-section animate-on-scroll">
          <h2>Nuestros Servicios</h2>
          <div className="section-divider"></div>
          <div className="services-grid">
            <div className="service-card">
              <span className="service-icon"><FaCar /></span>
              <h3>Vehículos Nuevos y Usados</h3>
              <p>El mejor catálogo con garantía de calidad.</p>
            </div>
            <div className="service-card">
              <span className="service-icon"><FaWrench /></span>
              <h3>Servicio Técnico</h3>
              <p>Mantenimiento especializado por expertos.</p>
            </div>
            <div className="service-card">
              <span className="service-icon"><FaCog /></span>
              <h3>Repuestos Originales</h3>
              <p>Piezas y accesorios genuinos para tu Toyota.</p>
            </div>
            <div className="service-card">
              <span className="service-icon"><FaCreditCard /></span>
              <h3>Financiación</h3>
              <p>Planes a tu medida y asesoramiento financiero.</p>
            </div>
          </div>
        </div>

        {/* ===== UBICACIÓN Y CONTACTO ===== */}
        <div className="concesionario-contact-section animate-on-scroll">
          <h2>Visitanos</h2>
          <div className="section-divider"></div>
          <div className="contact-details-card">
            <div className="contact-item">
              <strong><FaMapMarkerAlt /> Dirección:</strong> 
              <span>Av. Siempre Viva 123, San Miguel de Tucumán</span>
            </div>
            <div className="contact-item">
              <strong><FaPhone /> Teléfono:</strong> 
              <span>+54 9 381 217-3556</span>
            </div>
            <div className="contact-item">
              <strong><FaClock /> Horario:</strong> 
              <span>Lun a Vie 9:00 - 18:00hs | Sáb 9:00 - 13:00hs</span>
            </div>
          </div>
        </div>

        {/* ===== MAPA ===== */}
        <div className="concesionario-map-section animate-on-scroll">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113941.07470650633!2d-65.28911075304627!3d-26.832960682136018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94223792d6c56903%3A0xf88d5b0d38586c06!2sSan%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1709590000000!5m2!1ses-419!2sar"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Concesionario"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default MainConcesionario;