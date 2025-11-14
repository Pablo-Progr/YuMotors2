import foto from '../img/yumotors-concesionario.png'
import '../css/concesionario.css'

const MainConcesionario = () => {
  return (
    <div className="concesionario-container">
        <div className='info-container'>
            <div className='concesionario-info'>
                <img src={foto} alt="Concesionario Yu Motors" />
            </div>
            <div className='concesionario-info'>
                <h2>Concesionario Yu Motors</h2>
                <p>Av. Siempre Viva 123, San Miguel de Tucumán</p>
                <p>+54 9 381 217-3556</p>
            </div>
            <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.431876683184!2d-65.2037623253446!3d-26.82621268959364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c19f4c4c007%3A0x51e39959759b64d1!2sProvincia%20de%2C%20San%20Juan%20354%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Provincia%20de%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1763103432763!5m2!1ses-419!2sar"
                        width="600"
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
