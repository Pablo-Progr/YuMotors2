import foto from '../img/yumotors-concesionario.png'
import '../css/concesionario.css'

const MainConcesionario = () => {
  return (
    <div>
        <div className='info-container'>
            
            
            <div className='concesionario-info'>
                <img src={foto} alt="Concesionario Yu Motors" />
            </div>
            <div className='concesionario-info'>
                <h2>Concesionario Yu Motors</h2>
                <p>Dirección: Av. Siempre Viva 123, Ciudad Autónoma de Buenos Aires</p>
                <p>Teléfono: +54 11 1234-5678</p>
            </div>

        </div>
    </div>
  )
}

export default MainConcesionario