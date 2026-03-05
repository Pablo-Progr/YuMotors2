import React from "react";
import "../css/paginadorDark.css";

const PaginadorDarkie = ({ paginaActual, totalPaginas, cambiarPagina }) => {
  // Función para ir a la primera página
  const irAlInicio = () => cambiarPagina(1);

  // Función para ir a la última página
  const irAlFinal = () => cambiarPagina(totalPaginas);

  // Función para retroceder una página
  const retroceder = () => {
    if (paginaActual > 1) cambiarPagina(paginaActual - 1);
  };

  // Función para avanzar una página
  const avanzar = () => {
    if (paginaActual < totalPaginas) cambiarPagina(paginaActual + 1);
  };

  // Función para generar los números de página visibles
  const generarNumerosPagina = () => {
    const numeros = [];
    const maxVisibles = 4; // Números de páginas visibles principales
    
    // Calcular rango de páginas visibles
    let inicio = Math.max(1, paginaActual - 2);
    let fin = Math.min(totalPaginas, inicio + maxVisibles - 1);
    
    // Ajustar inicio si estamos cerca del final
    if (fin - inicio < maxVisibles - 1) {
      inicio = Math.max(1, fin - maxVisibles + 1);
    }

    // Agregar números de página principales
    for (let i = inicio; i <= fin; i++) {
      numeros.push({
        numero: i,
        tipo: "normal",
      });
    }

    return numeros;
  };

  // Función para saltar 10 páginas adelante
  const saltar10Adelante = () => {
    const nuevaPagina = Math.min(totalPaginas, paginaActual + 10);
    cambiarPagina(nuevaPagina);
  };

  // Función para saltar 10 páginas atrás
  const saltar10Atras = () => {
    const nuevaPagina = Math.max(1, paginaActual - 10);
    cambiarPagina(nuevaPagina);
  };

  const numerosPagina = generarNumerosPagina();

  return (
    <div className="paginador-dark-container">
      <div className="paginador-dark-controles">
        {/* Botón Inicio */}
        <button
          className="btn-paginador-dark btn-inicio-dark"
          onClick={irAlInicio}
          disabled={paginaActual === 1}
          title="Ir al inicio"
        >
          <i className="bi bi-chevron-double-left"></i>
          <span className="btn-text-dark">Inicio</span>
        </button>

        {/* Botón Retroceder 10 - Solo si hay más de 10 páginas */}
        {totalPaginas > 10 && (
          <button
            className="btn-paginador-dark btn-salto-dark"
            onClick={saltar10Atras}
            disabled={paginaActual <= 10}
            title="Retroceder 10 páginas"
          >
            <i className="bi bi-chevron-bar-left"></i>
            <span className="btn-text-dark">-10</span>
          </button>
        )}

        {/* Botón Anterior */}
        <button
          className="btn-paginador-dark btn-anterior-dark"
          onClick={retroceder}
          disabled={paginaActual === 1}
          title="Página anterior"
        >
          <i className="bi bi-chevron-left"></i>
          <span className="btn-text-dark">Anterior</span>
        </button>

        {/* Números de página */}
        <div className="numeros-pagina-dark">
          {/* Mostrar primera página si no está visible */}
          {numerosPagina.length > 0 && numerosPagina[0].numero > 1 && (
            <>
              <button
                className="btn-numero-dark"
                onClick={() => cambiarPagina(1)}
              >
                1
              </button>
              {numerosPagina[0].numero > 2 && (
                <span className="puntos-suspension-dark">...</span>
              )}
            </>
          )}

          {/* Números principales */}
          {numerosPagina.map((item) => (
            <button
              key={item.numero}
              className={`btn-numero-dark ${
                item.numero === paginaActual ? "activo-dark" : ""
              }`}
              onClick={() => cambiarPagina(item.numero)}
            >
              {item.numero}
            </button>
          ))}

          {/* Mostrar última página si no está visible */}
          {numerosPagina.length > 0 &&
            numerosPagina[numerosPagina.length - 1].numero < totalPaginas && (
              <>
                {numerosPagina[numerosPagina.length - 1].numero <
                  totalPaginas - 1 && (
                  <span className="puntos-suspension-dark">...</span>
                )}
                <button
                  className="btn-numero-dark"
                  onClick={() => cambiarPagina(totalPaginas)}
                >
                  {totalPaginas}
                </button>
              </>
            )}
        </div>

        {/* Botón Siguiente */}
        <button
          className="btn-paginador-dark btn-siguiente-dark"
          onClick={avanzar}
          disabled={paginaActual === totalPaginas}
          title="Página siguiente"
        >
          <span className="btn-text-dark">Siguiente</span>
          <i className="bi bi-chevron-right"></i>
        </button>

        {/* Botón Avanzar 10 - Solo si hay más de 10 páginas */}
        {totalPaginas > 10 && (
          <button
            className="btn-paginador-dark btn-salto-dark"
            onClick={saltar10Adelante}
            disabled={paginaActual > totalPaginas - 10}
            title="Avanzar 10 páginas"
          >
            <span className="btn-text-dark">+10</span>
            <i className="bi bi-chevron-bar-right"></i>
          </button>
        )}

        {/* Botón Final */}
        <button
          className="btn-paginador-dark btn-final-dark"
          onClick={irAlFinal}
          disabled={paginaActual === totalPaginas}
          title="Ir al final"
        >
          <span className="btn-text-dark">Final</span>
          <i className="bi bi-chevron-double-right"></i>
        </button>
      </div>

      {/* Información de página */}
      <div className="paginador-info-dark">
        Página {paginaActual} de {totalPaginas}
      </div>
    </div>
  );
};

export default PaginadorDarkie;
