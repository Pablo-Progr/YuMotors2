import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCar, FaArrowLeft, FaCalendarPlus, FaHistory, FaEye, FaEdit, FaTimes } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "../css/miPosventa.css";

const HistorialVehiculo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehiculo, setVehiculo] = useState(null);
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [descripcionSeleccionada, setDescripcionSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos del vehículo
        const vehResponse = await axios.get(
          `http://localhost:3000/api/veh-posventa/${id}`
        );
        setVehiculo(vehResponse.data);

        // Obtener registros del vehículo
        const regResponse = await axios.get(
          `http://localhost:3000/api/reg-posventa-user/${id}`
        );
        setRegistros(regResponse.data);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

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
    if (typeof value === "string") {
      const m = value.match(/(\d{1,2}):(\d{2})/);
      if (m) return `${String(m[1]).padStart(2, "0")}:${m[2]}`;
    }
    return value;
  };

  const renderEstado = (estado) => {
    const n = Number(estado); //pablo para giuliano: De verda no habra forma de hacer esto MENOS repetitivo? safa pero, bue...
    if (n === 0) return <span className="historial-badge historial-badge-pendiente">Pendiente</span>;
    if (n === 1) return <span className="historial-badge historial-badge-proceso">En proceso</span>;
    if (n === 2) return <span className="historial-badge historial-badge-completado">Completado</span>; 
    if (n === 3) return <span className="historial-badge historial-badge-cancelado">Cancelado</span>;
    return <span>{estado}</span>;
  };

  const handleVolver = () => {
    navigate("/mi-posventa");
  };

  const handleAgendarTurno = () => {
    navigate(`/mi-posventa/agendar/${id}`);
  };

  const abrirModalDescripcion = (descripcion) => {
    setDescripcionSeleccionada(descripcion);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setDescripcionSeleccionada(null);
    setMostrarModal(false);
  };

  const handleEditarTurno = (idRegistro) => {
    navigate(`/mi-posventa/editar/${idRegistro}`);
  };

  const handleCancelarTurno = async (idRegistro) => {
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
      setRegistros((prev) =>
        prev.map((r) =>
          r.idRegistroPostVenta === idRegistro ? { ...r, estado: 3 } : r
        )
      );
    } catch (err) {
      console.error("Error al cancelar turno:", err);
      Swal.fire("Error", "No se pudo cancelar el turno.", "error");
    }
  };

  if (loading) {
    return (
      <section className="historial-section">
        <div className="historial-container">
          <div className="historial-empty">Cargando...</div>
        </div>
      </section>
    );
  }

  if (!vehiculo) {
    return (
      <section className="historial-section">
        <div className="historial-container">
          <button className="historial-back-btn" onClick={handleVolver}>
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
    <section className="historial-section">
      <div className="historial-container">
        <div className="historial-header">
          <button className="historial-back-btn" onClick={handleVolver}>
            <FaArrowLeft />
            Volver a Mis Vehículos
          </button>

          <div className="historial-vehiculo-info">
            <FaCar className="historial-vehiculo-icon" />
            <div className="historial-vehiculo-details">
              <h3>{vehiculo.marca} {vehiculo.modelo}</h3>
              <span className="patente">{vehiculo.patente}</span>
            </div>
          </div>

          <button className="historial-btn-agendar" onClick={handleAgendarTurno}>
            <FaCalendarPlus />
            Agendar Turno
          </button>
        </div>

        <h3 className="historial-title">
          <FaHistory style={{ marginRight: "8px" }} />
          Historial de Servicios
        </h3>

        {registros.length === 0 ? (
          <div className="historial-empty">
            <FaHistory className="historial-empty-icon" />
            <h4>Sin registros</h4>
            <p>Este vehículo aún no tiene registros de servicios.</p>
            <button className="mi-posventa-btn-first" onClick={handleAgendarTurno}>
              <FaCalendarPlus />
              Agendar primer turno
            </button>
          </div>
        ) : (
          <div className="historial-table-wrapper">
            <table className="historial-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Kilometraje</th>
                  <th>Tipo de Servicio</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((reg, idx) => (
                  <tr key={reg.idRegistroPostVenta || idx}>
                    <td>{idx + 1}</td>
                    <td>{formatDate(reg.fecha)}</td>
                    <td>{formatTime(reg.hora)}</td>
                    <td>{reg.kilometraje?.toLocaleString()} km</td>
                    <td>{reg.tipoPostVent}</td>
                    <td>
                      <button
                        className="historial-btn-descripcion"
                        onClick={() => abrirModalDescripcion(reg.descripcion)}
                      >
                        <FaEye /> Ver
                      </button>
                    </td>
                    <td>{renderEstado(reg.estado)}</td>
                    <td>
                      {Number(reg.estado) === 0 && (
                        <div className="historial-acciones">
                          <button
                            className="historial-btn-accion historial-btn-editar-row"
                            onClick={() => handleEditarTurno(reg.idRegistroPostVenta)}
                            title="Modificar turno"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="historial-btn-accion historial-btn-cancelar-row"
                            onClick={() => handleCancelarTurno(reg.idRegistroPostVenta)}
                            title="Cancelar turno"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* pablo: Este es el modal de la descripocion, que se activa con el boton del ojito. Hay que revisarlo*/}
      <Modal show={mostrarModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
          <Modal.Title>Descripción del Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f8f9fa", padding: "24px" }}>
          <p style={{ margin: 0, color: "#333" }}>
            {descripcionSeleccionada || "Sin descripción"} 
          </p>
      </Modal.Body> {/* Jeremias para Pablo: REVISAR!!!! SI HAY MUCHO TEXT LOS CARACTERES SE VAN DEL MODAL, DE LA PANTALLA Y HASTA APAGAN LA LUZ ANTES DE IRSE ¿¿¿??? */}
        <Modal.Footer style={{ backgroundColor: "#f8f9fa" }}>
          <Button 
            onClick={cerrarModal}
            style={{ 
              backgroundColor: "#1a1a1a", 
              border: "none",
              padding: "8px 20px"
            }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default HistorialVehiculo;
