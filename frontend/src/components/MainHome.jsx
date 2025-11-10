import wall2 from "../img/hilux.jpg";
import wall4 from "../img/camry-tc-2024.jpg";
import wall5 from "../img/Supras.png";
import wall6 from "../img/gr-yaris-wrc.jpg";
import wall8 from "../img/wall8.jpg";
import wall10 from "../img/wall10.jpg";
import home from "../img/toyota-main-home.jpg";

import { MdAttachMoney } from "react-icons/md";
import { GiCarKey } from "react-icons/gi";
import { BiSolidCheckShield } from "react-icons/bi";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTools,
  FaAward,
} from "react-icons/fa";
import "../css/mainhome.css";

const MainHome = () => {
  return (
    <div className="main-home">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {/* Indicadores */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="5"
            aria-label="Slide 6"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="6"
            aria-label="Slide 7"
          ></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={wall4} className="d-block w-100" alt="Slide 1" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="titulo-carousel">Bienvenido a Yu Motors</h2>
              <p className="subtitulo-carousel">Conducí tu futuro con nosotros</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={wall2} className="d-block w-100" alt="Slide 2" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="titulo-carousel">Autos Usados</h2>
              <p className="subtitulo-carousel" >Confiables y al mejor precio</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={wall8} className="d-block w-100" alt="Slide 3" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="titulo-carousel">Nuevos Modelos</h2>
              <p className="subtitulo-carousel">Innovación y estilo en cada viaje</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={wall6} className="d-block w-100" alt="Slide 4" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="titulo-carousel">Autos de competición</h2>
              <p className="subtitulo-carousel">Domina todos los circuitos</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={wall5} className="d-block w-100" alt="Slide 5" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="titulo-carousel">Servicio Premium</h2>
              <p className="subtitulo-carousel">Mantenimiento y cuidado profesional</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={wall6} className="d-block w-100" alt="Slide 6" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="titulo-carousel">Accesorios</h2>
              <p className="subtitulo-carousel">Porque la apariencia importa</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={wall10} className="d-block w-100" alt="Slide 7" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="titulo-carousel">Sobre nosotros</h2>
              <p className="subtitulo-carousel">Siempre a tu lado en el camino</p>
            </div>
          </div>
        </div>

        {/* Controles */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      





      <div className="main-container">  
        {/* Sección izquierda con imagen */}
        <div className="image-section">
          <img src={home} alt="Promociones" />
          <div className="promo-text">
            <h2>Promociones</h2>
            <a href="#">+ Saber más</a>
          </div>
        </div>

        {/* Sección derecha con 4 bloques */}
        <div className="menu-grid">
          <div className="menu-item dark">
            <div className="icono-menu-container">
              <FaMapMarkerAlt size={40} />
              <p>Concesionarios</p>
            </div>
          </div>
          <div className="menu-item medium">
            <div className="icono-menu-container">
              <FaCalendarAlt size={40} />
              <p>Turno Online</p>
            </div>
          </div>
          <div className="menu-item light">
            <div className="icono-menu-container">
              <FaTools size={40} />
              <p>Post Venta</p>
            </div>
          </div>

          <div className="menu-item lighter">
            <div className="icono-menu-container">
              <FaAward size={40} className="icono-menu" />
              <p className="texto-menu">Garantía</p>
            </div>
          </div>
        </div>
      </div>







      {/* Sobre Nosotos */}
      {/* Servicios */}
      <div className="servicios-wrapper">
        <h3 className="servicios-titulo">Nuestros Servicios</h3>

        <div className="servicios-container">
          <div className="servicio">
            <MdAttachMoney className="servicio-icono" />
            <button className="btn-servicios">Financiamiento</button>
            <p>
              Ofrecemos planes de financiamiento flexibles para ayudarte a
              comprar el auto de tus sueños.
            </p>
          </div>

          <div className="servicio">
            <GiCarKey className="servicio-icono" />
            <button className="btn-servicios">Mantenimiento</button>
            <p>
              Nuestro taller cuenta con técnicos certificados para mantener tu
              vehículo en óptimas condiciones.
            </p>
          </div>

          <div className="servicio">
            <BiSolidCheckShield className="servicio-icono" />
            <button className="btn-servicios">Garantía extendida</button>
            <p>
              Protege tu inversión con nuestras opciones de garantía extendida
              para tu tranquilidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHome;
