import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/modalAdmin.css"; // Import styles

const TablaVehiculosAdmin = ({ refreshTrigger }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalImagen, setMostrarModalImagen] = useState(false);
  const [mostrarModalDescripcion, setMostrarModalDescripcion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState("");
  
  // Estados para filtros avanzados
  const [marcaFiltro, setMarcaFiltro] = useState("");
  const [precioMax, setPrecioMax] = useState(100000000); // Precio inicial alto
  const [kilometrajeMax, setKilometrajeMax] = useState(500000); // Kilometraje inicial alto
  const [rangosPrecio, setRangosPrecio] = useState({ min: 0, max: 100000000 });
  const [rangosKilometraje, setRangosKilometraje] = useState({ min: 0, max: 500000 });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // --- FORMATEADOR DE MONEDA ---
  const currencyFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  // -----------------------------

  const fetchVehiculos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/vehiculos-usados"
      );
      setVehiculos(response.data);
      
      // Calcular rangos automáticos basados en los datos
      if (response.data.length > 0) {
        const precios = response.data.map(v => parseFloat(v.precio));
        const kilometrajes = response.data.map(v => parseFloat(v.kilometraje));
        
        const minPrecio = Math.min(...precios);
        const maxPrecio = Math.max(...precios);
        const minKm = Math.min(...kilometrajes);
        const maxKm = Math.max(...kilometrajes);
        
        setRangosPrecio({ min: minPrecio, max: maxPrecio });
        setRangosKilometraje({ min: minKm, max: maxKm });
        setPrecioMax(maxPrecio);
        setKilometrajeMax(maxKm);
      }
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

  const abrirModalDescripcion = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setMostrarModalDescripcion(true);
  };

  const cerrarModalDescripcion = () => {
    setVehiculoSeleccionado(null);
    setMostrarModalDescripcion(false);
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

  // Lógica de filtrado múltiple
  const vehiculosFiltrados = vehiculos.filter((vehiculo) => {
    const marca = vehiculo.marca || "";
    const modelo = vehiculo.modelo || "";
    const filtroLower = filtro.toLowerCase();
    const precio = parseFloat(vehiculo.precio);
    const kilometraje = parseFloat(vehiculo.kilometraje);

    // Filtro de búsqueda por texto (marca o modelo)
    const marcaModeloMatch = marca.toLowerCase().includes(filtroLower) || 
                             modelo.toLowerCase().includes(filtroLower);

    // Filtro por marca específica (dropdown)
    const marcaMatch = marcaFiltro === "" || marca === marcaFiltro;

    // Filtro por precio máximo
    const precioMatch = precio <= precioMax;

    // Filtro por kilometraje máximo
    const kilometrajeMatch = kilometraje <= kilometrajeMax;

    return marcaModeloMatch && marcaMatch && precioMatch && kilometrajeMatch;
  });

  // Obtener marcas únicas para el filtro
  const marcasUnicas = [...new Set(vehiculos.map(v => v.marca))].sort();

  return (
    <>
      <div className="mb-3">
        <Button
          variant={mostrarFiltros ? "outline-light" : "light"}
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="d-flex align-items-center"
        >
          <i className={`bi bi-funnel-fill me-2`}></i>
          {mostrarFiltros ? "Ocultar Filtros" : "Mostrar Filtros"}
          <i className={`bi bi-chevron-${mostrarFiltros ? "up" : "down"} ms-2`}></i>
        </Button>
      </div>

      <div className="row">
        {/* Sidebar de Filtros */}
        {mostrarFiltros && (
          <div className="col-lg-3 col-md-4 mb-3">
            <div className="bg-dark p-3 rounded border border-secondary">
              <h5 className="text-white mb-3">
                <i className="bi bi-funnel-fill me-2"></i>Filtros
              </h5>
              
              {/* Búsqueda por texto */}
              <Form.Group className="mb-3">
                <Form.Label className="text-white">
                  <i className="bi bi-search me-2"></i>Buscar
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Marca o modelo..."
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  className="bg-secondary text-white border-secondary"
                />
              </Form.Group>

              <hr className="text-white-50" />

              {/* Filtro por marca específica */}
              <Form.Group className="mb-3">
                <Form.Label className="text-white">
                  <i className="bi bi-tag me-2"></i>Marca
                </Form.Label>
                <Form.Select
                  value={marcaFiltro}
                  onChange={(e) => setMarcaFiltro(e.target.value)}
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

              <hr className="text-white-50" />

              {/* Filtro por precio */}
              <Form.Group className="mb-3">
                <Form.Label className="text-white">
                  <i className="bi bi-currency-dollar me-2"></i>Precio máximo
                </Form.Label>
                <div className="text-white fw-bold mb-2">
                  {currencyFormatter.format(precioMax)}
                </div>
                <Form.Range
                  min={rangosPrecio.min}
                  max={rangosPrecio.max}
                  value={precioMax}
                  onChange={(e) => setPrecioMax(parseFloat(e.target.value))}
                  className="custom-range"
                />
                <div className="d-flex justify-content-between text-white-50 small">
                  <span>{currencyFormatter.format(rangosPrecio.min)}</span>
                  <span>{currencyFormatter.format(rangosPrecio.max)}</span>
                </div>
              </Form.Group>

              <hr className="text-white-50" />

              {/* Filtro por kilometraje */}
              <Form.Group className="mb-3">
                <Form.Label className="text-white">
                  <i className="bi bi-speedometer2 me-2"></i>Kilometraje máx.
                </Form.Label>
                <div className="text-white fw-bold mb-2">
                  {kilometrajeMax.toLocaleString()} km
                </div>
                <Form.Range
                  min={rangosKilometraje.min}
                  max={rangosKilometraje.max}
                  value={kilometrajeMax}
                  onChange={(e) => setKilometrajeMax(parseFloat(e.target.value))}
                  className="custom-range"
                />
                <div className="d-flex justify-content-between text-white-50 small">
                  <span>{rangosKilometraje.min.toLocaleString()}</span>
                  <span>{rangosKilometraje.max.toLocaleString()}</span>
                </div>
              </Form.Group>

              {/* Contador de resultados */}
              <div className="mt-3 p-2 bg-secondary rounded text-center">
                <small className="text-white-50">Resultados encontrados:</small>
                <div className="text-white fw-bold fs-5">{vehiculosFiltrados.length}</div>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de Vehículos */}
        <div className={mostrarFiltros ? "col-lg-9 col-md-8" : "col-12"}>
      <div className="table-responsive p-3 rounded">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              {/* --- COLUMNA DE IMAGEN AÑADIDA --- */}
              <th className="text-center">Imagen</th>
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
            {vehiculosFiltrados.map((vehiculo) => (
              <tr key={vehiculo.idVehiculoUsado}>
                {/* --- CELDA DE IMAGEN AÑADIDA --- */}
                <td className="text-center align-middle">
                  <button                     className="btn btn-sm me-2"
                    onClick={() => abrirModalImagen(vehiculo)}
                    title="Ver imagen">
                  <img
                    // Si vehiculo.imagen existe, úsalo. Si no, usa un string inválido para forzar el 'onError'
                    src={vehiculo.imagen || 'invalid-url'}
                    alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                    className="rounded"
                    style={{
                      width: '80px',
                      height: '60px',
                      objectFit: 'cover',
                      border: '1px solid #495057'
                    }}
                    // 'onError' se dispara si la URL es nula, vacía, o es un enlace roto
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/80x60/495057/dee2e6?text=Sin+Foto';
                      e.currentTarget.onerror = null; // Previene bucles infinitos si el placeholder también falla
                    }}
                  />
                  </button>
                </td>
                {/* ------------------------------- */}
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.anio}</td>
                <td>{vehiculo.kilometraje} km</td>
                <td className="text-center">
                  {vehiculo.descripcion ? (
                    <button
                      className="btn btn-sm btn-outline-light"
                      onClick={() => abrirModalDescripcion(vehiculo)}
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
                  {currencyFormatter.format(parseFloat(vehiculo.precio))}
                </td>
                {/* ------------------------- */}
                <td className="text-end">

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
        </div>
      </div>

      {/* Modal de descripción */}
      {mostrarModalDescripcion && vehiculoSeleccionado && (
        <Modal
          show={mostrarModalDescripcion}
          onHide={cerrarModalDescripcion}
          centered
          size="md"
          dialogClassName="admin-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {vehiculoSeleccionado.marca}{" "}
              {vehiculoSeleccionado.modelo}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {vehiculoSeleccionado.descripcion || "Sin descripción disponible"}
            </p>
          </Modal.Body>
        </Modal>
      )}

      {/* Modal de imagen */}
      {mostrarModalImagen && vehiculoSeleccionado && (
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
              Imagen de {vehiculoSeleccionado.marca}{" "}
              {vehiculoSeleccionado.modelo}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            {vehiculoSeleccionado.imagen ? (
              <img
                src={vehiculoSeleccionado.imagen}
                alt={`${vehiculoSeleccionado.marca} ${vehiculoSeleccionado.modelo}`}
                className="img-fluid rounded"
                style={{ maxHeight: "500px" }}
                // Placeholder por si falla la imagen grande en el modal
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x400/495057/dee2e6?text=Imagen+no+disponible';
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.maxHeight = '400px';
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
      {mostrarModalEditar && vehiculoSeleccionado && (
        <Modal
          show={mostrarModalEditar}
          onHide={cerrarModalEditar}
          centered
          size="lg"
          dialogClassName="admin-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="bi bi-pencil-square me-2"></i>
              Editar Vehículo: {vehiculoSeleccionado.marca}{" "}
              {vehiculoSeleccionado.modelo}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateVehiculo}>
              <div className="row">
                <div className="col-md-5">
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
                      value={vehiculoSeleccionado.modelo}
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
                      value={vehiculoSeleccionado.anio}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-5">
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
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10">
                  <Form.Group className="mb-3 ">
                    <Form.Label>
                      <i className="bi bi-card-text me-2"></i>Descripción
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="descripcion"
                      value={vehiculoSeleccionado.descripcion || ""}
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
                      value={vehiculoSeleccionado.precio}
                      onChange={handleChange}
                      required
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
                      value={vehiculoSeleccionado.imagen || ""}
                      onChange={handleChange}
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