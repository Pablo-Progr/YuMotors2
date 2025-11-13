import { useEffect, useState } from "react";
import axios from "axios";
import "../css/repuestos.css";

const MainRepuestos = () => {

      const [repuestos, setRepuestos] = useState([]);

      useEffect(() => {
        const fetchRepuestos = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3000/api/repuestos/repuestos"
            );
            setRepuestos(response.data);
          } catch (error) {
            console.error("Error fetching repuestos:", error);
          }
        };

        fetchRepuestos();
      }, []);

  return (
    <div className="repuestos-container">
      <h2 className="titulo-repuestos">Repuestos y Accesorios Toyota</h2>

      <div className="card-repuestos-container">
        {repuestos.map((repuesto) => (
        <div className="card-repuestos" key={repuesto.idRepuesto}>
          <img
            src={repuesto.imagen}
            alt="Amortiguador Trasero Yaris XLS"
            className="foto-card-repuestos"
          />
          <div className="body-card-repuestos">
            <h5 className="titulo-card-repuestos">{repuesto.nombre}</h5>
            <p className="texto-card-repuestos">{repuesto.categoria}</p>
            <p className="precio-card-repuestos">ARS${repuesto.precio}</p>
            <a href="#" className="btn-repuestos">
              Más información
            </a>
          </div>
        </div>

        ))}
      </div>
    </div>
  );
};

export default MainRepuestos;
