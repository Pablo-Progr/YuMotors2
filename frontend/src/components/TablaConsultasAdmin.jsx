import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/modalAdmin.css";

const TablaConsultasAdmin = () => {
  const [consultaSeleccionada, setConsultaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = (consulta) => {
    setConsultaSeleccionada(consulta);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setConsultaSeleccionada(null);
    setMostrarModal(false);
  };

  const consultas = [
    {
      nombre: "Chiqui Tapia",
      email: "chiqui.tapia@example.com",
      telefono: "123-456-7890",
      titulo: "Toyota Gr Yaris",
      mensaje:
        "Hola bunas tardes, quisiera saber mas sobre el Toyota Gr Yaris 2023",
      active: true,
    },
    {
      nombre: "Chiqui Tapia",
      email: "chiqui.tapia@example.com",
      telefono: "123-456-7890",
      titulo: "Consulta sobre Toyota Gr Yaris",
      mensaje:
        "Hola bunas tardes, quisiera saber mas sobre el Toyota Gr Yaris 2023",
      active: true,
    },
    {
      nombre: "Chiqui Tapia",
      email: "chiqui.tapia@example.com",
      telefono: "123-456-7890",
      titulo: "Consulta sobre Toyota Gr Yaris",
      mensaje:
        "Hola bunas tardes, quisiera saber mas sobre el Toyota Gr Yaris 2023",
      active: true,
    },
  ];

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
            {consultas.map((consulta, index) => (
              <tr key={index}>
                <td>{consulta.nombre}</td>
                <td>{consulta.email}</td>
                <td>{consulta.telefono}</td>
                <td>{consulta.titulo}</td>
                <td>
                  <span
                    className={`badge ${
                      consulta.active ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {consulta.active ? "Pendiente" : "Contactado"}
                  </span>
                </td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-light me-2">
                    <i
                      className="bi bi-pencil"
                      onClick={() => abrirModal(consulta)}
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
                  {consultaSeleccionada.titulo}
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
