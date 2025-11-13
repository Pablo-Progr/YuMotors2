import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
// Importar 'bootstrap.min.css' aquí si es necesario en tu proyecto
// import "bootstrap/dist/css/bootstrap.min.css";

const TablaAccesoriosAdmin = () => {
  const [accesorios, setAccesorios] = useState([]);
  const [accesorioSeleccionado, setAccesorioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mostrarModalImagen, setMostrarModalImagen] = useState(false);
  const [mostrarModalDescripcion, setMostrarModalDescripcion] = useState(false);

  // --- ESTADO PARA FILTRO ÚNICO ---
  const [filtro, setFiltro] = useState("");

  // --- FORMATEADOR DE MONEDA ---
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const fetchAccesorios = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/accesorios/accesorios"
      );
      setAccesorios(response.data);
    } catch (error) {
      console.error("Error fetching accessories:", error);
    }
  };

  useEffect(() => {
    fetchAccesorios();
  }, []);

  const handleEliminarAccesorio = async (id) => {
    // --- CONFIRMACIÓN AÑADIDA ---
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará el accesorio y todos sus registros de ventas asociados",
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
          `http://localhost:3000/api/accesorios/eliminar/${id}`
        );
        setAccesorios(
          accesorios.filter((accesorio) => accesorio.idAccesorio !== id)
        );
        Swal.fire({
          icon: "success",
          title: "Accesorio eliminado",
          text: "El accesorio y sus ventas asociadas fueron eliminados",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting accesorio:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el accesorio. Inténtalo de nuevo.",
        });
      }
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

  const abrirModalDescripcion = (accesorio) => {
    setAccesorioSeleccionado(accesorio);
    setMostrarModalDescripcion(true);
  };

  const cerrarModalDescripcion = () => {
    setAccesorioSeleccionado(null);
    setMostrarModalDescripcion(false);
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

  // --- LÓGICA DE FILTRADO ---
  const accesoriosFiltrados = accesorios.filter((accesorio) => {
    const filtroLower = filtro.toLowerCase();
    const nombreMatch = (accesorio.nombre || "")
      .toLowerCase()
      .includes(filtroLower);
    const marcaMatch = (accesorio.marca || "")
      .toLowerCase()
      .includes(filtroLower);

    return nombreMatch || marcaMatch;
  });

  return (
    <>
      <div className="table-responsive p-3 rounded">
        {/* --- INPUT DE FILTRO ÚNICO --- */}
        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Group>
              <Form.Label className="text-white">
                <i className="bi bi-search me-2"></i>Buscar por Nombre o Marca
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe para filtrar..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="bg-secondary text-white border-secondary"
              />
            </Form.Group>
          </div>
        </div>
        {/* --------------------------- */}

        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              {/* --- COLUMNA DE IMAGEN AÑADIDA --- */}
              <th>ID</th>
              <th className="text-center">Imagen</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Stock</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* --- USAR LISTA FILTRADA --- */}
            {accesoriosFiltrados.map((accesorio) => (
              <tr key={accesorio.idAccesorio}>
                <td>{accesorio.idAccesorio}</td>
                {/* --- CELDA DE IMAGEN AÑADIDA --- */}
                <td className="text-center align-middle">
                                    <button
                    className="btn btn-sm  me-2"
                    onClick={() => abrirModalImagen(accesorio)}
                    title="Ver imagen"
                  >
                                      <img
                    src={accesorio.imagen || "invalid-url"}
                    alt={accesorio.nombre}
                    className="rounded"
                    style={{
                      width: "80px",
                      height: "60px",
                      objectFit: "cover",
                      border: "1px solid #495057",
                    }}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/80x60/495057/dee2e6?text=Sin+Foto";
                      e.currentTarget.onerror = null;
                    }}
                  />
                  </button>

                </td>
                {/* ----------------------------- */}
                <td>{accesorio.nombre}</td>
                <td>{accesorio.marca}</td>
                <td className="text-center">
                  {accesorio.descripcion ? (
                    <button
                      className="btn btn-sm btn-outline-light"
                      onClick={() => abrirModalDescripcion(accesorio)}
                      title="Ver descripción completa"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  ) : (
                    <span className="text-muted">N/A</span>
                  )}
                </td>
                {/* --- PRECIO FORMATEADO --- */}
                <td>
                  {currencyFormatter.format(parseFloat(accesorio.precio))}
                </td>
                <td>{accesorio.stock}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-light me-2"
                    onClick={() => abrirModal(accesorio)}
                    title="Editar"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() =>
                      handleEliminarAccesorio(accesorio.idAccesorio)
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

      {/* Modal de descripción */}
      {mostrarModalDescripcion && accesorioSeleccionado && (
        <Modal
          show={mostrarModalDescripcion}
          onHide={cerrarModalDescripcion}
          centered
          size="md"
        >
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>
             {accesorioSeleccionado.nombre}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            <p style={{ whiteSpace: "pre-wrap" }}>
              {accesorioSeleccionado.descripcion || "Sin descripción disponible"}
            </p>
          </Modal.Body>
        </Modal>
      )}

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
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-center">
            {accesorioSeleccionado.imagen ? (
              <img
                src={accesorioSeleccionado.imagen}
                alt={`${accesorioSeleccionado.nombre} ${accesorioSeleccionado.marca}`}
                className="img-fluid rounded"
                style={{ maxHeight: "500px" }}
                // Placeholder por si falla la imagen grande
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/600x400/495057/dee2e6?text=Imagen+no+disponible";
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.maxHeight = "400px";
                }}
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
      {/* Corregido el typo 'syze' a 'size' y añadido estilo a inputs */}
      {mostrarModal && accesorioSeleccionado && (
        <Modal show={mostrarModal} onHide={cerrarModal} centered size="lg">
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>
              Editar Accesorio: {accesorioSeleccionado.nombre}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white w-100">
            <Form onSubmit={handleUpdateAccesorio}>
              <div className="row">
                <div className="col-md-12 d-flex gap-3">
                  <Form.Group className="mb-3 w-50">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={accesorioSeleccionado.nombre}
                      onChange={handleChange}
                      required
                      className="bg-secondary text-white border-secondary"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 w-50">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                      type="text"
                      name="marca"
                      value={accesorioSeleccionado.marca}
                      onChange={handleChange}
                      required
                      className="bg-secondary text-white border-secondary"
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
                  value={accesorioSeleccionado.descripcion}
                  onChange={handleChange}
                  className="bg-secondary text-white border-secondary"
                />
              </Form.Group>

              <div className="row">
                <div className="col-md-12 d-flex gap-3">
                  <Form.Group className="mb-3 w-50">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                      type="number"
                      name="precio"
                      value={accesorioSeleccionado.precio}
                      onChange={handleChange}
                      required
                      step="0.01"
                      className="bg-secondary text-white border-secondary"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 w-50">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      name="stock"
                      value={accesorioSeleccionado.stock}
                      onChange={handleChange}
                      required
                      className="bg-secondary text-white border-secondary"
                    />
                  </Form.Group>
                </div>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen"
                  value={accesorioSeleccionado.imagen || ""}
                  onChange={handleChange}
                  className="bg-secondary text-white border-secondary"
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit" disabled={loading}>
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
                    "Guardar Cambios"
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

export default TablaAccesoriosAdmin;
