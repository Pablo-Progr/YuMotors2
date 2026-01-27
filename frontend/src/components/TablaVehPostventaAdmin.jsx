import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/modalAdmin.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";

const TablaVehPostventaAdmin = () => {
  const navigate = useNavigate();
  const [vehPostventa, setVehPostVenta] = useState([]);
  const [vehPostventaSeleccionado, setVehPostventaSeleccionado] = useState(
    null
  );
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchVehPostventa = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/veh-posventa");
      setVehPostVenta(response.data);
    } catch (error) {
      console.error("Error al obtener vehículos postventa:", error);
    }
  };

  useEffect(() => {
    fetchVehPostventa();
  }, []);

  const abrirModal = (accesorio) => {
    setVehPostventaSeleccionado(accesorio);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setVehPostventaSeleccionado(null);
    setMostrarModal(false);
  };

  const handleEliminarVehiculo = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/veh-posventa/eliminar/${id}`
      );
      setVehPostVenta(
        vehPostventa.filter(
          (vehiculo) => vehiculo.idVehiculoPostVenta !== id
        )
      );
      Swal.fire({
        icon: "success",
        title: "Vehículo eliminado",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
    }
  };

  const handleUpdateVehiculo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/veh-posventa/editar/${vehPostventaSeleccionado.idVehiculoPostVenta}`,
        vehPostventaSeleccionado
      );

      console.log("Respuesta del servidor:", response);

      if (response.status === 200 && response.data && response.data.message) {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: response.data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        fetchVehPostventa(); // Recarga los datos
        cerrarModal();
      } else {
        console.warn("Respuesta inesperada del servidor:", response);
        Swal.fire({
          icon: "warning",
          title: "Advertencia",
          text: "La operación se completó, pero la respuesta del servidor fue inesperada.",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el vehículo:", error);

      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: error.response.data?.error || "Ocurrió un error en el servidor.",
        });
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta
        Swal.fire({
          icon: "error",
          title: "Sin respuesta",
          text: "No se recibió respuesta del servidor. Verifica tu conexión.",
        });
      } else {
        // Algo pasó al configurar la solicitud
        Swal.fire({
          icon: "error",
          title: "Error desconocido",
          text: "Ocurrió un error inesperado. Inténtalo de nuevo.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehPostventaSeleccionado((prevState) => ({
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
              <th>Patente</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Telefono</th>
              <th>Codigo</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehPostventa.map((vehPostventa) => (
              <tr key={vehPostventa.idVehiculoPostVenta}>
                <td>{vehPostventa.patente}</td>
                <td>{vehPostventa.marca}</td>
                <td>{vehPostventa.modelo}</td>
                <td>{vehPostventa.anio}</td>
                <td>{vehPostventa.telefono}</td>
                <td>{vehPostventa.codigo}</td>
                <td className="text-end">
                  <Link
                    className="btn btn-sm btn-outline-light me-2"
                    to={`/admin/registro-posventa/${vehPostventa.idVehiculoPostVenta}`}
                  >
                    <i className="bi bi-eye"></i>
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-light me-2"
                    onClick={() => abrirModal(vehPostventa)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() =>
                      handleEliminarVehiculo(vehPostventa.idVehiculoPostVenta)
                    }
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
      {mostrarModal && vehPostventaSeleccionado && (
        <Modal show={mostrarModal} onHide={cerrarModal} centered>
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>
              Editar Vehículo: {vehPostventaSeleccionado.patente}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            <Form onSubmit={handleUpdateVehiculo}>
              <Form.Group className="mb-3">
                <Form.Label>Patente</Form.Label>
                <Form.Control
                  type="text"
                  name="patente"
                  value={vehPostventaSeleccionado.patente}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"
                  name="marca"
                  value={vehPostventaSeleccionado.marca}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  type="text"
                  name="modelo"
                  value={vehPostventaSeleccionado.modelo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Año</Form.Label>
                <Form.Control
                  type="number"
                  name="anio"
                  value={vehPostventaSeleccionado.anio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={vehPostventaSeleccionado.telefono}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="codigo"
                  value={vehPostventaSeleccionado.codigo}
                  onChange={handleChange}
                  required
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

export default TablaVehPostventaAdmin;