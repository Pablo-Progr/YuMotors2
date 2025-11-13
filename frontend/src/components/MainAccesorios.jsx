import axios from "axios";
import { useEffect, useState } from "react";
import "../css/accesorios.css";

const MainAccesorios = () => {
  const [accesorios, setAccesorios] = useState([]);
  const [topAccesorios, setTopAccesorios] = useState([]);

  useEffect(() => {
    const fetchAccesorios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/accesorios/accesorios"
        );
        setAccesorios(response.data);
      } catch (error) {
        console.error("Error fetching accesorios:", error);
      }
    };

    const fetchTopAccesorios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/metricas/productos-mas-vendidos"
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

  return (
    <>
      <div className="accesorios-container">
        <h2 className="titulo-accesorios">Accesorios Toyota</h2>

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
                <p className="texto-card-accesorios">{accesorio.descripcion}</p>
                <p className="precio-card-accesorios">{`ARS$${accesorio.precio}`}</p>
                <a href="#" className="btn-accesorios">
                  Ver detalle
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainAccesorios;
