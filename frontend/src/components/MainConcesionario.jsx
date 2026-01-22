import foto from '../img/yumotors-concesionario.png'
import '../css/concesionario.css'

const MainConcesionario = () => {
  return (
    <div className="concesionario-container">
      {/* ===== LOGO ===== */}
      <div className="concesionario-logo-section">
        <img src={foto} alt="Concesionario Yu Motors" />
      </div>

      {/* ===== INFORMACIÓN PRINCIPAL ===== */}
      <div className="concesionario-info-section">
        <h2>Yu Motors - Tu Concesionario de Confianza</h2>
        <p>
          En Yu Motors nos especializamos en ofrecer las mejores opciones de vehículos Toyota 
          en Tucumán. Con años de experiencia en el mercado automotriz, brindamos un servicio 
          personalizado y profesional para que encuentres el vehículo ideal para ti y tu familia.
        </p>
      </div>

      {/* ===== NUESTRA PROPUESTA ===== */}
      <div className="concesionario-history-section">
        <h2>Nuestra Propuesta</h2>
        <p>
          Somos distribuidores oficiales de Toyota, ofreciendo una amplia gama de vehículos 
          nuevos y usados, junto con servicios de posventa, repuestos originales y accesorios. 
          Nuestro compromiso es brindarte la mejor experiencia de compra y mantenimiento.
        </p>
      </div>

      {/* ===== SERVICIOS ===== */}
      <div className="concesionario-facts-section">
        <h2>Nuestros Servicios</h2>
        <ul>
          <li>Venta de vehículos nuevos y usados</li>
          <li>Servicio técnico especializado</li>
          <li>Repuestos y accesorios</li>
          <li>Planes de financiación personalizados</li>
          <li>Asesoramiento profesional</li>
        </ul>
      </div>

      {/* ===== UBICACIÓN Y CONTACTO ===== */}
      <div className="concesionario-contact-section">
        <h2>Visitanos</h2>
        <div className="contact-details">
          <p><strong>Dirección:</strong> Av. Siempre Viva 123, San Miguel de Tucumán</p>
          <p><strong>Teléfono:</strong> +54 9 381 217-3556</p>
          <p><strong>Horario:</strong> Lunes a Viernes 9:00 - 18:00hs | Sábados 9:00 - 13:00hs</p>
        </div>
      </div>

      {/* ===== MAPA ===== */}
      <div className="concesionario-map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.431876683184!2d-65.2037623253446!3d-26.82621268959364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c19f4c4c007%3A0x51e39959759b64d1!2sProvincia%20de%2C%20San%20Juan%20354%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Provincia%20de%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1763103432763!5m2!1ses-419!2sar"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}

export default MainConcesionario
