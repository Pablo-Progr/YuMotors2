import React from 'react'
import toyotaLogo from '../img/toyota-logo.png'
import '../css/maintoyota.css'

const MainToyota = () => {
  return (
    <div className="toyota-container">
      {/* ===== LOGO ===== */}
      <div className="toyota-logo-section">
        <img src={toyotaLogo} alt="Toyota Logo" />
      </div>

      {/* ===== INFORMACIÓN ===== */}
      <div className="toyota-info-section">
        <h2>Sobre Toyota</h2>
        <p>
          Toyota es una marca líder mundial en la industria automotriz,
          reconocida por su innovación, calidad y confiabilidad. Fundada en 1937,
          ha revolucionado la movilidad con vehículos que combinan eficiencia,
          tecnología avanzada y seguridad.
        </p>
      </div>

      {/* ===== HISTORIA ===== */}
      <div className="toyota-history-section">
        <h2>Nuestra Historia</h2>
        <p>
          Desde su fundación en Japón, Toyota ha crecido hasta convertirse en un
          referente global. Con modelos icónicos como Corolla, Camry y el GR Yaris,
          la marca ha marcado tendencia en diseño, rendimiento y sostenibilidad.
        </p>
      </div>

      {/* ===== DATOS CLAVE ===== */}
      <div className="toyota-facts-section">
        <h2>Datos Clave</h2>
        <ul>
          <li>Fundación: 1937</li>
          <li>Presencia en más de 170 países</li>
          <li>Innovación en vehículos híbridos y eléctricos</li>
          <li>Compromiso con la sostenibilidad y movilidad segura</li>
        </ul>
      </div>
    </div>
  )
}

export default MainToyota
