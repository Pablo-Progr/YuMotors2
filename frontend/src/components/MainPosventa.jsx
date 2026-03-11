import { useState, useLayoutEffect } from "react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import foto from "../img/posventa-yu.webp";
import "../css/concesionario.css";
import {
  FaTools,
  FaCalendarCheck,
  FaClipboardList,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
} from "react-icons/fa";

const MainPosventa = () => {
  
    useLayoutEffect(() => {
    // Forzamos el scroll de la ventana
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Por si el scroll lo está manejando el body o el HTML directamente en tu CSS
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="concesionario-page">
      {/* ===== HERO BANNER ===== */}
      <div
        className="concesionario-hero"
        style={{ backgroundImage: `url(${foto})` }}
      >
        <div className="hero-overlay">
          <h1 className="hero-title animate-on-scroll">Servicio de Posventa</h1>
          <p className="hero-subtitle animate-on-scroll">
            Cuidamos tu Toyota mucho más allá de la compra
          </p>
        </div>
      </div>

      {/* ===== CONTENEDOR PRINCIPAL ===== */}
      <div className="concesionario-container">
        {/* ===== QUÉ ES POSVENTA ===== */}
        <div className="concesionario-info-section animate-on-scroll">
          <h2>¿Qué es el Servicio de Posventa?</h2>
          <div className="section-divider"></div>
          <p>
            El servicio de posventa de Yu Motors es el acompañamiento integral
            que brindamos a cada cliente después de su compra. Desde el primer
            service hasta el mantenimiento preventivo y correctivo, estamos
            presentes en cada etapa de la vida útil de tu vehículo, garantizando
            su rendimiento, seguridad y valor a lo largo del tiempo.
          </p>
        </div>

        {/* ===== CÓMO FUNCIONA ===== */}
        <div className="concesionario-history-section animate-on-scroll">
          <h2>¿Cómo Funciona?</h2>
          <div className="section-divider"></div>
          <p>
            Registrá tu vehículo en nuestra plataforma, agendá turnos de
            mantenimiento y seguí el historial completo de servicios realizados,
            todo desde un mismo lugar. Nuestro equipo técnico certificado
            utiliza repuestos originales Toyota para asegurar el más alto
            estándar de calidad en cada intervención.
          </p>
        </div>

        {/* ===== SERVICIOS DE POSVENTA ===== */}
        <div className="concesionario-facts-section animate-on-scroll">
          <h2>Nuestros Servicios de Posventa</h2>
          <div className="section-divider"></div>
          <div className="services-grid">
            <div className="service-card">
              <span className="service-icon">
                <FaTools />
              </span>
              <h3>Mantenimiento Preventivo</h3>
              <p>
                Services periódicos para mantener tu vehículo en óptimas
                condiciones.
              </p>
            </div>
            <div className="service-card">
              <span className="service-icon">
                <FaCalendarCheck />
              </span>
              <h3>Turnos Online</h3>
              <p>
                Agendá tu turno de forma rápida y sencilla desde nuestra
                plataforma.
              </p>
            </div>
            <div className="service-card">
              <span className="service-icon">
                <FaClipboardList />
              </span>
              <h3>Historial de Servicios</h3>
              <p>
                Accedé al registro completo de todas las intervenciones de tu
                vehículo.
              </p>
            </div>
            <div className="service-card">
              <span className="service-icon">
                <FaShieldAlt />
              </span>
              <h3>Garantía Oficial</h3>
              <p>
                Todos nuestros trabajos están respaldados por la garantía Yu
                Motors.
              </p>
            </div>
          </div>
        </div>

        {/* ===== CONTACTO ===== */}
        <div className="concesionario-contact-section animate-on-scroll">
          <h2>Contacto de Posventa</h2>
          <div className="section-divider"></div>
          <div className="contact-details-card">
            <div className="contact-item">
              <strong>
                <FaMapMarkerAlt /> Dirección:
              </strong>
              <span>Av. Siempre Viva 123, San Miguel de Tucumán</span>
            </div>
            <div className="contact-item">
              <strong>
                <FaPhone /> Teléfono:
              </strong>
              <span>+54 9 381 217-3556</span>
            </div>
            <div className="contact-item">
              <strong>
                <FaClock /> Horario de Atención:
              </strong>
              <span>Lun a Vie 9:00 - 18:00hs | Sáb 9:00 - 13:00hs</span>
            </div>
          </div>
        </div>

        {/* ===== BOTÓN MI POSVENTA ===== */}
        <div
          className="concesionario-info-section animate-on-scroll"
          style={{ textAlign: "center" }}
        >
          <h2>¿Ya tenés tu vehículo registrado?</h2>
          <div className="section-divider"></div>
          <p>
            Accedé a tu área personal de posventa para gestionar tus vehículos,
            ver el historial de servicios y agendar nuevos turnos.
          </p>
          <button
            className="btn btn-danger mt-3 px-5 py-2 fw-bold fs-5"
            onClick={() => navigate("/mi-posventa")}
          >
            Ir a Mi Posventa
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPosventa;
