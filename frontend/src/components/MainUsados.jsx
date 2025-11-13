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
      <div className="card-usados-container">
        {vehiculos.map((vehiculo) => (
          <div className="card-usados" style={{ width: "18rem" }} key={vehiculo.idVehiculoUsado}>
            <img src={vehiculo.imagen} className="card-usados-img-top" alt={`${vehiculo.marca} ${vehiculo.modelo}`} />
            <div className="card-usados-body">
              <h5 className="card-usados-title">{`${vehiculo.marca} ${vehiculo.modelo}`}</h5>
              <p className="card-usados-text">{`ARS$${vehiculo.precio.toFixed(2)}`}</p>
            <a href="/Auto" className="btn-usados">
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
