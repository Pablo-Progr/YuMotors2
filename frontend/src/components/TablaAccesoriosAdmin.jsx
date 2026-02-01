import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import Paginador from "./Paginador";
// Importar 'bootstrap.min.css' aquí si es necesario en tu proyecto
// import "bootstrap/dist/css/bootstrap.min.css";
import "../css/modalAdmin.css"; // Import styles

const TablaAccesoriosAdmin = () => {
  const [accesorios, setAccesorios] = useState([]);
  const [accesorioSeleccionado, setAccesorioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mostrarModalImagen, setMostrarModalImagen] = useState(false);
  const [mostrarModalDescripcion, setMostrarModalDescripcion] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 7;
  const [descripcionesExpandidas, setDescripcionesExpandidas] = useState({});

  const toggleDescripcion = (idAccesorio) => {
    setDescripcionesExpandidas((prev) => ({
      ...prev,
      [idAccesorio]: !prev[idAccesorio],
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

  const fetchAccesorios = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/accesorios/accesorios",
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
          `http://localhost:3000/api/accesorios/eliminar/${id}`,
        );
        setAccesorios(
          accesorios.filter((accesorio) => accesorio.idAccesorio !== id),
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
        accesorioSeleccionado,
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
  const accesoriosFiltrados = accesorios
    .filter((accesorio) => {
      const filtroLower = filtro.toLowerCase();
      const nombreMatch = (accesorio.nombre || "")
        .toLowerCase()
        .includes(filtroLower);
      const marcaMatch = (accesorio.marca || "")
        .toLowerCase()
        .includes(filtroLower);

      // Filtro por búsqueda de texto
      const textoMatch = nombreMatch || marcaMatch;

      // Filtro por marca
      const filtroMarcaMatch =
        filtroMarca === "" || accesorio.marca === filtroMarca;

      // Filtro por disponibilidad
      let disponibilidadMatch = true;
      if (filtroDisponibilidad === "disponibles") {
        disponibilidadMatch = accesorio.stock > 0;
      } else if (filtroDisponibilidad === "sinStock") {
        disponibilidadMatch = accesorio.stock === 0;
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
  const marcasUnicas = [...new Set(accesorios.map((a) => a.marca))]
    .filter(Boolean)
    .sort();

  // --- LÓGICA DE PAGINACIÓN ---
  const indiceUltimo = paginaActual * itemsPorPagina;
  const indicePrimero = indiceUltimo - itemsPorPagina;
  const accesoriosPaginados = accesoriosFiltrados.slice(
    indicePrimero,
    indiceUltimo,
  );
  const totalPaginas = Math.ceil(accesoriosFiltrados.length / itemsPorPagina);

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
                placeholder="Nombre o Marca"
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
            {/* --- USAR LISTA FILTRADA Y PAGINADA --- */}
            {accesoriosPaginados.map((accesorio) => {
              const descripcionExpandida =
                descripcionesExpandidas[accesorio.idAccesorio];
              const descripcionCorta = accesorio.descripcion?.substring(0, 30);
              const necesitaExpansion = accesorio.descripcion?.length > 30;

              return (
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
                              ? accesorio.descripcion
                              : descripcionCorta + "..."}
                          </span>
                          <button
                            className="btn btn-sm btn-link text-white p-0"
                            onClick={() =>
                              toggleDescripcion(accesorio.idAccesorio)
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
                        <span>
                          {accesorio.descripcion || "Sin descripción"}
                        </span>
                      )}
                    </div>
                  </td>
                  {/* --- PRECIO FORMATEADO --- */}
                  <td>
                    {currencyFormatter.format(parseFloat(accesorio.precio))}
                  </td>
                  <td>{accesorio.stock}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-light"
                      onClick={() => abrirModal(accesorio)}
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
        <Paginador
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          cambiarPagina={cambiarPagina}
        />
      )}

      {/* Modal de descripción */}
      {mostrarModalDescripcion && accesorioSeleccionado && (
        <Modal
          show={mostrarModalDescripcion}
          onHide={cerrarModalDescripcion}
          centered
          size="md"
          dialogClassName="admin-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{accesorioSeleccionado.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {accesorioSeleccionado.descripcion ||
                "Sin descripción disponible"}
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
          dialogClassName="admin-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="bi bi-image me-2"></i>
              Imagen de {accesorioSeleccionado.nombre}{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
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
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModalImagen}>
              <i className="bi bi-x-circle me-2"></i>Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal de edición */}
      {/* Corregido el typo 'syze' a 'size' y añadido estilo a inputs */}
      {mostrarModal && accesorioSeleccionado && (
        <Modal
          show={mostrarModal}
          onHide={cerrarModal}
          centered
          size="lg"
          dialogClassName="admin-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Editar Accesorio: {accesorioSeleccionado.nombre}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="w-100">
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
