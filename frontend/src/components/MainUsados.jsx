import axios from "axios";
import { useEffect, useState } from "react";
import "../css/mainusados.css";
import { Link } from "react-router-dom";

const MainUsados = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Estados para filtros
  const [filtro, setFiltro] = useState("");
  const [marcaFiltro, setMarcaFiltro] = useState("");
  const [precioMax, setPrecioMax] = useState(100000000);
  const [kilometrajeMax, setKilometrajeMax] = useState(500000);
  const [anioMin, setAnioMin] = useState(1990);
  const [rangosPrecio, setRangosPrecio] = useState({ min: 0, max: 100000000 });
  const [rangosKilometraje, setRangosKilometraje] = useState({ min: 0, max: 500000 });
  const [rangosAnio, setRangosAnio] = useState({ min: 1990, max: new Date().getFullYear() });

  // Ordenamiento
  const [ordenamiento, setOrdenamiento] = useState("recientes");

  const fetchVehiculos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/vehiculos-usados",
      );
      setVehiculos(response.data);

      // Calcular rangos automáticos basados en los datos
      if (response.data.length > 0) {
        const precios = response.data.map((v) => parseFloat(v.precio));
        const kilometrajes = response.data.map((v) => parseFloat(v.kilometraje));
        const anios = response.data.map((v) => parseInt(v.anio));

        const minPrecio = Math.min(...precios);
        const maxPrecio = Math.max(...precios);
        const minKm = Math.min(...kilometrajes);
        const maxKm = Math.max(...kilometrajes);
        const minAnio = Math.min(...anios);
        const maxAnio = Math.max(...anios);

        setRangosPrecio({ min: minPrecio, max: maxPrecio });
        setRangosKilometraje({ min: minKm, max: maxKm });
        setRangosAnio({ min: minAnio, max: maxAnio });
        setPrecioMax(maxPrecio);
        setKilometrajeMax(maxKm);
        setAnioMin(minAnio);
      }
    } catch (error) {
      console.error("Error fetching vehiculos:", error);
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  // Función para formatear el precio con puntos
  const formatPrice = (price) => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Obtener marcas únicas para el filtro
  const marcasUnicas = [...new Set(vehiculos.map((v) => v.marca))].sort();

  // Lógica de filtrado
  const vehiculosFiltrados = vehiculos.filter((vehiculo) => {
    const marca = vehiculo.marca || "";
    const modelo = vehiculo.modelo || "";
    const filtroLower = filtro.toLowerCase();
    const precio = parseFloat(vehiculo.precio);
    const kilometraje = parseFloat(vehiculo.kilometraje);
    const anio = parseInt(vehiculo.anio);

    // Filtro de búsqueda por texto (marca o modelo)
    const marcaModeloMatch =
      marca.toLowerCase().includes(filtroLower) ||
      modelo.toLowerCase().includes(filtroLower);

    // Filtro por marca específica (dropdown)
    const marcaMatch = marcaFiltro === "" || marca === marcaFiltro;

    // Filtro por precio máximo
    const precioMatch = precio <= precioMax;

    // Filtro por kilometraje máximo
    const kilometrajeMatch = kilometraje <= kilometrajeMax;

    // Filtro por año mínimo
    const anioMatch = anio >= anioMin;

    return marcaModeloMatch && marcaMatch && precioMatch && kilometrajeMatch && anioMatch;
  });

  // Lógica de ordenamiento
  const vehiculosOrdenados = [...vehiculosFiltrados].sort((a, b) => {
    switch (ordenamiento) {
      case "precio-asc":
        return parseFloat(a.precio) - parseFloat(b.precio);
      case "precio-desc":
        return parseFloat(b.precio) - parseFloat(a.precio);
      case "km-asc":
        return parseFloat(a.kilometraje) - parseFloat(b.kilometraje);
      case "km-desc":
        return parseFloat(b.kilometraje) - parseFloat(a.kilometraje);
      case "anio-asc":
        return parseInt(a.anio) - parseInt(b.anio);
      case "anio-desc":
        return parseInt(b.anio) - parseInt(a.anio);
      case "recientes":
      default:
        return b.idVehiculoUsado - a.idVehiculoUsado;
    }
  });

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltro("");
    setMarcaFiltro("");
    setPrecioMax(rangosPrecio.max);
    setKilometrajeMax(rangosKilometraje.max);
    setAnioMin(rangosAnio.min);
    setOrdenamiento("recientes");
  };

  // Función para abrir el modal
  const openModal = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedVehiculo(null);
  };

  return (
    <>
      <div className="usados-main-container">
        <h2 className="titulo-usados">Vehículos Usados</h2>

        {/* Sección de Filtros */}
        <div className="filtros-container">
          <div className="filtros-header">
            <h3>
              <i className="bi bi-funnel"></i> Filtros
            </h3>
            <button className="btn-limpiar-filtros" onClick={limpiarFiltros}>
              <i className="bi bi-arrow-counterclockwise"></i> Limpiar
            </button>
          </div>

          <div className="filtros-grid">
            {/* Búsqueda por texto */}
            <div className="filtro-item">
              <label>
                <i className="bi bi-search"></i> Buscar
              </label>
              <input
                type="text"
                placeholder="Marca o modelo..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="filtro-input"
              />
            </div>

            {/* Filtro por marca */}
            <div className="filtro-item">
              <label>
                <i className="bi bi-tag"></i> Marca
              </label>
              <select
                value={marcaFiltro}
                onChange={(e) => setMarcaFiltro(e.target.value)}
                className="filtro-select"
              >
                <option value="">Todas las marcas</option>
                {marcasUnicas.map((marca) => (
                  <option key={marca} value={marca}>
                    {marca}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por precio */}
            <div className="filtro-item filtro-range">
              <label>
                <i className="bi bi-currency-dollar"></i> Precio máximo:{" "}
                <span className="filtro-value">ARS ${formatPrice(precioMax)}</span>
              </label>
              <input
                type="range"
                min={rangosPrecio.min}
                max={rangosPrecio.max}
                value={precioMax}
                onChange={(e) => setPrecioMax(parseFloat(e.target.value))}
                className="filtro-slider"
              />
              <div className="filtro-range-labels">
                <span>${formatPrice(rangosPrecio.min)}</span>
                <span>${formatPrice(rangosPrecio.max)}</span>
              </div>
            </div>

            {/* Filtro por kilometraje */}
            <div className="filtro-item filtro-range">
              <label>
                <i className="bi bi-speedometer2"></i> Kilometraje máximo:{" "}
                <span className="filtro-value">
                  {kilometrajeMax.toLocaleString("es-AR")} km
                </span>
              </label>
              <input
                type="range"
                min={rangosKilometraje.min}
                max={rangosKilometraje.max}
                value={kilometrajeMax}
                onChange={(e) => setKilometrajeMax(parseFloat(e.target.value))}
                className="filtro-slider"
              />
              <div className="filtro-range-labels">
                <span>{rangosKilometraje.min.toLocaleString("es-AR")} km</span>
                <span>{rangosKilometraje.max.toLocaleString("es-AR")} km</span>
              </div>
            </div>

            {/* Filtro por año */}
            <div className="filtro-item filtro-range">
              <label>
                <i className="bi bi-calendar"></i> Año mínimo:{" "}
                <span className="filtro-value">{anioMin}</span>
              </label>
              <input
                type="range"
                min={rangosAnio.min}
                max={rangosAnio.max}
                value={anioMin}
                onChange={(e) => setAnioMin(parseInt(e.target.value))}
                className="filtro-slider"
              />
              <div className="filtro-range-labels">
                <span>{rangosAnio.min}</span>
                <span>{rangosAnio.max}</span>
              </div>
            </div>

            {/* Ordenamiento */}
            <div className="filtro-item">
              <label>
                <i className="bi bi-sort-down"></i> Ordenar por
              </label>
              <select
                value={ordenamiento}
                onChange={(e) => setOrdenamiento(e.target.value)}
                className="filtro-select"
              >
                <option value="recientes">Más recientes</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="km-asc">Kilometraje: menor a mayor</option>
                <option value="km-desc">Kilometraje: mayor a menor</option>
                <option value="anio-asc">Año: más antiguos</option>
                <option value="anio-desc">Año: más recientes</option>
              </select>
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="resultados-count">
            <i className="bi bi-car-front"></i> {vehiculosOrdenados.length}{" "}
            vehículo{vehiculosOrdenados.length !== 1 ? "s" : ""} encontrado
            {vehiculosOrdenados.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Grid de vehículos */}
        {vehiculosOrdenados.length === 0 ? (
          <div className="no-results">
            <i className="bi bi-exclamation-circle"></i>
            <h3>No se encontraron vehículos</h3>
            <p>Intenta ajustar los filtros para ver más resultados</p>
          </div>
        ) : (
          <div className="card-usados-container">
            {vehiculosOrdenados.map((vehiculo) => (
              <div className="card-usados" key={vehiculo.idVehiculoUsado}>
                <div className="card-image-wrapper">
                  <img
                    src={vehiculo.imagen}
                    className="card-usados-img-top"
                    alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/400x300/333/fff?text=Sin+Imagen";
                    }}
                  />
                  <div className="card-badges">
                    <span className="badge badge-year">
                      <i className="bi bi-calendar3"></i> {vehiculo.anio}
                    </span>
                    <span className="badge badge-km">
                      <i className="bi bi-speedometer2"></i>{" "}
                      {parseFloat(vehiculo.kilometraje).toLocaleString("es-AR")}{" "}
                      km
                    </span>
                  </div>
                </div>

                <div className="card-usados-body">
                  <div className="card-marca">{vehiculo.marca}</div>
                  <h5 className="card-usados-title">{vehiculo.modelo}</h5>

                  <div className="card-details">
                    <div className="detail-chip">
                      <i className="bi bi-calendar"></i>
                      <span>{vehiculo.anio}</span>
                    </div>
                    <div className="detail-chip">
                      <i className="bi bi-speedometer"></i>
                      <span>
                        {parseFloat(vehiculo.kilometraje).toLocaleString("es-AR")}{" "}
                        km
                      </span>
                    </div>
                  </div>

                  <p className="card-usados-text">
                    <span className="precio-label">Precio:</span>
                    <span className="precio-valor">
                      ARS ${formatPrice(vehiculo.precio)}
                    </span>
                  </p>

                  <button
                    onClick={() => openModal(vehiculo)}
                    className="btn-usados"
                  >
                    <i className="bi bi-info-circle me-2"></i>
                    Ver más información
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedVehiculo && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content-usados"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>

            <div className="modal-body-usados">
              <div className="modal-image-section">
                <img
                  src={selectedVehiculo.imagen}
                  alt={`${selectedVehiculo.marca} ${selectedVehiculo.modelo}`}
                  className="modal-vehiculo-imagen"
                />
              </div>

              <div className="modal-info-section">
                <h2 className="modal-vehiculo-title">
                  {selectedVehiculo.marca} {selectedVehiculo.modelo}
                </h2>

                <div className="modal-vehiculo-details">
                  <div className="detail-item">
                    <span className="detail-label">Año:</span>
                    <span className="detail-value">
                      {selectedVehiculo.anio}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Kilometraje:</span>
                    <span className="detail-value">
                      {selectedVehiculo.kilometraje} km
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Descripción:</span>
                    <p className="detail-description">
                      {selectedVehiculo.descripcion}
                    </p>
                  </div>

                  <div className="detail-item detail-price">
                    <span className="detail-label">Precio:</span>
                    <span className="detail-value-price">
                      ARS ${formatPrice(selectedVehiculo.precio)}
                    </span>
                  </div>
                </div>

                <Link to="/contacto" className="btn-modal-contacto text-center">
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainUsados;
