import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { 
  FaCar, 
  FaArrowLeft, 
  FaCalendar, 
  FaClock, 
  FaTachometerAlt, 
  FaTools, 
  FaFileAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaEdit
} from "react-icons/fa";
import "../css/miPosventa.css";

// Horarios disponibles de 08:00 a 18:00
const HORARIOS_DISPONIBLES = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

const AgendarTurno = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehiculo, setVehiculo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);
  const [turnoActivo, setTurnoActivo] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    kilometraje: "",
    tipoPostVent: "",
    descripcion: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehRes, turnoRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/veh-posventa/${id}`),
          axios.get(`http://localhost:3000/api/reg-posventa/turno-activo/${id}`),
        ]);
        setVehiculo(vehRes.data);
        setTurnoActivo(turnoRes.data);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // Cargar horarios ocupados cuando cambia la fecha
  useEffect(() => {
    const cargarHorariosOcupados = async () => {
      if (!formData.fecha) {
        setHorariosOcupados([]);
        return;
      }

      setCargandoHorarios(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/reg-posventa/horarios-ocupados/${formData.fecha}`
        );
        setHorariosOcupados(response.data.horariosOcupados || []);
      } catch (error) {
        console.error("Error al cargar horarios ocupados:", error);
        setHorariosOcupados([]);
      } finally {
        setCargandoHorarios(false);
      }
    };

    cargarHorariosOcupados();
  }, [formData.fecha]);

  // Función para verificar si es fin de semana
  const esFinDeSemana = (fechaStr) => {
    const fecha = new Date(fechaStr + "T00:00:00");
    const dia = fecha.getDay();
    return dia === 0 || dia === 6;
  };

  // Obtener próxima fecha laboral
  const getProximaFechaLaboral = () => {
    const hoy = new Date();
    let fecha = new Date(hoy);
    
    if (hoy.getHours() >= 18) {
      fecha.setDate(fecha.getDate() + 1);
    }
    
    while (fecha.getDay() === 0 || fecha.getDay() === 6) {
      fecha.setDate(fecha.getDate() + 1);
    }
    
    return fecha.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "fecha" && value) {
      if (esFinDeSemana(value)) {
        Swal.fire({
          icon: "warning",
          title: "Fecha no disponible",
          text: "Los turnos solo están disponibles de Lunes a Viernes.",
          confirmButtonText: "Entendido",
        });
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "fecha" ? { hora: "" } : {}),
    }));
  };

  const handleHorarioClick = (horario) => {
    if (horariosOcupados.includes(horario)) return;
    setFormData((prev) => ({ ...prev, hora: horario }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.hora) {
      Swal.fire({
        icon: "warning",
        title: "Seleccione un horario",
        text: "Debe seleccionar un horario disponible para continuar.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const nuevoRegistro = {
        idVehiculoPostVenta: parseInt(id),
        fecha: formData.fecha,
        hora: formData.hora,
        kilometraje: formData.kilometraje,
        tipoPostVent: formData.tipoPostVent,
        descripcion: formData.descripcion,
        estado: 0,
      };

      const response = await axios.post(
        "http://localhost:3000/api/reg-posventa/crear",
        nuevoRegistro
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "¡Turno agendado!",
          html: `
            <p>Tu turno ha sido agendado exitosamente.</p>
            <p><strong>Fecha:</strong> ${formData.fecha}</p>
            <p><strong>Hora:</strong> ${formData.hora}</p>
            <p><strong>Servicio:</strong> ${formData.tipoPostVent}</p>
          `,
          confirmButtonText: "Entendido",
        }).then(() => {
          navigate(`/mi-posventa/vehiculo/${id}`);
        });
      }
    } catch (error) {
      console.error("Error al agendar turno:", error);
      
      if (error.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Turno no disponible",
          text: error.response.data.error || "El turno seleccionado ya fue tomado. Por favor, elija otro horario.",
        });
        setFormData((prev) => ({ ...prev, hora: "" }));
        // Recargar horarios
        try {
          const resp = await axios.get(
            `http://localhost:3000/api/reg-posventa/horarios-ocupados/${formData.fecha}`
          );
          setHorariosOcupados(resp.data.horariosOcupados || []);
        } catch (e) {
          console.error("Error recargando horarios:", e);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo agendar el turno. Inténtalo de nuevo.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleVolver = () => {
    navigate("/mi-posventa");
  };

  const horariosLibres = HORARIOS_DISPONIBLES.filter(
    (h) => !horariosOcupados.includes(h)
  );

  if (loading) {
    return (
      <section className="agendar-section">
        <div className="agendar-container">
          <div className="historial-empty">Cargando...</div>
        </div>
      </section>
    );
  }

  if (!vehiculo) {
    return (
      <section className="agendar-section">
        <div className="agendar-container">
          <button className="agendar-back-btn" onClick={handleVolver}>
            <FaArrowLeft />
            Volver
          </button>
          <div className="historial-empty">
            <h4>Vehículo no encontrado</h4>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="agendar-section">
      <div className="agendar-container">
        <button className="agendar-back-btn" onClick={handleVolver}>
          <FaArrowLeft />
          Volver a Mis Vehículos
        </button>

        <div className="agendar-vehiculo-badge">
          <FaCar />
          <span>{vehiculo.marca} {vehiculo.modelo} - {vehiculo.patente}</span>
        </div>

        {turnoActivo ? (
          <div className="agendar-turno-bloqueado">
            <FaExclamationTriangle className="agendar-turno-bloqueado-icon" />
            <h3>Ya tenés un turno activo para este vehículo</h3>
            <p>
              Tu turno está en estado{" "}
              <span className={`turno-badge ${turnoActivo.estado === 0 ? "turno-badge-pendiente" : "turno-badge-proceso"}`}>
                {turnoActivo.estado === 0 ? "Pendiente" : "En Proceso"}
              </span>
            </p>
            <p>No podés agendar otro turno hasta que se complete o cancele el actual.</p>
            {turnoActivo.estado === 0 && (
              <button
                className="mi-posventa-btn mi-posventa-btn-editar"
                onClick={() => navigate(`/mi-posventa/editar/${turnoActivo.idRegistroPostVenta}`)}
              >
                <FaEdit />
                Modificar turno existente
              </button>
            )}
          </div>
        ) : (
        <div className="agendar-form-container">
          <h2 className="agendar-titulo">
            <FaCalendar className="agendar-label-icon" />
            Agendar Turno
          </h2>

          <form onSubmit={handleSubmit} className="agendar-form">
            <div className="agendar-form-group">
              <label>
                <FaCalendar className="agendar-label-icon" />
                Fecha del servicio
                <span className="agendar-label-hint">Lunes a Viernes</span>
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                min={getProximaFechaLaboral()}
                required
              />
            </div>

            <div className="agendar-form-group">
              <label>
                <FaClock className="agendar-label-icon" />
                Hora del servicio
                <span className="agendar-label-hint">08:00 - 18:00</span>
              </label>
              
              {!formData.fecha ? (
                <div className="agendar-horarios-placeholder">
                  Seleccione primero una fecha
                </div>
              ) : cargandoHorarios ? (
                <div className="agendar-horarios-placeholder agendar-horarios-loading">
                  Cargando horarios disponibles...
                </div>
              ) : (
                <>
                  <div className="agendar-horarios-grid">
                    {HORARIOS_DISPONIBLES.map((horario) => {
                      const ocupado = horariosOcupados.includes(horario);
                      const seleccionado = formData.hora === horario;
                      return (
                        <button
                          key={horario}
                          type="button"
                          onClick={() => handleHorarioClick(horario)}
                          disabled={ocupado}
                          className={`agendar-horario-btn ${ocupado ? "ocupado" : ""} ${seleccionado ? "seleccionado" : ""}`}
                        >
                          {horario}
                        </button>
                      );
                    })}
                  </div>
                  <div className="agendar-disponibilidad-info">
                    <span className="disponibles">
                      <FaCheckCircle /> {horariosLibres.length} disponibles
                    </span>
                    <span className="ocupados">
                      {horariosOcupados.length} ocupados
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="agendar-form-group">
              <label>
                <FaTachometerAlt className="agendar-label-icon" />
                Kilometraje actual
              </label>
              <input
                type="number"
                name="kilometraje"
                value={formData.kilometraje}
                onChange={handleChange}
                placeholder="Ej: 15000"
                min="0"
                required
              />
            </div>

            <div className="agendar-form-group">
              <label>
                <FaTools className="agendar-label-icon" />
                Tipo de servicio
              </label>
              <select
                name="tipoPostVent"
                value={formData.tipoPostVent}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un servicio</option>
                <option value="Mantenimiento Preventivo">Mantenimiento Preventivo</option>
                <option value="Cambio de Aceite">Cambio de Aceite</option>
                <option value="Revisión General">Revisión General</option>
                <option value="Reparación de Frenos">Reparación de Frenos</option>
                <option value="Alineación y Balanceo">Alineación y Balanceo</option>
                <option value="Cambio de Neumáticos">Cambio de Neumáticos</option>
                <option value="Diagnóstico Electrónico">Diagnóstico Electrónico</option>
                <option value="Reparación de Motor">Reparación de Motor</option>
                <option value="Servicio de Aire Acondicionado">Servicio de Aire Acondicionado</option>
                <option value="Otros">Otros</option>
              </select>
            </div>

            <div className="agendar-form-group">
              <label>
                <FaFileAlt className="agendar-label-icon" />
                Descripción adicional
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describa cualquier detalle adicional sobre el servicio que necesita..."
              />
            </div>

            <button 
              type="submit" 
              className="agendar-btn-submit" 
              disabled={submitting || !formData.hora}
            >
              {submitting ? (
                <>
                  <div className="registro-spinner"></div>
                  Agendando...
                </>
              ) : (
                <>
                  <FaCalendar />
                  Confirmar Turno
                </>
              )}
            </button>
          </form>
        </div>
        )}
      </div>
    </section>
  );
};

export default AgendarTurno;
