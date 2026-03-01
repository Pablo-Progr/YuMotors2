import axios from "axios";
import { useEffect, useState } from "react";
import "../css/mainusados.css";
import { Link } from "react-router-dom";

const MainUsados = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/vehiculos-usados",
        );
        setVehiculos(response.data);
      } catch (error) {
        console.error("Error fetching vehiculos:", error);
      }
    };

    fetchVehiculos();
  }, []);

  // Función para formatear el precio con puntos
  const formatPrice = (price) => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

        <div className="card-usados-container">
          {vehiculos.map((vehiculo) => (
            <div
              className="card-usados"
              style={{ width: "18rem" }}
              key={vehiculo.idVehiculoUsado}
            >
              <img
                src={vehiculo.imagen}
                className="card-usados-img-top"
                alt={`${vehiculo.marca} ${vehiculo.modelo}`}
              />
              <div className="card-usados-body">
                <h5 className="card-usados-title">{`${vehiculo.marca} ${vehiculo.modelo}`}</h5>
                <p className="card-usados-text">{`ARS $${formatPrice(
                  vehiculo.precio,
                )}`}</p>
                <button
                  onClick={() => openModal(vehiculo)}
                  className="btn-usados"
                >
                  Ver información
                </button>
              </div>
            </div>
          ))}
        </div>
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
