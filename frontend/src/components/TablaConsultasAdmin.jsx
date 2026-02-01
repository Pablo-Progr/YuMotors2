import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/modalAdmin.css";
import Swal from "sweetalert2";
import Paginador from "./Paginador";
import { Form, Button } from "react-bootstrap";

const TablaConsultasAdmin = () => {
  const [consultas, setConsultas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 7;
  const [mensajesExpandidos, setMensajesExpandidos] = useState({});
  const [filtroEstado, setFiltroEstado] = useState("todos"); // todos, pendientes, atendidas

  const toggleMensaje = (idConsulta) => {
    setMensajesExpandidos((prev) => ({
      ...prev,
      [idConsulta]: !prev[idConsulta],
    }));
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
            : c,
        ),
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

  // Filtrar y ordenar consultas
  const consultasFiltradas = consultas
    .filter((consulta) => {
      if (filtroEstado === "pendientes") return Number(consulta.estado) === 0;
      if (filtroEstado === "atendidas") return Number(consulta.estado) === 1;
      return true; // todos
    })
    .sort((a, b) => {
      // Ordenar: pendientes primero, atendidas al final
      if (Number(a.estado) === 0 && Number(b.estado) === 1) return -1;
      if (Number(a.estado) === 1 && Number(b.estado) === 0) return 1;
      return 0;
    });

  // Calcular índices para la paginación
  const indiceUltimo = paginaActual * itemsPorPagina;
  const indicePrimero = indiceUltimo - itemsPorPagina;
  const consultasPaginadas = consultasFiltradas.slice(
    indicePrimero,
    indiceUltimo,
  );
  const totalPaginas = Math.ceil(consultasFiltradas.length / itemsPorPagina);

  // Función para cambiar de página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <>
      <div className="table-responsive p-3 rounded">
        {/* Filtros */}
        <div className="row mb-3">
          <div className="col-md-3">
            <Form.Group>
              <Form.Label className="text-white">
                <i className="bi bi-funnel me-2"></i>Estado
              </Form.Label>
              <Form.Select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="bg-secondary text-white border-secondary"
              >
                <option value="todos">Todas</option>
                <option value="pendientes">Pendientes</option>
                <option value="atendidas">Atendidas</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>

        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Asunto</th>
              <th>Mensaje</th>
              <th>Preferencia</th>
              <th>Estado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {consultasPaginadas.map((consultas) => {
              const mensajeExpandido = mensajesExpandidos[consultas.idConsulta];
              const mensajeCorto = consultas.mensaje?.substring(0, 30);
              const necesitaExpansion = consultas.mensaje?.length > 30;

              return (
                <React.Fragment key={consultas.idConsulta}>
                  <tr>
                    <td>{consultas.nombre}</td>
                    <td>{consultas.email}</td>
                    <td>{consultas.telefono}</td>
                    <td>{consultas.asunto}</td>
                    <td style={{ maxWidth: "300px" }}>
                      <div
                        style={{
                          wordWrap: "break-word",
                          whiteSpace: mensajeExpandido ? "pre-wrap" : "normal",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                        }}
                      >
                        {necesitaExpansion ? (
                          <>
                            <span style={{ flex: 1 }}>
                              {mensajeExpandido
                                ? consultas.mensaje
                                : mensajeCorto + "..."}
                            </span>
                            <button
                              className="btn btn-sm btn-link text-white p-0"
                              onClick={() =>
                                toggleMensaje(consultas.idConsulta)
                              }
                              title={mensajeExpandido ? "Contraer" : "Expandir"}
                              style={{ flexShrink: 0 }}
                            >
                              <i
                                className={`bi bi-chevron-${mensajeExpandido ? "up" : "down"}`}
                              ></i>
                            </button>
                          </>
                        ) : (
                          <span>{consultas.mensaje || "Sin mensaje"}</span>
                        )}
                      </div>
                    </td>
                    <td>{consultas.preferencia}</td>
                    <td>
                      <span
                        className={`badge ${
                          Number(consultas.estado) === 1
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {Number(consultas.estado) === 1
                          ? "Atendida"
                          : "Pendiente"}
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-light"
                        title="Marcar como contactado"
                        onClick={() => cambiarEstadoConsulta(consultas)}
                      >
                        <i className="bi bi-check-lg"></i>
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginador */}
      {totalPaginas > 1 && (
        <Paginador
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          cambiarPagina={cambiarPagina}
        />
      )}
    </>
  );
};

export default TablaConsultasAdmin;
