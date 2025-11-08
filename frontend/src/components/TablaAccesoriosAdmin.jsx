import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";

const TablaAccesoriosAdmin = () => {
  
  const [accesorios, setAccesorios] = useState([]);
  const [accesorioSeleccionado, setAccesorioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);
    const [mostrarModalImagen, setMostrarModalImagen] = useState(false);

    const fetchAccesorios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/accesorios/accesorios");
        setAccesorios(response.data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      }
    };

  useEffect(() => {
    fetchAccesorios();
  }, []);

  const handleEliminarAccesorio = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/accesorios/eliminar/${id}`);
      setAccesorios(accesorios.filter((accesorio) => accesorio.idAccesorio !== id));
      Swal.fire({
        icon: "success",
        title: "Accesorio eliminado",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error deleting accesorio:", error);
    }
  };

    const abrirModal = (accesorio) => {
      setAccesorioSeleccionado(accesorio);
      setMostrarModal(true);
    };

    const cerrarModal = () => {
      setAccesorioSeleccionado(null);
      setMostrarModal(false);
  };

      const abrirModalImagen = (accesorio) => {
        setAccesorioSeleccionado(accesorio);
        setMostrarModalImagen(true);
      };

      const cerrarModalImagen = () => {
        setAccesorioSeleccionado(null);
        setMostrarModalImagen(false);
      };

  const handleUpdateAccesorio = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/accesorios/editar/${accesorioSeleccionado.idAccesorio}`,
        accesorioSeleccionado
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Accesorio actualizado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });

        fetchAccesorios(); // Recarga los datos
        cerrarModal();
      }
    } catch (error) {
      console.error("Error al actualizar el accesorio:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el accesorio. Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

   const handleChange = (e) => {
     const { name, value } = e.target;
     setAccesorioSeleccionado((prevState) => ({
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
              <th>ID</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Stock</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {accesorios.map((accesorios) => (
              <tr key={accesorios.idAccesorio}>
                <td>{accesorios.idAccesorio}</td>
                <td>{accesorios.nombre}</td>
                <td>{accesorios.marca}</td>
                <td>{accesorios.descripcion}</td>
                <td>{accesorios.precio}</td>
                <td>{accesorios.stock}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-info me-2"
                    onClick={() => abrirModalImagen(accesorios)}
                    title="Ver imagen"
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-light me-2"
                    onClick={() => abrirModal(accesorios)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() =>
                      handleEliminarAccesorio(accesorios.idAccesorio)
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

      {/* Modal de imagen */}
      {mostrarModalImagen && accesorioSeleccionado && (
        <Modal
          show={mostrarModalImagen}
          onHide={cerrarModalImagen}
          centered
          size="lg"
        >
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>
              <i className="bi bi-image me-2"></i>
              Imagen de {accesorioSeleccionado.nombre}{" "}
              {accesorioSeleccionado.marca}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-center">
            {accesorioSeleccionado.imagen ? (
              <img
                src={accesorioSeleccionado.imagen}
                alt={`${accesorioSeleccionado.nombre} ${accesorioSeleccionado.marca}`}
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
      {mostrarModal && accesorioSeleccionado && (
        <Modal show={mostrarModal} onHide={cerrarModal} centered>
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>
              Editar Accesorio: {accesorioSeleccionado.nombre}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            <Form onSubmit={handleUpdateAccesorio}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={accesorioSeleccionado.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"
                  name="marca"
                  value={accesorioSeleccionado.marca}
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
                  value={accesorioSeleccionado.descripcion}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  value={accesorioSeleccionado.precio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={accesorioSeleccionado.stock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen"
                  value={accesorioSeleccionado.imagen}
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

export default TablaAccesoriosAdmin;
