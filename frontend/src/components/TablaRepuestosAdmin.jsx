import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import PaginadorDarkie from "./PaginadorDarkie";
// Importar 'bootstrap.min.css' aquí si es necesario en tu proyecto
// import "bootstrap/dist/css/bootstrap.min.css";
import "../css/modalAdmin.css"; // Import styles

const TablaRepuestosAdmin = () => {
  const [repuestos, setRepuestos] = useState([]);
  const [repuestoSeleccionado, setRepuestoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mostrarModalImagen, setMostrarModalImagen] = useState(false);
  const [mostrarModalDescripcion, setMostrarModalDescripcion] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 7;
  const [descripcionesExpandidas, setDescripcionesExpandidas] = useState({});

  const toggleDescripcion = (idRepuesto) => {
    setDescripcionesExpandidas((prev) => ({
      ...prev,
      [idRepuesto]: !prev[idRepuesto],
    }));
  };

  // --- ESTADO PARA FILTRO ÚNICO ---
  const [filtro, setFiltro] = useState("");

  // --- ESTADOS PARA FILTROS AVANZADOS ---
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState("todos"); // todos, disponibles, sinStock

  // --- FORMATEADOR DE MONEDA ---
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const fetchRepuestos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/repuestos/repuestos",
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
    // Agregando confirmación de SweetAlert para eliminar
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará el repuesto y todos sus registros de ventas asociados",
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
          `http://localhost:3000/api/repuestos/eliminar/${id}`,
        );
        setRepuestos(
          repuestos.filter((repuesto) => repuesto.idRepuesto !== id),
        );
        Swal.fire({
          icon: "success",
          title: "Repuesto eliminado",
          text: "El repuesto y sus ventas asociadas fueron eliminados",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting repuesto:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el repuesto. Inténtalo de nuevo.",
        });
      }
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
        repuestoSeleccionado,
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

  const abrirModalImagen = (repuesto) => {
    setRepuestoSeleccionado(repuesto);
    setMostrarModalImagen(true);
  };

  const cerrarModalImagen = () => {
    setRepuestoSeleccionado(null);
    setMostrarModalImagen(false);
  };

  const abrirModalDescripcion = (repuesto) => {
    setRepuestoSeleccionado(repuesto);
    setMostrarModalDescripcion(true);
  };

  const cerrarModalDescripcion = () => {
    setRepuestoSeleccionado(null);
    setMostrarModalDescripcion(false);
  };

  // --- LÓGICA DE FILTRADO ---
  const repuestosFiltrados = repuestos
    .filter((repuesto) => {
      const filtroLower = filtro.toLowerCase();
      const nombreMatch = (repuesto.nombre || "")
        .toLowerCase()
        .includes(filtroLower);
      const marcaMatch = (repuesto.marca || "")
        .toLowerCase()
        .includes(filtroLower);
      const numeroParteMatch = (repuesto.numeroParte || "")
        .toLowerCase()
        .includes(filtroLower);

      // Filtro por búsqueda de texto
      const textoMatch = nombreMatch || marcaMatch || numeroParteMatch;

      // Filtro por marca
      const filtroMarcaMatch =
        filtroMarca === "" || repuesto.marca === filtroMarca;

      // Filtro por disponibilidad
      let disponibilidadMatch = true;
      if (filtroDisponibilidad === "disponibles") {
        disponibilidadMatch = repuesto.stock > 0;
      } else if (filtroDisponibilidad === "sinStock") {
        disponibilidadMatch = repuesto.stock === 0;
      }

      return textoMatch && filtroMarcaMatch && disponibilidadMatch;
    })
    .sort((a, b) => {
      // Ordenar: con stock primero, sin stock al final
      if (a.stock === 0 && b.stock > 0) return 1;
      if (a.stock > 0 && b.stock === 0) return -1;
      return 0;
    });

  // Obtener marcas únicas para el filtro
  const marcasUnicas = [...new Set(repuestos.map((r) => r.marca))]
    .filter(Boolean)
    .sort();

  // --- LÓGICA DE PAGINACIÓN ---
  const indiceUltimo = paginaActual * itemsPorPagina;
  const indicePrimero = indiceUltimo - itemsPorPagina;
  const repuestosPaginados = repuestosFiltrados.slice(
    indicePrimero,
    indiceUltimo,
  );
  const totalPaginas = Math.ceil(repuestosFiltrados.length / itemsPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <>
      <div className="table-responsive p-3 rounded">
        {/* --- FILTROS --- */}
        <div className="row mb-3">
          <div className="col-md-3">
            <Form.Group>
              <Form.Label className="text-white">
                <i className="bi bi-search me-2"></i>Buscar
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre, Marca o N° Parte"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="bg-secondary text-white border-secondary"
              />
            </Form.Group>
          </div>
          <div className="col-md-2">
            <Form.Group>
              <Form.Label className="text-white">
                <i className="bi bi-tag me-2"></i>Marca
              </Form.Label>
              <Form.Select
                value={filtroMarca}
                onChange={(e) => setFiltroMarca(e.target.value)}
                className="bg-secondary text-white border-secondary"
              >
                <option value="">Todas</option>
                {marcasUnicas.map((marca) => (
                  <option key={marca} value={marca}>
                    {marca}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group>
              <Form.Label className="text-white">
                <i className="bi bi-box-seam me-2"></i>Disponibilidad
              </Form.Label>
              <Form.Select
                value={filtroDisponibilidad}
                onChange={(e) => setFiltroDisponibilidad(e.target.value)}
                className="bg-secondary text-white border-secondary"
              >
                <option value="todos">Todos</option>
                <option value="disponibles">Con Stock</option>
                <option value="sinStock">Sin Stock</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <Button
              variant="outline-light"
              onClick={() => {
                setFiltro("");
                setFiltroMarca("");
                setFiltroDisponibilidad("todos");
              }}
              className="w-100"
            >
              <i className="bi bi-arrow-counterclockwise me-2"></i>Limpiar
            </Button>
          </div>
        </div>
        {/* --------------------------- */}

        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>Id</th>
              <th>Imagen</th>
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
            {/* --- USAR LISTA FILTRADA Y PAGINADA --- */}
            {repuestosPaginados.map((repuesto) => {
              const descripcionExpandida =
                descripcionesExpandidas[repuesto.idRepuesto];
              const descripcionCorta = repuesto.descripcion?.substring(0, 30);
              const necesitaExpansion = repuesto.descripcion?.length > 30;

              return (
                <tr key={repuesto.idRepuesto}>
                  <td>{repuesto.idRepuesto}</td>
                  {/* --- CELDA DE IMAGEN AÑADIDA --- */}
                  <td className="text-center align-middle">
                    <button
                      className="btn btn-sm me-2"
                      onClick={() => abrirModalImagen(repuesto)}
                      title="Ver imagen"
                    >
                      <img
                        src={repuesto.imagen || "invalid-url"}
                        alt={repuesto.nombre}
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
                  <td>{repuesto.nombre}</td>
                  <td>{repuesto.marca}</td>
                  <td>{repuesto.numeroParte}</td>
                  {/* --- PRECIO FORMATEADO --- */}
                  <td>
                    {currencyFormatter.format(parseFloat(repuesto.precio))}
                  </td>
                  <td>{repuesto.stock}</td>
                  <td style={{ maxWidth: "300px" }}>
                    <div
                      style={{
                        wordWrap: "break-word",
                        whiteSpace: descripcionExpandida
                          ? "pre-wrap"
                          : "normal",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                      }}
                    >
                      {necesitaExpansion ? (
                        <>
                          <span style={{ flex: 1 }}>
                            {descripcionExpandida
                              ? repuesto.descripcion
                              : descripcionCorta + "..."}
                          </span>
                          <button
                            className="btn btn-sm btn-link text-white p-0"
                            onClick={() =>
                              toggleDescripcion(repuesto.idRepuesto)
                            }
                            title={
                              descripcionExpandida ? "Contraer" : "Expandir"
                            }
                            style={{ flexShrink: 0 }}
                          >
                            <i
                              className={`bi bi-chevron-${descripcionExpandida ? "up" : "down"}`}
                            ></i>
                          </button>
                        </>
                      ) : (
                        <span>{repuesto.descripcion || "Sin descripción"}</span>
                      )}
                    </div>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-light"
                      onClick={() => abrirModal(repuesto)}
                      title="Editar"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginador */}
      {totalPaginas > 1 && (
        <PaginadorDarkie
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          cambiarPagina={cambiarPagina}
        />
      )}

      {/* Modal de descripción */}
      {mostrarModalDescripcion && repuestoSeleccionado && (
        <Modal
          show={mostrarModalDescripcion}
          onHide={cerrarModalDescripcion}
          centered
          size="md"
          dialogClassName="admin-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{repuestoSeleccionado.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {repuestoSeleccionado.descripcion || "Sin descripción disponible"}
            </p>
          </Modal.Body>
        </Modal>
      )}

      {/* Modal de imagen */}
      {mostrarModalImagen && repuestoSeleccionado && (
        <Modal
          show={mostrarModalImagen}
          onHide={cerrarModalImagen}
          centered
          size="lg"
          dialogClassName="admin-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="bi bi-image me-2"></i>
              Imagen de {repuestoSeleccionado.nombre}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            {repuestoSeleccionado.imagen ? (
              <img
                src={repuestoSeleccionado.imagen}
                alt={`${repuestoSeleccionado.nombre} ${repuestoSeleccionado.marca}`}
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
        </Modal>
      )}

      {/* Modal de edición */}
      {mostrarModal && repuestoSeleccionado && (
        <Modal
          show={mostrarModal}
          onHide={cerrarModal}
          centered
          dialogClassName="admin-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Editar Repuesto: {repuestoSeleccionado.nombre}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateRepuesto}>
              <div className="row">
                <div className="col-md-12 d-flex gap-2">
                  <Form.Group className="mb-3 w-50">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={repuestoSeleccionado.nombre}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 w-50">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                      type="text"
                      name="marca"
                      value={repuestoSeleccionado.marca}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 d-flex gap-2">
                  <Form.Group className="mb-3 w-50">
                    <Form.Label>Número de Parte</Form.Label>
                    <Form.Control
                      type="text"
                      name="numeroParte"
                      value={repuestoSeleccionado.numeroParte}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 w-50">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                      type="number"
                      name="precio"
                      value={repuestoSeleccionado.precio}
                      onChange={handleChange}
                      step="0.01" // Permitir decimales
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
                  value={repuestoSeleccionado.descripcion}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="row">
                <div className="col-md-12 d-flex gap-2">
                  <Form.Group className="mb-3 w-50">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      name="stock"
                      value={repuestoSeleccionado.stock}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 w-50">
                    <Form.Label>Imagen (URL)</Form.Label>
                    <Form.Control
                      type="text"
                      name="imagen"
                      value={repuestoSeleccionado.imagen || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>
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

export default TablaRepuestosAdmin;
