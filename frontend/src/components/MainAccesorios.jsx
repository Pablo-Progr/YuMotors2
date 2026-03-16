import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "../css/accesorios.css";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import Paginador from "./Paginador";

const ITEMS_POR_PAGINA = 12; // pablo: creo que 12 esta bien, porque cada card es grande, si fueran 15 o mas el user tendria que escrollear mucho para llegar al final.

const MainAccesorios = () => {
  const [accesorios, setAccesorios] = useState([]);
  const [selectedAccesorio, setSelectedAccesorio] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cantidad, setCantidad] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // pablo: estados para los filtros:
  const [filtro, setFiltro] = useState("");
  const [marcaFiltro, setMarcaFiltro] = useState("");
  const [precioMax, setPrecioMax] = useState(100000000);
  const [rangosPrecio, setRangosPrecio] = useState({ min: 0, max: 100000000 });


  const [ordenamiento, setOrdenamiento] = useState("recientes");

  const fetchAccesorios = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/accesorios/accesorios",
      );
      setAccesorios(response.data);

      // pablo: esto pone el rango de los filtros segun los datos que ya hay en la base de datos (precio, mas que nada)
      if (response.data.length > 0) {
        const precios = response.data.map((a) => parseFloat(a.precio));
        const minPrecio = Math.min(...precios);
        const maxPrecio = Math.max(...precios);

        setRangosPrecio({ min: minPrecio, max: maxPrecio });
        setPrecioMax(maxPrecio);
      }
    } catch (error) {
      console.error("Error fetching accesorios:", error);
    }
  };

  useEffect(() => {
    fetchAccesorios();
  }, []);


  const formatPrice = (price) => {
    return Number(price)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Giuliano: ??????
  };


  const marcasUnicas = [...new Set(accesorios.map((a) => a.marca))].sort();


  const accesoriosFiltrados = accesorios.filter((accesorio) => {
    const marca = accesorio.marca || "";
    const nombre = accesorio.nombre || "";
    const filtroLower = filtro.toLowerCase();
    const precio = parseFloat(accesorio.precio);
    const stock = parseInt(accesorio.stock) || 0;


    const stockDisponible = stock > 0;


    const marcaNombreMatch =
      marca.toLowerCase().includes(filtroLower) ||
      nombre.toLowerCase().includes(filtroLower);

    const marcaMatch = marcaFiltro === "" || marca === marcaFiltro;


    const precioMatch = precio <= precioMax;

    return stockDisponible && marcaNombreMatch && marcaMatch && precioMatch;
  });

  // Giuliano para Jeremias: aca hay algo que no esta funcionando  bien, fijate con pablo. | Jeremias: listo.
  const accesoriosOrdenados = [...accesoriosFiltrados].sort((a, b) => {
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
        return b.idAccesorio - a.idAccesorio;
    }
  });

  // giuliano: esto es para que cuando cambias un filtro, se resetee la pagina de vuelta a la primera en la interfaz, error comun.
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

  const totalPaginas = Math.ceil(accesoriosOrdenados.length / ITEMS_POR_PAGINA);
  const accesoriosPaginados = accesoriosOrdenados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );


  const limpiarFiltros = () => {
    setFiltro("");
    setMarcaFiltro("");
    setPrecioMax(rangosPrecio.max);
    setOrdenamiento("recientes");
  };

  // Giuliano: abro modal
  const openModal = (accesorio) => {
    setSelectedAccesorio(accesorio);
    setCantidad(0);
    setAddedToCart(false);
    setShowModal(true);
  };

  // Giuliano: cierro modal.
  const closeModal = () => {
    setShowModal(false);
    setSelectedAccesorio(null);
    setCantidad(0);
    setAddedToCart(false);
  };

  // Funciones de cantidad
  const incrementarCantidad = () => setCantidad((prev) => prev + 1);
  const decrementarCantidad = () => setCantidad((prev) => (prev > 0 ? prev - 1 : 0));

  // Pablo: handle de añadir a carrito un producto, si no esta logeado lo mando al login.
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      closeModal();
      navigate("/login");
      return;
    }
    if (cantidad > 0 && selectedAccesorio) {
      addItem(selectedAccesorio, "accesorio", cantidad);
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
        closeModal();
      }, 800);
      setCantidad(0);
    }
  };

  return (
    <>
      <div className="accesorios-container">
        <h2 className="titulo-accesorios">Accesorios</h2>

        {/* FILTROS */}
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
            {/* BUSQUEDA POR TEXTO */}
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
          <div className="resultados-count">
            <i className="bi bi-gear"></i> {accesoriosOrdenados.length}{" "}
            accesorio{accesoriosOrdenados.length !== 1 ? "s" : ""} encontrado
            {accesoriosOrdenados.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* CARDS DE ACCESORIOS */}
        {accesoriosOrdenados.length === 0 ? (
          <div className="no-results">
            <i className="bi bi-exclamation-circle"></i>
            <h3>No se encontraron accesorios</h3>
            <p>Intenta ajustar los filtros para ver más resultados</p>
          </div>
        ) : (
          <>
          <div className="card-accesorios-container">
            {accesoriosPaginados.map((accesorio) => (
              <div className="card-accesorios" key={accesorio.idAccesorio}>
                <div className="card-image-wrapper">
                  <img
                    src={accesorio.imagen}
                    className="foto-card-accesorios"
                    alt={accesorio.nombre}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/400x300/333/fff?text=Sin+Imagen";
                    }}
                  />
                  <div className="card-badge-marca">{accesorio.marca}</div>
                </div>

                <div className="body-card-accesorios">
                  <h5 className="titulo-card-accesorios">{accesorio.nombre}</h5>

                  <p className="precio-card-accesorios">
                    <span className="precio-label">Precio:</span>
                    <span className="precio-valor">
                      ARS ${formatPrice(accesorio.precio)}
                    </span>
                  </p>

                  <button
                    onClick={() => openModal(accesorio)}
                    className="btn-accesorios"
                  >
                    <i className="bi bi-info-circle me-2"></i>
                    Ver Información
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Paginador
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            cambiarPagina={cambiarPagina}
          />
          </>
        )}
      </div>

      {/* Modal de Accesorios */}
      {showModal && selectedAccesorio && (
        <div className="modal-overlay-accesorios" onClick={closeModal}>
          <div
            className="modal-content-accesorios"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-accesorios" onClick={closeModal}>
              &times;
            </button>

            <div className="modal-body-accesorios">
              <div className="modal-image-section-accesorios">
                <img
                  src={selectedAccesorio.imagen}
                  alt={selectedAccesorio.nombre}
                  className="modal-accesorio-imagen"
                />
              </div>

              <div className="modal-info-section-accesorios">
                <h2 className="modal-accesorio-title">
                  {selectedAccesorio.nombre}
                </h2>

                <div className="modal-accesorio-details">
                  <div className="detail-item-accesorios">
                    <span className="detail-label-accesorios">Marca:</span>
                    <span className="detail-value-accesorios">
                      {selectedAccesorio.marca}
                    </span>
                  </div>

                  <div className="detail-item-accesorios">
                    <span className="detail-label-accesorios">
                      Descripción:
                    </span>
                    <p className="detail-description-accesorios">
                      {selectedAccesorio.descripcion}
                    </p>
                  </div>

                  <div className="detail-item-accesorios detail-price-accesorios">
                    <span className="detail-label-accesorios">Precio:</span>
                    <span className="detail-value-price-accesorios">
                      ARS ${formatPrice(selectedAccesorio.precio)}
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
    </>
  );
};

export default MainAccesorios;
