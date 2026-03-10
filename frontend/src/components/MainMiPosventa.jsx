import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCar, FaPlus, FaHistory, FaCalendarPlus, FaEdit, FaTimes, FaClock, FaTools } from "react-icons/fa";
import "../css/miPosventa.css";

const MainMiPosventa = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [turnosActivos, setTurnosActivos] = useState({});

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/veh-posventa/usuario/${user.idUsuario}`
        );
        setVehiculos(res.data);

        // Fetch turno activo for each vehicle concurrently
        const turnoPromises = res.data.map((v) =>
          axios.get(`http://localhost:3000/api/reg-posventa/turno-activo/${v.idVehiculoPostVenta}`)
            .then((r) => ({ id: v.idVehiculoPostVenta, turno: r.data }))
            .catch(() => ({ id: v.idVehiculoPostVenta, turno: null }))
        );
        const turnoResults = await Promise.all(turnoPromises);
        const turnosMap = {};
        turnoResults.forEach(({ id, turno }) => {
          if (turno) turnosMap[id] = turno;
        });
        setTurnosActivos(turnosMap);
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

  const handleCancelarTurno = async (idRegistro, idVehiculo) => {
    const result = await Swal.fire({
      title: "¿Cancelar turno?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e60012",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No",
    });
    if (!result.isConfirmed) return;

    try {
      await axios.put(`http://localhost:3000/api/reg-posventa/cancelar/${idRegistro}`);
      Swal.fire("Cancelado", "El turno fue cancelado exitosamente.", "success");
      setTurnosActivos((prev) => {
        const copy = { ...prev };
        delete copy[idVehiculo];
        return copy;
      });
    } catch (err) {
      console.error("Error al cancelar turno:", err);
      Swal.fire("Error", "No se pudo cancelar el turno.", "error");
    }
  };

  const formatDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (!isNaN(d)) {
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return value;
  };

  const formatTime = (value) => {
    if (!value) return "";
    const m = String(value).match(/(\d{1,2}):(\d{2})/);
    if (m) return `${String(m[1]).padStart(2, "0")}:${m[2]}`;
    return value;
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
            {vehiculos.map((vehiculo) => {
              const turno = turnosActivos[vehiculo.idVehiculoPostVenta];
              return (
              <div key={vehiculo.idVehiculoPostVenta} className={`mi-posventa-card ${turno ? "mi-posventa-card-turno-activo" : ""}`}>
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

                {turno && (
                  <div className="mi-posventa-turno-activo-info">
                    <div className="mi-posventa-turno-activo-header">
                      <span className={`turno-badge ${turno.estado === 0 ? "turno-badge-pendiente" : "turno-badge-proceso"}`}>
                        {turno.estado === 0 ? "Pendiente" : "En Proceso"}
                      </span>
                    </div>
                    <div className="mi-posventa-turno-datos">
                      <span><FaClock /> {formatDate(turno.fecha)} - {formatTime(turno.hora)}</span>
                      <span><FaTools /> {turno.tipoPostVent}</span>
                    </div>
                  </div>
                )}

                <div className="mi-posventa-card-actions">
                  <button 
                    className="mi-posventa-btn mi-posventa-btn-historial"
                    onClick={() => handleVerHistorial(vehiculo)}
                  >
                    <FaHistory />
                    Ver Historial
                  </button>
                  {turno ? (
                    turno.estado === 0 && (
                      <>
                        <button 
                          className="mi-posventa-btn mi-posventa-btn-editar"
                          onClick={() => navigate(`/mi-posventa/editar/${turno.idRegistroPostVenta}`)}
                        >
                          <FaEdit />
                          Modificar
                        </button>
                        <button 
                          className="mi-posventa-btn mi-posventa-btn-cancelar-card"
                          onClick={() => handleCancelarTurno(turno.idRegistroPostVenta, vehiculo.idVehiculoPostVenta)}
                        >
                          <FaTimes />
                          Cancelar
                        </button>
                      </>
                    )
                  ) : (
                    <button 
                      className="mi-posventa-btn mi-posventa-btn-agendar"
                      onClick={() => handleAgendarTurno(vehiculo)}
                    >
                      <FaCalendarPlus />
                      Agendar Turno
                    </button>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MainMiPosventa;
