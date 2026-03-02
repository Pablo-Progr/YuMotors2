import axios from "axios";
import { useEffect, useState } from "react";
import "../css/accesorios.css";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";

const MainAccesorios = () => {
  const [accesorios, setAccesorios] = useState([]);
  const [topAccesorios, setTopAccesorios] = useState([]);
  const [selectedAccesorio, setSelectedAccesorio] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cantidad, setCantidad] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccesorios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/accesorios/accesorios",
        );
        setAccesorios(response.data);
      } catch (error) {
        console.error("Error fetching accesorios:", error);
      }
    };

    const fetchTopAccesorios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/metricas/productos-mas-vendidos",
        );
        // Tomamos solo los 3 primeros accesorios más vendidos
        setTopAccesorios(response.data.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching top accesorios:", error);
      }
    };

    fetchAccesorios();
    fetchTopAccesorios();
  }, []);

  // Función para formatear el precio con puntos
  const formatPrice = (price) => {
    return Number(price)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Función para abrir el modal
  const openModal = (accesorio) => {
    setSelectedAccesorio(accesorio);
    setCantidad(0);
    setAddedToCart(false);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedAccesorio(null);
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

        {/* ===== Carousel exclusivo de accesorios ===== */}
        {/* ===== Carousel exclusivo de accesorios ===== */}
        <div
          id="carouselAccesorios"
          className="carousel slide carousel-accesorios"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-indicators">
            {topAccesorios.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselAccesorios"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

          <div className="carousel-inner">
            {topAccesorios.length > 0 ? (
              topAccesorios.map((accesorio, index) => (
                <div
                  key={accesorio.idAccesorio}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={accesorio.imagen}
                    className="d-block w-100"
                    alt={accesorio.nombre}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>{accesorio.nombre}</h5>
                    <p>{accesorio.descripcion}</p>
                    <p>
                      <strong>¡El más vendido!</strong> -{" "}
                      {accesorio.total_vendido} unidades vendidas
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="carousel-item active">
                <img
                  src="https://via.placeholder.com/800x400?text=Cargando..."
                  className="d-block w-100"
                  alt="Cargando..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Cargando productos más vendidos...</h5>
                </div>
              </div>
            )}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselAccesorios"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselAccesorios"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>

        {/* ===== Cards de accesorios ===== */}
        <div className="card-accesorios-container">
          {accesorios.map((accesorio) => (
            <div className="card-accesorios" key={accesorio.idAccesorio}>
              <img
                src={accesorio.imagen}
                className="foto-card-accesorios"
                alt={accesorio.nombre}
              />
              <div className="body-card-accesorios">
                <h5 className="titulo-card-accesorios">{accesorio.nombre}</h5>
                <p className="precio-card-accesorios">{`ARS $${formatPrice(
                  accesorio.precio,
                )}`}</p>
                <button
                  onClick={() => openModal(accesorio)}
                  className="btn-accesorios"
                >
                  Ver Informacion
                </button>
              </div>
            </div>
          ))}
        </div>
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
