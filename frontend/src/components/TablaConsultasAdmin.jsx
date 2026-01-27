import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/modalAdmin.css";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap"; // Import Modal

const TablaConsultasAdmin = () => {
  const [consultas, setConsultas] = useState([]);
  const [consultaSeleccionada, setConsultaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = (consultas) => {
    setConsultaSeleccionada(consultas);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setConsultaSeleccionada(null);
    setMostrarModal(false);
  };

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/consultas");
        const data = await response.json();
        setConsultas(data);
      } catch (error) {
        console.error("Error al obtener consultas:", error);
      }
    };

    fetchConsultas();
  }, []);

  const refresh = () => {
    // simple refresh helper
    const fetchConsultas = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/consultas");
        const data = await response.json();
        setConsultas(data);
      } catch (error) {
        console.error("Error al obtener consultas:", error);
      }
    };
    fetchConsultas();
  };

  const cambiarEstadoConsulta = async (consulta) => {
    try {
      // Convertir a número para evitar problemas de tipo
      const estadoActual = Number(consulta.estado);
      const nuevoEstado = estadoActual === 1 ? 0 : 1; // toggle

      const res = await fetch("http://localhost:3000/api/consultas/estado", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idConsulta: consulta.idConsulta,
          estado: nuevoEstado,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error updating estado");
      }

      // update local state for immediate feedback
      setConsultas((prev) =>
        prev.map((c) =>
          c.idConsulta === consulta.idConsulta
            ? { ...c, estado: nuevoEstado }
            : c
        )
      );

      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: `La consulta ahora está marcada como ${
          nuevoEstado === 1 ? "Atendida" : "Pendiente"
        }`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cambiar el estado de la consulta",
      });
    }
  };

  const handleEliminarConsulta = async (idConsulta) => {
    // Mostrar confirmación con SweetAlert2
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/consultas/eliminar/${idConsulta}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Error eliminando consulta");

      // remove from local state
      setConsultas((prev) => prev.filter((c) => c.idConsulta !== idConsulta));

      Swal.fire({
        icon: "success",
        title: "Eliminada",
        text: "La consulta ha sido eliminada exitosamente",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error eliminando consulta:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la consulta",
      });
    }
  };

  return (
    <>
      <div className="table-responsive p-3 rounded">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Asunto</th>
              <th>Preferencia</th>
              <th>Estado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map((consultas) => (
              <tr key={consultas.idConsulta}>
                <td>{consultas.nombre}</td>
                <td>{consultas.email}</td>
                <td>{consultas.telefono}</td>
                <td>{consultas.asunto}</td>
                <td>{consultas.preferencia}</td>
                <td>
                  <span
                    className={`badge ${
                      Number(consultas.estado) === 1 ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {Number(consultas.estado) === 1 ? "Atendida" : "Pendiente"}
                  </span>
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-light me-2"
                    title="Marcar como contactado"
                    onClick={() => cambiarEstadoConsulta(consultas)}
                  >
                    <i className="bi bi-check-lg"></i>
                  </button>

                  <button
                    className="btn btn-sm btn-outline-light me-2"
                    title="Ver detalle"
                    onClick={() => abrirModal(consultas)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Eliminar"
                    onClick={() => handleEliminarConsulta(consultas.idConsulta)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && consultaSeleccionada && (
        <Modal
          show={mostrarModal}
          onHide={cerrarModal}
          centered
          size="lg"
          dialogClassName="admin-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Consulta de {consultaSeleccionada.nombre}
              {" - "}
              {consultaSeleccionada.asunto}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-2">
              <h4 className="mb-3">Mensaje</h4>
              <p className="fs-5">{consultaSeleccionada.mensaje}</p>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default TablaConsultasAdmin;
