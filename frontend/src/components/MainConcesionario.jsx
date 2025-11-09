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
                <p>Av. Siempre Viva 123, San Miguel de Tucumán</p>
                <p>+54 9 381 217-3556</p>
            </div>

        </div>
    </div>
  )
}

export default MainConcesionario