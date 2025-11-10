import axios from "axios";
import { useEffect, useState } from "react";
import "../css/mainusados.css";

const MainUsados = () => {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/vehiculos-usados"
        );
        setVehiculos(response.data);
      } catch (error) {
        console.error("Error fetching vehiculos:", error);
      }
    };

    fetchVehiculos();
  }, []);

  return (
    <>
      <div className="card-container">
        {vehiculos.map((vehiculo) => (
          <div className="card" style={{ width: "18rem" }} key={vehiculo.idVehiculoUsado}>
            <img src={vehiculo.imagen} className="card-img-top" alt={`${vehiculo.marca} ${vehiculo.modelo}`} />
            <div className="card-body">
              <h5 className="card-title">{`${vehiculo.marca} ${vehiculo.modelo}`}</h5>
              <p className="card-text">{`ARS$${vehiculo.precio.toFixed(2)}`}</p>
            <a href="/Auto" className="btn btn-primary">
              Más información
            </a>
          </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainUsados;
