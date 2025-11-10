import { Link } from "react-router-dom";
import lexus from "../img/lexus-logo.png";
import gr from "../img/grlogo.png";
import toyota from "../img/toyota-logo.png";
import "../css/marcas.css";

const MainMarcas = () => {
  return (
    <div className="MainMarcas">
      <div className="card-container-marcas">

        <div className="card-marcas">
          <Link to="/marcas/toyota" className="btn">
            <img src={toyota} alt="toyota" />
          </Link>
        </div>

        <div className="card-marcas">
          <Link to="/marcas/gr" className="btn">
            <img src={gr} alt="Gazoo Racing" />
          </Link>
        </div>

        <div className="card-marcas">
          <Link to="/marcas/lexus" className="btn">
            <img src={lexus} alt="Lexus" />
          </Link>
        </div>

      </div>

      <div className="btn-volver-container">
        <Link to="/" className="btn">
          <button className="btn-volver">Volver</button>
        </Link>
      </div>

    </div>
  );
};

export default MainMarcas;
