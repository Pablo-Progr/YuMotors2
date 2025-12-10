import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/modalAdmin.css"; // Import styles

const ModalAgregarRepuesto = ({ show, onHide, onRepuestoAgregado }) => {
  const [nuevoRepuesto, setNuevoRepuesto] = useState({
    nombre: "",
    marca: "",
    numeroParte: "",
    precio: "",
    stock: "",
    descripcion: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoRepuesto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/repuestos/agregar",
        nuevoRepuesto
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Repuesto agregado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
        onRepuestoAgregado(); // Actualiza la tabla
        onHide(); // Cierra el modal
      }
    } catch (error) {
      console.error("Error al agregar el repuesto:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el repuesto. Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="admin-modal">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Repuesto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12 d-flex gap-3">
              <Form.Group className="mb-3 w-50">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={nuevoRepuesto.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 w-50">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"
                  name="marca"
                  value={nuevoRepuesto.marca}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <div className="row ">
            <div className="col-12 d-flex gap-3">
              <Form.Group className="mb-3 w-50">
                <Form.Label>Número de Parte</Form.Label>
                <Form.Control
                  type="text"
                  name="numeroParte"
                  value={nuevoRepuesto.numeroParte}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 w-50">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  value={nuevoRepuesto.precio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={nuevoRepuesto.descripcion}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 d-flex gap-3">
              <Form.Group className="mb-3 w-50">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={nuevoRepuesto.stock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 w-50">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen"
                  value={nuevoRepuesto.imagen}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <div className="d-grid">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Agregando..." : "Agregar Repuesto"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAgregarRepuesto;
