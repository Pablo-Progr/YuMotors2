import amr23 from "../img/amr23.jpg";
import '../css/mainmodelos.css'

const MainModelos = () => {
  return (
    <>
    <h2>Autos</h2>
    <div className="card-container">

      <div className="card" style={{ width: "18rem" }}>
        <img src={amr23} className="card-img-top" alt="AMR23 (2023)" />
        <div className="card-body">
          <h5 className="card-title">AMR23 (2023)</h5>
          <p className="card-text">ARS$50.000</p>
          <a href="/Auto" className="btn btn-primary">
            Más información
          </a>
        </div>
      </div>

      <div className="card" style={{ width: "18rem" }}>
        <img src={amr23} className="card-img-top" alt="AMR23 (2023)" />
        <div className="card-body">
          <h5 className="card-title">AMR23 (2023)</h5>
          <p className="card-text">ARS$50.000</p>
          <a href="/Auto" className="btn btn-primary">
            Más información
          </a>
        </div>
      </div>

      <div className="card" style={{ width: "18rem" }}>
        <img src={amr23} className="card-img-top" alt="AMR23 (2023)" />
        <div className="card-body">
          <h5 className="card-title">AMR23 (2023)</h5>
          <p className="card-text">ARS$50.000</p>
          <a href="/Auto" className="btn btn-primary">
            Más información
          </a>
        </div>
      </div>

    </div>

    <h2>Camionetas</h2>

    <div className="card-container">

      <div className="card" style={{ width: "18rem" }}>
        <img src={amr23} className="card-img-top" alt="AMR23 (2023)" />
        <div className="card-body">
          <h5 className="card-title">AMR23 (2023)</h5>
          <p className="card-text">ARS$50.000</p>
          <a href="/Auto" className="btn btn-primary">
            Más información
          </a>
        </div>
      </div>

      <div className="card" style={{ width: "18rem" }}>
        <img src={amr23} className="card-img-top" alt="AMR23 (2023)" />
        <div className="card-body">
          <h5 className="card-title">AMR23 (2023)</h5>
          <p className="card-text">ARS$50.000</p>
          <a href="/Auto" className="btn btn-primary">
            Más información
          </a>
        </div>
      </div>

    <div className="card" style={{ width: "18rem" }}>
        <img src={amr23} className="card-img-top" alt="AMR23 (2023)" />
        <div className="card-body">
          <h5 className="card-title">AMR23 (2023)</h5>
          <p className="card-text">ARS$50.000</p>
          <a href="/Auto" className="btn btn-primary">
            Más información
          </a>
        </div>
      </div>

    </div>
    </>
    
  );
};

export default MainModelos;
