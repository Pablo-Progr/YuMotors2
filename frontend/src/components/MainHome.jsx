import wall2 from "../img/wall2.jpg";
import wall4 from "../img/wall4.jpg";
import wall5 from "../img/wall5.jpg";
import wall6 from "../img/wall6.jpg";
import wall8 from "../img/wall8.jpg";
import wall10 from "../img/wall10.jpg";
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
              <h2 className="fw-bold">Bienvenido a Yu Motors</h2>
              <p>Conducí tu futuro con nosotros</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={wall2} className="d-block w-100" alt="Slide 2" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">Autos Usados</h2>
              <p>Confiables y al mejor precio</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={wall8} className="d-block w-100" alt="Slide 3" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">Nuevos Modelos</h2>
              <p>Innovación y estilo en cada viaje</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={wall6} className="d-block w-100" alt="Slide 4" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">Autos de competición</h2>
              <p>Domina todos los circuitos</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={wall5} className="d-block w-100" alt="Slide 5" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">Servicio Premium</h2>
              <p>Mantenimiento y cuidado profesional</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={wall6} className="d-block w-100" alt="Slide 6" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">Accesorios</h2>
              <p>Porque la apariencia importa</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={wall10} className="d-block w-100" alt="Slide 7" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">Sobre nosotros</h2>
              <p>Siempre a tu lado en el camino</p>
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

      {/* Cards */}

      
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card shadow-sm">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Moscow%2C_Toyota_Corolla_Sport_hatchback%2C_Sept_2025_02.jpg"
                  alt="Auto"
                />
                <div className="card-body">
                  <p className="card-text">Toyota Corolla 2022</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Autos usados
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card shadow-sm">
                <img
                  src="https://media.toyota.com.ar/696e5ffd-4c88-4b05-8f3c-c720a5941da8.jpeg"
                  alt="Auto"
                />
                <div className="card-body">
                  <p className="card-text">Recién llegado - GR Yaris 2025</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Más información
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card shadow-sm">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/42/Lexus-cars-logo-emblem.jpg"
                  alt="Auto"
                />
                <div className="card-body">
                  <p className="card-text">Lexus</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Ver autos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sobre Nosotos */}


        <div className="container">
          
        </div>
      
    </div>
  );
};

export default MainHome;
