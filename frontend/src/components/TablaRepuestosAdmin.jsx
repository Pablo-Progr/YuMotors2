import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";

const TablaRepuestosAdmin = () => {
  const [repuestos, setRepuestos] = useState([]);
  const [repuestoSeleccionado, setRepuestoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRepuestos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/repuestos/repuestos"
      );
      setRepuestos(response.data);
    } catch (error) {
      console.error("Error fetching repuestos:", error);
    }
  };

  useEffect(() => {
    fetchRepuestos();
  }, []);

  const handleEliminarRepuesto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/repuestos/eliminar/${id}`);
      setRepuestos(repuestos.filter((repuesto) => repuesto.idRepuesto !== id));
      Swal.fire({
        icon: "success",
        title: "Repuesto eliminado",
      });
    } catch (error) {
      console.error("Error deleting repuesto:", error);
    }
  };

  const abrirModal = (repuesto) => {
    setRepuestoSeleccionado(repuesto);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setRepuestoSeleccionado(null);
    setMostrarModal(false);
  };

  const handleUpdateRepuesto = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/repuestos/editar/${repuestoSeleccionado.idRepuesto}`,
        repuestoSeleccionado
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Repuesto actualizado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchRepuestos(); // Recarga los datos
        cerrarModal();
      }
    } catch (error) {
      console.error("Error al actualizar el repuesto:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el repuesto. Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepuestoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="table-responsive p-3 rounded">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Numero de Parte</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Descripción</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {repuestos.map((repuesto) => (
              <tr key={repuesto.idRepuesto}>
                <td>{repuesto.idRepuesto}</td>
                <td>{repuesto.nombre}</td>
                <td>{repuesto.marca}</td>
                <td>{repuesto.numeroParte}</td>
                <td>${repuesto.precio}</td>
                <td>{repuesto.stock}</td>
                <td>{repuesto.descripcion}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-light me-2"
                    onClick={() => abrirModal(repuesto)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleEliminarRepuesto(repuesto.idRepuesto)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edición */}
      {mostrarModal && repuestoSeleccionado && (
        <Modal show={mostrarModal} onHide={cerrarModal} centered>
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>
              Editar Repuesto: {repuestoSeleccionado.nombre}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            <Form onSubmit={handleUpdateRepuesto}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={repuestoSeleccionado.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"
                  name="marca"
                  value={repuestoSeleccionado.marca}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Número de Parte</Form.Label>
                <Form.Control
                  type="text"
                  name="numeroParte"
                  value={repuestoSeleccionado.numeroParte}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  value={repuestoSeleccionado.precio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={repuestoSeleccionado.stock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={repuestoSeleccionado.descripcion}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default TablaRepuestosAdmin;
