import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../css/repuestos.css";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import Paginador from "./Paginador";

const ITEMS_POR_PAGINA = 12;

const MainRepuestos = () => {
  const [repuestos, setRepuestos] = useState([]);
  const [selectedRepuesto, setSelectedRepuesto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cantidad, setCantidad] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Estados para filtros
  const [filtro, setFiltro] = useState("");
  const [marcaFiltro, setMarcaFiltro] = useState("");
  const [precioMax, setPrecioMax] = useState(100000000);
  const [rangosPrecio, setRangosPrecio] = useState({ min: 0, max: 100000000 });

  // Ordenamiento
  const [ordenamiento, setOrdenamiento] = useState("recientes");

  const fetchRepuestos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/repuestos/repuestos",
      );
      setRepuestos(response.data);

      // Calcular rangos automáticos basados en los datos
      if (response.data.length > 0) {
        const precios = response.data.map((r) => parseFloat(r.precio));
        const minPrecio = Math.min(...precios);
        const maxPrecio = Math.max(...precios);

        setRangosPrecio({ min: minPrecio, max: maxPrecio });
        setPrecioMax(maxPrecio);
      }
    } catch (error) {
      console.error("Error fetching repuestos:", error);
    }
  };

  useEffect(() => {
    fetchRepuestos();
  }, []);

  // Función para formatear el precio con puntos
  const formatPrice = (price) => {
    return Number(price)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Obtener marcas únicas para el filtro
  const marcasUnicas = [...new Set(repuestos.map((r) => r.marca))].sort();

  // Lógica de filtrado
  const repuestosFiltrados = repuestos.filter((repuesto) => {
    const marca = repuesto.marca || "";
    const nombre = repuesto.nombre || "";
    const filtroLower = filtro.toLowerCase();
    const precio = parseFloat(repuesto.precio);
    const stock = parseInt(repuesto.stock) || 0;

    // Filtro de stock - excluir productos sin stock
    const stockDisponible = stock > 0;

    // Filtro de búsqueda por texto (marca o nombre)
    const marcaNombreMatch =
      marca.toLowerCase().includes(filtroLower) ||
      nombre.toLowerCase().includes(filtroLower);

    // Filtro por marca específica (dropdown)
    const marcaMatch = marcaFiltro === "" || marca === marcaFiltro;

    // Filtro por precio máximo
    const precioMatch = precio <= precioMax;

    return stockDisponible && marcaNombreMatch && marcaMatch && precioMatch;
  });

  // Lógica de ordenamiento
  const repuestosOrdenados = [...repuestosFiltrados].sort((a, b) => {
    switch (ordenamiento) {
      case "precio-asc":
        return parseFloat(a.precio) - parseFloat(b.precio);
      case "precio-desc":
        return parseFloat(b.precio) - parseFloat(a.precio);
      case "nombre-asc":
        return a.nombre.localeCompare(b.nombre);
      case "nombre-desc":
        return b.nombre.localeCompare(a.nombre);
      case "recientes":
      default:
        return b.idRepuesto - a.idRepuesto;
    }
  });

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const cardsRef = useRef(null);
  const scrollPendienteRef = useRef(false);

  useEffect(() => {
    setPaginaActual(1);
  }, [filtro, marcaFiltro, precioMax, ordenamiento]);

  useEffect(() => {
    if (!scrollPendienteRef.current) return;
    scrollPendienteRef.current = false;
    cardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [paginaActual]);

  const cambiarPagina = (nuevaPagina) => {
    scrollPendienteRef.current = true;
    setPaginaActual(nuevaPagina);
  };

  const totalPaginas = Math.ceil(repuestosOrdenados.length / ITEMS_POR_PAGINA);
  const repuestosPaginados = repuestosOrdenados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltro("");
    setMarcaFiltro("");
    setPrecioMax(rangosPrecio.max);
    setOrdenamiento("recientes");
  };

  // Función para abrir el modal
  const openModal = (repuesto) => {
    setSelectedRepuesto(repuesto);
    setCantidad(0);
    setAddedToCart(false);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedRepuesto(null);
    setCantidad(0);
    setAddedToCart(false);
  };

  // Funciones de cantidad
  const incrementarCantidad = () => setCantidad((prev) => prev + 1);
  const decrementarCantidad = () => setCantidad((prev) => (prev > 0 ? prev - 1 : 0));

  // Agregar al carrito
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      closeModal();
      navigate("/login");
      return;
    }
    if (cantidad > 0 && selectedRepuesto) {
      addItem(selectedRepuesto, "repuesto", cantidad);
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
        closeModal();
      }, 800);
      setCantidad(0);
    }
  };

  return (
    <div className="repuestos-container">
      <h2 className="titulo-repuestos">Repuestos</h2>

      {/* Sección de Filtros */}
      <div className="filtros-container" ref={cardsRef}>
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
              placeholder="Marca o nombre..."
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
              <option value="nombre-asc">Nombre: A-Z</option>
              <option value="nombre-desc">Nombre: Z-A</option>
            </select>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="resultados-count">
          <i className="bi bi-tools"></i> {repuestosOrdenados.length}{" "}
          repuesto{repuestosOrdenados.length !== 1 ? "s" : ""} encontrado
          {repuestosOrdenados.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Grid de repuestos */}
      {repuestosOrdenados.length === 0 ? (
        <div className="no-results">
          <i className="bi bi-exclamation-circle"></i>
          <h3>No se encontraron repuestos</h3>
          <p>Intenta ajustar los filtros para ver más resultados</p>
        </div>
      ) : (
        <>
        <div className="card-repuestos-container">
          {repuestosPaginados.map((repuesto) => (
            <div className="card-repuestos" key={repuesto.idRepuesto}>
              <div className="card-image-wrapper">
                <img
                  src={repuesto.imagen}
                  alt={repuesto.nombre}
                  className="foto-card-repuestos"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/400x300/333/fff?text=Sin+Imagen";
                  }}
                />
                <div className="card-badge-marca">{repuesto.marca}</div>
              </div>

              <div className="body-card-repuestos">
                <h5 className="titulo-card-repuestos">{repuesto.nombre}</h5>

                <p className="precio-card-repuestos">
                  <span className="precio-label">Precio:</span>
                  <span className="precio-valor">
                    ARS ${formatPrice(repuesto.precio)}
                  </span>
                </p>

                <button
                  onClick={() => openModal(repuesto)}
                  className="btn-repuestos"
                >
                  <i className="bi bi-info-circle me-2"></i>
                  Ver Información
                </button>
              </div>
            </div>
          ))}
        </div>        <Paginador
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          cambiarPagina={cambiarPagina}
        />
        </>      )}


      {/* Modal de Repuestos */}
      {showModal && selectedRepuesto && (
        <div className="modal-overlay-repuestos" onClick={closeModal}>
          <div
            className="modal-content-repuestos"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-repuestos" onClick={closeModal}>
              &times;
            </button>

            <div className="modal-body-repuestos">
              <div className="modal-image-section-repuestos">
                <img
                  src={selectedRepuesto.imagen}
                  alt={selectedRepuesto.nombre}
                  className="modal-repuesto-imagen"
                />
              </div>

              <div className="modal-info-section-repuestos">
                <h2 className="modal-repuesto-title">
                  {selectedRepuesto.nombre}
                </h2>

                <div className="modal-repuesto-details">
                  <div className="detail-item-repuestos">
                    <span className="detail-label-repuestos">Marca:</span>
                    <span className="detail-value-repuestos">
                      {selectedRepuesto.marca}
                    </span>
                  </div>

                  <div className="detail-item-repuestos">
                    <span className="detail-label-repuestos">
                      Número de Parte:
                    </span>
                    <span className="detail-value-repuestos">
                      {selectedRepuesto.numeroParte}
                    </span>
                  </div>

                  <div className="detail-item-repuestos">
                    <span className="detail-label-repuestos">Descripción:</span>
                    <p className="detail-description-repuestos">
                      {selectedRepuesto.descripcion}
                    </p>
                  </div>

                  <div className="detail-item-repuestos detail-price-repuestos">
                    <span className="detail-label-repuestos">Precio:</span>
                    <span className="detail-value-price-repuestos">
                      ARS ${formatPrice(selectedRepuesto.precio)}
                    </span>
                  </div>
                </div>

                {/* Agregar al carrito */}
                <div className="modal-cart-section">
                  <label className="cart-section-label">Agregar al carrito:</label>
                  <div className="modal-cart-controls">
                    <div className="modal-qty-controls">
                      <button
                        className="modal-qty-btn"
                        onClick={decrementarCantidad}
                        disabled={cantidad === 0}
                      >
                        -
                      </button>
                      <span className="modal-qty-value">{cantidad}</span>
                      <button className="modal-qty-btn" onClick={incrementarCantidad}>
                        +
                      </button>
                    </div>
                    <button
                      className={`btn-add-cart ${addedToCart ? "added" : ""}`}
                      onClick={handleAddToCart}
                      disabled={cantidad === 0}
                    >
                      {addedToCart ? "Agregado ✓" : "Agregar al carrito"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainRepuestos;
