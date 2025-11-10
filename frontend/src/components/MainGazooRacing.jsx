import yaris from '../img/gryaris2023.jpg'
import supra from '../img/grsupra2019.jpg'
import gr86 from '../img/gr862022.jpg'

const MainGazooRacing = () => {
  return (
    <div>
      <div className="card-container">
        
              <div className="card" style={{ width: "18rem" }}>
                <img src={yaris} className="card-img-top" alt="GR Yaris (2023)" />
                <div className="card-body">
                  <h5 className="card-title">GR Yaris (2023)</h5>
                  <p className="card-text">ARS$50.000</p>
                  <a href="/marcas/gr/yaris" className="btn btn-primary">
                    Más información
                  </a>
                </div>
              </div>
        
              <div className="card" style={{ width: "18rem" }}>
                <img src={supra} className="card-img-top" alt="GR Supra (2019)" />
                <div className="card-body">
                  <h5 className="card-title">GR Supra (2019)</h5>
                  <p className="card-text">ARS$50.000</p>
                  <a href="/Auto" className="btn btn-primary">
                    Más información
                  </a>
                </div>
              </div>
        
              <div className="card" style={{ width: "18rem" }}>
                <img src={gr86} className="card-img-top" alt="GR 86 (2022)" />
                <div className="card-body">
                  <h5 className="card-title">GR 86 (2022)</h5>
                  <p className="card-text">ARS$50.000</p>
                  <a href="/Auto" className="btn btn-primary">
                    Más información
                  </a>
                </div>
              </div>
        
            
        
             
        </div>
      </div>
   
  )
}


export default MainGazooRacing