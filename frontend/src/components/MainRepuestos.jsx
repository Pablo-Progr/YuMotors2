import "../css/repuestos.css";

const MainRepuestos = () => {
  return (
    <div className="repuestos-container">
      <h2 className="titulo-repuestos">Repuestos y Accesorios Toyota</h2>

      <div className="card-repuestos-container">
        {/* Card 1 */}
        <div className="card-repuestos">
          <img
            src="https://toyota-pe.imgix.net/partes/filtro-aire.jpg"
            alt="Filtro de Aire Corolla 2.0"
            className="foto-card-repuestos"
          />
          <div className="body-card-repuestos">
            <h5 className="titulo-card-repuestos">Filtro de Aire Corolla 2.0</h5>
            <p className="texto-card-repuestos">Motor</p>
            <p className="precio-card-repuestos">ARS$18.500</p>
            <a href="#" className="btn-repuestos">
              Más información
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card-repuestos">
          <img
            src="https://toyota-pe.imgix.net/partes/pastillas-freno.jpg"
            alt="Pastillas de Freno Hilux SRV"
            className="foto-card-repuestos"
          />
          <div className="body-card-repuestos">
            <h5 className="titulo-card-repuestos">Pastillas de Freno Hilux SRV</h5>
            <p className="texto-card-repuestos">Frenos</p>
            <p className="precio-card-repuestos">ARS$32.500</p>
            <a href="#" className="btn-repuestos">
              Más información
            </a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card-repuestos">
          <img
            src="https://toyota-pe.imgix.net/partes/amortiguador.jpg"
            alt="Amortiguador Trasero Yaris XLS"
            className="foto-card-repuestos"
          />
          <div className="body-card-repuestos">
            <h5 className="titulo-card-repuestos">Amortiguador Trasero Yaris XLS</h5>
            <p className="texto-card-repuestos">Suspensión</p>
            <p className="precio-card-repuestos">ARS$45.900</p>
            <a href="#" className="btn-repuestos">
              Más información
            </a>
          </div>
        </div>

        {/* Card 4 */}
        <div className="card-repuestos">
          <img
            src="https://toyota-pe.imgix.net/partes/filtro-aceite.jpg"
            alt="Filtro de Aceite Hilux 2.8"
            className="foto-card-repuestos"
          />
          <div className="body-card-repuestos">
            <h5 className="titulo-card-repuestos">Filtro de Aceite Hilux 2.8</h5>
            <p className="texto-card-repuestos">Mantenimiento</p>
            <p className="precio-card-repuestos">ARS$12.800</p>
            <a href="#" className="btn-repuestos">
              Más información
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainRepuestos;
