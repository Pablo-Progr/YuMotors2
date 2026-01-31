import { useEffect, useState } from "react";
import axios from "axios";
import "../css/repuestos.css";
import { Link } from "react-router-dom";

const MainRepuestos = () => {
  const [repuestos, setRepuestos] = useState([]);
  const [selectedRepuesto, setSelectedRepuesto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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

    fetchRepuestos();
  }, []);

  // Función para formatear el precio con puntos
  const formatPrice = (price) => {
    return Number(price)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Función para abrir el modal
  const openModal = (repuesto) => {
    setSelectedRepuesto(repuesto);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedRepuesto(null);
  };

  return (
    <div className="repuestos-container">
      <h2 className="titulo-repuestos">Repuestos</h2>

      <div className="card-repuestos-container d-flex flex-wrap justify-content-center">
        {repuestos.map((repuesto) => (
          <div
            className="card-repuestos"
            style={{ width: "18rem" }}
            key={repuesto.idRepuesto}
          >
            <img
              src={repuesto.imagen}
              alt={repuesto.nombre}
              className="foto-card-repuestos"
            />
            <div className="body-card-repuestos">
              <h5 className="titulo-card-repuestos">{repuesto.nombre}</h5>
              <p className="precio-card-repuestos">
                ARS ${formatPrice(repuesto.precio)}
              </p>
              <button
                onClick={() => openModal(repuesto)}
                className="btn-repuestos"
              >
                Ver Informacion
              </button>
            </div>
          </div>
        ))}
      </div>

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

                <Link
                  to="/contacto"
                  className="btn-modal-contacto-repuestos text-center"
                >
                  Consultar disponibilidad
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainRepuestos;
