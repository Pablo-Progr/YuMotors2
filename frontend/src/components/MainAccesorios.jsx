import React from "react";
import "../css/accesorios.css";

const MainAccesorios = () => {
  return (
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
    <button
      type="button"
      data-bs-target="#carouselAccesorios"
      data-bs-slide-to="0"
      className="active"
      aria-current="true"
      aria-label="Slide 1"
    ></button>
    <button
      type="button"
      data-bs-target="#carouselAccesorios"
      data-bs-slide-to="1"
      aria-label="Slide 2"
    ></button>
    <button
      type="button"
      data-bs-target="#carouselAccesorios"
      data-bs-slide-to="2"
      aria-label="Slide 3"
    ></button>
  </div>

  <div className="carousel-inner">
    <div className="carousel-item active">
      <img
        src="https://toyotaexample.com/images/accesorio1.jpg"
        className="d-block w-100"
        alt="Barras portaequipaje Toyota"
      />
      <div className="carousel-caption d-none d-md-block">
        <h5>Barras Portaequipaje</h5>
        <p>Prácticas y resistentes para tus viajes.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img
        src="https://toyotaexample.com/images/accesorio2.jpg"
        className="d-block w-100"
        alt="Cobertor de caja Hilux"
      />
      <div className="carousel-caption d-none d-md-block">
        <h5>Cobertor de Caja</h5>
        <p>Protección y estilo para tu Hilux.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img
        src="https://toyotaexample.com/images/accesorio3.jpg"
        className="d-block w-100"
        alt="Alfombras originales Toyota"
      />
      <div className="carousel-caption d-none d-md-block">
        <h5>Alfombras Originales</h5>
        <p>Diseñadas a medida para cada modelo.</p>
      </div>
    </div>
  </div>

  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselAccesorios"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Anterior</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselAccesorios"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Siguiente</span>
  </button>
</div>


      {/* ===== Cards de accesorios ===== */}
      <div className="card-accesorios-container">
        <div className="card-accesorios">
          <img
            src="https://toyotaexample.com/images/accesorio-volante.jpg"
            className="foto-card-accesorios"
            alt="Cubre volante"
          />
          <div className="body-card-accesorios">
            <h5 className="titulo-card-accesorios">Cubre Volante</h5>
            <p className="texto-card-accesorios">
              Mejora el agarre y protege el volante del desgaste.
            </p>
            <p className="precio-card-accesorios">ARS$12.500</p>
            <a href="#" className="btn-accesorios">
              Ver detalle
            </a>
          </div>
        </div>

        <div className="card-accesorios">
          <img
            src="https://toyotaexample.com/images/accesorio-portabici.jpg"
            className="foto-card-accesorios"
            alt="Portabicicletas"
          />
          <div className="body-card-accesorios">
            <h5 className="titulo-card-accesorios">Portabicicletas</h5>
            <p className="texto-card-accesorios">
              Ideal para tus aventuras al aire libre.
            </p>
            <p className="precio-card-accesorios">ARS$45.000</p>
            <a href="#" className="btn-accesorios">
              Ver detalle
            </a>
          </div>
        </div>

        <div className="card-accesorios">
          <img
            src="https://toyotaexample.com/images/accesorio-kitseguridad.jpg"
            className="foto-card-accesorios"
            alt="Kit de seguridad"
          />
          <div className="body-card-accesorios">
            <h5 className="titulo-card-accesorios">Kit de Seguridad</h5>
            <p className="texto-card-accesorios">
              Incluye triángulo, matafuegos y botiquín homologados.
            </p>
            <p className="precio-card-accesorios">ARS$8.900</p>
            <a href="#" className="btn-accesorios">
              Ver detalle
            </a>
          </div>
        </div>

        <div className="card-accesorios">
          <img
            src="https://toyotaexample.com/images/accesorio-alfombra.jpg"
            className="foto-card-accesorios"
            alt="Juego de alfombras"
          />
          <div className="body-card-accesorios">
            <h5 className="titulo-card-accesorios">Juego de Alfombras</h5>
            <p className="texto-card-accesorios">
              Antideslizantes, resistentes al agua y fáciles de limpiar.
            </p>
            <p className="precio-card-accesorios">ARS$10.200</p>
            <a href="#" className="btn-accesorios">
              Ver detalle
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAccesorios;
