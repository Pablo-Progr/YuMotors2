import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/modalAdmin.css"; // Import styles

const ModalAgregarVehiculo = ({ show, onHide, onVehiculoAgregado }) => {
  const [loading, setLoading] = useState(false);
  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    marca: "",
    modelo: "",
    anio: "",
    kilometraje: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoVehiculo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/vehiculos-usados/agregar",
        nuevoVehiculo
      );

      if (response.status === 201 || response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Vehículo agregado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });

        // Limpiar el formulario
        setNuevoVehiculo({
          marca: "",
          modelo: "",
          anio: "",
          kilometraje: "",
          descripcion: "",
          precio: "",
          imagen: "",
        });

        onVehiculoAgregado(); // Recargar la lista de vehículos
        onHide(); // Cerrar el modal
      }
    } catch (error) {
      console.error("Error al agregar el vehículo:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el vehículo. Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" dialogClassName="admin-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-car-front me-2"></i>
          Agregar Nuevo Vehículo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-5">
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-tag me-2"></i>Marca
                </Form.Label>
                <Form.Control
                  type="text"
                  name="marca"
                  placeholder="Ej: Toyota"
                  value={nuevoVehiculo.marca}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-5">
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-car-front-fill me-2"></i>Modelo
                </Form.Label>
                <Form.Control
                  type="text"
                  name="modelo"
                  placeholder="Ej: Corolla"
                  value={nuevoVehiculo.modelo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-calendar3 me-2"></i>Año
                </Form.Label>
                <Form.Control
                  type="number"
                  name="anio"
                  placeholder="Ej: 2020"
                  value={nuevoVehiculo.anio}
                  onChange={handleChange}
                  required
                  min="1900"
                  max={new Date().getFullYear() + 1}
                />
              </Form.Group>
            </div>

            <div className="col-md-5">
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-speedometer2 me-2"></i>Kilometraje
                </Form.Label>
                <Form.Control
                  type="number"
                  name="kilometraje"
                  placeholder="Ej: 50000"
                  value={nuevoVehiculo.kilometraje}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
          <Form.Group className="mb-3">
            <Form.Label>
              <i className="bi bi-card-text me-2"></i>Descripción
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              placeholder="Descripción detallada del vehículo..."
              value={nuevoVehiculo.descripcion}
              onChange={handleChange}
            />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-currency-dollar me-2"></i>Precio
                </Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  placeholder="Ej: 15000"
                  value={nuevoVehiculo.precio}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                />
              </Form.Group>
            </div>

            <div className="col-md-5">
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-image me-2"></i>URL de Imagen
                </Form.Label>
                <Form.Control
                  type="text"
                  name="imagen"
                  placeholder="URL de la imagen del vehículo"
                  value={nuevoVehiculo.imagen}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Agregando...
                </>
              ) : (
                <>
                  <i className="bi bi-plus-circle me-2"></i>
                  Agregar Vehículo
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAgregarVehiculo;
