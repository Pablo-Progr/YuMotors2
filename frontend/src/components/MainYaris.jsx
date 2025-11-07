import React from 'react'
import gryaris1 from "../img/gryaris1.jpeg";
import gryaris2 from "../img/gryaris2.jpeg";
import gryaris3 from "../img/gryaris3.jpeg";
import gryaris4 from "../img/gryaris4.jpeg";
import gryaris5 from "../img/gryaris5.jpeg";
import gryaris6 from "../img/gryaris6.jpeg";
import gryaris7 from "../img/gryaris7.jpeg";

import "../css/mainhome.css";
import { MdAttachMoney } from "react-icons/md";
import { GiCarKey } from "react-icons/gi";
import { BiSolidCheckShield } from "react-icons/bi";

const MainYaris = () => {
  return (
    <div>
  


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
            <img src={gryaris1} className="d-block w-100" alt="Slide 1" />
            <div className="carousel-caption d-none d-md-block">
              
            </div>
          </div>

          <div className="carousel-item">
            <img src={gryaris2} className="d-block w-100" alt="Slide 2" />
            <div className="carousel-caption d-none d-md-block">
              
            </div>
          </div>

          <div className="carousel-item">
            <img src={gryaris3} className="d-block w-100" alt="Slide 3" />
            <div className="carousel-caption d-none d-md-block">
              
            </div>
          </div>

          <div className="carousel-item">
            <img src={gryaris4} className="d-block w-100" alt="Slide 4" />
            <div className="carousel-caption d-none d-md-block">
             
            </div>
          </div>

          <div className="carousel-item">
            <img src={gryaris5} className="d-block w-100" alt="Slide 5" />
            <div className="carousel-caption d-none d-md-block">
              
            </div>
          </div>

          <div className="carousel-item">
            <img src={gryaris6} className="d-block w-100" alt="Slide 6" />
            <div className="carousel-caption d-none d-md-block">
              
            </div>
          </div>

          <div className="carousel-item">
            <img src={gryaris7} className="d-block w-100" alt="Slide 7" />
            <div className="carousel-caption d-none d-md-block">
              
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

      

    </div>
  )
}

export default MainYaris