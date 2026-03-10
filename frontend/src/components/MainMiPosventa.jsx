import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCar, FaPlus, FaHistory, FaCalendarPlus } from "react-icons/fa";
import "../css/miPosventa.css";

const MainMiPosventa = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/veh-posventa/usuario/${user.idUsuario}`
        );
        setVehiculos(res.data);
      } catch (err) {
        console.error("Error al obtener vehículos:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.idUsuario) fetchVehiculos();
  }, [user]);

  const handleVerHistorial = (vehiculo) => {
    navigate(`/mi-posventa/vehiculo/${vehiculo.idVehiculoPostVenta}`);
  };

  const handleAgendarTurno = (vehiculo) => {
    navigate(`/mi-posventa/agendar/${vehiculo.idVehiculoPostVenta}`);
  };

  const handleRegistrarVehiculo = () => {
    navigate("/mi-posventa/registrar");
  };



  return (
    <section className="mi-posventa-section">
      <div className="mi-posventa-container">
        <div className="mi-posventa-header">
          <h2 className="mi-posventa-title">Mi Posventa</h2>
          <button className="mi-posventa-btn-agregar" onClick={handleRegistrarVehiculo}>
            <FaPlus />
            Registrar Vehículo
          </button>
        </div>

        {loading ? (
          <div className="mi-posventa-loading">Cargando vehículos...</div>
        ) : vehiculos.length === 0 ? (
          <div className="mi-posventa-empty">
            <FaCar className="mi-posventa-empty-icon" />
            <h4>No tenés vehículos registrados</h4>
            <p>Registrá tu primer vehículo para comenzar a usar el servicio de posventa.</p>
            <button className="mi-posventa-btn-first" onClick={handleRegistrarVehiculo}>
              <FaPlus />
              Registrar mi primer vehículo
            </button>
          </div>
        ) : (
          <div className="mi-posventa-grid">
            {vehiculos.map((vehiculo) => (
              <div key={vehiculo.idVehiculoPostVenta} className="mi-posventa-card">
                <div className="mi-posventa-card-header">
                  <FaCar className="mi-posventa-card-icon" />
                  <div className="mi-posventa-card-title">
                    <h3>{vehiculo.marca} {vehiculo.modelo}</h3>
                    <span className="mi-posventa-patente">{vehiculo.patente}</span>
                  </div>
                </div>
                
                <div className="mi-posventa-card-info">
                  <div className="mi-posventa-info-item">
                    <span className="mi-posventa-info-label">Año</span>
                    <span className="mi-posventa-info-value">{vehiculo.anio}</span>
                  </div>
                  <div className="mi-posventa-info-item">
                    <span className="mi-posventa-info-label">Teléfono</span>
                    <span className="mi-posventa-info-value">{vehiculo.telefono}</span>
                  </div>
                </div>

                <div className="mi-posventa-card-actions">
                  <button 
                    className="mi-posventa-btn mi-posventa-btn-historial"
                    onClick={() => handleVerHistorial(vehiculo)}
                  >
                    <FaHistory />
                    Ver Historial
                  </button>
                  <button 
                    className="mi-posventa-btn mi-posventa-btn-agendar"
                    onClick={() => handleAgendarTurno(vehiculo)}
                  >
                    <FaCalendarPlus />
                    Agendar Turno
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MainMiPosventa;
