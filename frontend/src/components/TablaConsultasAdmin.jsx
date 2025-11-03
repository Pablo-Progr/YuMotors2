import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/modalAdmin.css";

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
        const response = await fetch(
          "http://localhost:3000/api/consultas/consultas"
        );
        const data = await response.json();
        setConsultas(data);
      } catch (error) {
        console.error("Error al obtener consultas:", error);
      }
    };

    fetchConsultas();
  }, []);

  return (
    <>
      <div className="table-responsive p-3 rounded">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Título</th>
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
                <td>
                  <span
                    className={`badge ${
                      consultas.active ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {consultas.active ? "Pendiente" : "Contactado"}
                  </span>
                </td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-light me-2">
                    <i
                      className="bi bi-pencil"
                      onClick={() => abrirModal(consultas)}
                    ></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && consultaSeleccionada && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div
              className="modal-content text-white"
            >
              <div className="modal-header">
                <h5 className="modal-title">
                  Consulta de {consultaSeleccionada.nombre}
                  {" - "}
                  {consultaSeleccionada.asunto}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={cerrarModal}
                ></button>
              </div>
              <div className="modal-body bg-dark d-box flex-wrap gap-3 justify-content-center">
                <div>
                  <h2>Mensaje</h2>
                  <p className="">{consultaSeleccionada.mensaje}</p>
                </div>
                <div>
                  <label>Responder Consulta:</label>
                  <textarea className="form-control" rows="4"></textarea>
                </div>
                <div className="my-3 d-flex justify-content-center">
                  <button className="btn btn-dark" onClick={cerrarModal}>
                    Enviar Respuesta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TablaConsultasAdmin;
