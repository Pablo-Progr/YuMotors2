import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TablaVehiculosAdmin = ({ refreshTrigger }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalImagen, setMostrarModalImagen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchVehiculos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/vehiculos-usados"
      );
      setVehiculos(response.data);
    } catch (error) {
      console.error("Error fetching vehiculos:", error);
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, [refreshTrigger]);

  const handleEliminarVehiculo = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:3000/api/vehiculos-usados/eliminar/${id}`
        );
        setVehiculos(
          vehiculos.filter((vehiculo) => vehiculo.idVehiculoUsado !== id)
        );
        Swal.fire("Eliminado", "El vehículo ha sido eliminado", "success");
      } catch (error) {
        console.error("Error eliminando vehiculo:", error);
        Swal.fire("Error", "No se pudo eliminar el vehículo", "error");
      }
    }
  };

  const abrirModalEditar = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setMostrarModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setVehiculoSeleccionado(null);
    setMostrarModalEditar(false);
  };

  const abrirModalImagen = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setMostrarModalImagen(true);
  };

  const cerrarModalImagen = () => {
    setVehiculoSeleccionado(null);
    setMostrarModalImagen(false);
  };

  const handleUpdateVehiculo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/vehiculos-usados/editar/${vehiculoSeleccionado.idVehiculoUsado}`,
        vehiculoSeleccionado
      );

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Vehículo actualizado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchVehiculos();
        cerrarModalEditar();
      }
    } catch (error) {
      console.error("Error al actualizar el vehículo:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el vehículo. Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculoSeleccionado((prevState) => ({
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
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Kilometraje</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr key={vehiculo.idVehiculoUsado}>
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.anio}</td>
                <td>{vehiculo.kilometraje} km</td>
                <td>
                  {vehiculo.descripcion
                    ? vehiculo.descripcion.length > 50
                      ? vehiculo.descripcion.substring(0, 50) + "..."
                      : vehiculo.descripcion
                    : "Sin descripción"}
                </td>
                <td>${parseFloat(vehiculo.precio).toFixed(2)}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-info me-2"
                    onClick={() => abrirModalImagen(vehiculo)}
                    title="Ver imagen"
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-warning me-2"
                    onClick={() => abrirModalEditar(vehiculo)}
                    title="Editar"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() =>
                      handleEliminarVehiculo(vehiculo.idVehiculoUsado)
                    }
                    title="Eliminar"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de imagen */}
      {mostrarModalImagen && vehiculoSeleccionado && (
        <Modal
          show={mostrarModalImagen}
          onHide={cerrarModalImagen}
          centered
          size="lg"
        >
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>
              <i className="bi bi-image me-2"></i>
              Imagen de {vehiculoSeleccionado.marca}{" "}
              {vehiculoSeleccionado.modelo}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-center">
            {vehiculoSeleccionado.imagen ? (
              <img
                src={vehiculoSeleccionado.imagen}
                alt={`${vehiculoSeleccionado.marca} ${vehiculoSeleccionado.modelo}`}
                className="img-fluid rounded"
                style={{ maxHeight: "500px" }}
              />
            ) : (
              <div className="text-white py-5">
                <i
                  className="bi bi-image-fill"
                  style={{ fontSize: "4rem" }}
                ></i>
                <p className="mt-3">No hay imagen disponible</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="bg-dark">
            <Button variant="secondary" onClick={cerrarModalImagen}>
              <i className="bi bi-x-circle me-2"></i>Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal de edición */}
      {mostrarModalEditar && vehiculoSeleccionado && (
        <Modal
          show={mostrarModalEditar}
          onHide={cerrarModalEditar}
          centered
          size="lg"
        >
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>
              <i className="bi bi-pencil-square me-2"></i>
              Editar Vehículo: {vehiculoSeleccionado.marca}{" "}
              {vehiculoSeleccionado.modelo}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            <Form onSubmit={handleUpdateVehiculo}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="bi bi-tag me-2"></i>Marca
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="marca"
                      value={vehiculoSeleccionado.marca}
                      onChange={handleChange}
                      required
                      className="bg-secondary text-white border-secondary"
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="bi bi-car-front-fill me-2"></i>Modelo
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="modelo"
                      value={vehiculoSeleccionado.modelo}
                      onChange={handleChange}
                      required
                      className="bg-secondary text-white border-secondary"
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="bi bi-calendar3 me-2"></i>Año
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="anio"
                      value={vehiculoSeleccionado.anio}
                      onChange={handleChange}
                      required
                      className="bg-secondary text-white border-secondary"
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="bi bi-speedometer2 me-2"></i>Kilometraje
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="kilometraje"
                      value={vehiculoSeleccionado.kilometraje}
                      onChange={handleChange}
                      required
                      className="bg-secondary text-white border-secondary"
                    />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-card-text me-2"></i>Descripción
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={vehiculoSeleccionado.descripcion || ""}
                  onChange={handleChange}
                  className="bg-secondary text-white border-secondary"
                />
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="bi bi-currency-dollar me-2"></i>Precio
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="precio"
                      value={vehiculoSeleccionado.precio}
                      onChange={handleChange}
                      required
                      step="0.01"
                      className="bg-secondary text-white border-secondary"
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="bi bi-image me-2"></i>URL de Imagen
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="imagen"
                      value={vehiculoSeleccionado.imagen || ""}
                      onChange={handleChange}
                      className="bg-secondary text-white border-secondary"
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="d-grid">
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
                      Guardando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Guardar Cambios
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default TablaVehiculosAdmin;
