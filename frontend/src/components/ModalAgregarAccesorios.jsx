import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalAgregarAccesorios = ({ show, onHide, onAccesorioAgregado }) => {
  const [nuevoAccesorio, setNuevoAccesorio] = useState({
    nombre: "",
    marca: "",
    descripcion: "",
    precio: 0,
    stock: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoAccesorio((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/accesorios/crear",
        nuevoAccesorio
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Accesorio agregado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
        onAccesorioAgregado(); // Actualiza la tabla
        onHide(); // Cierra el modal
      }
    } catch (error) {
      console.error("Error al agregar el accesorio:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el accesorio. Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Agregar Nuevo Accesorio</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12 d-flex gap-3">
              <Form.Group className="mb-3 w-50">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={nuevoAccesorio.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 w-50">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"
                  name="marca"
                  value={nuevoAccesorio.marca}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={nuevoAccesorio.descripcion}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-12 d-flex gap-3">
              <Form.Group className="mb-3 w-50">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  value={nuevoAccesorio.precio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 w-50">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={nuevoAccesorio.stock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={nuevoAccesorio.imagen}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Agregando..." : "Agregar Accesorio"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAgregarAccesorios;
