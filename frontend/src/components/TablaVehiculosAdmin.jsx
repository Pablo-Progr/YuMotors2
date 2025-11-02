import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TablaVehiculosAdmin = () => {
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setVehiculoSeleccionado(null);
    setMostrarModal(false);
  };

  const vehiculos = [
    {
      marca: "Toyota",
      modelo: "GR Yaris",
      anio: "2020",
      kilometraje: "25000 km",
      descripcion: "Sin detalles estéticos, único dueño",
      precio: "€35000.00",
      color: "Negro",
      imagenes: [
        "https://media.toyota.com.ar/222fab5a-9007-4fd8-969c-46091fec24c2.png",
        "https://media.toyota.com.ar/92f74bf8-cfdc-49d6-a5db-29034d160ab6.png",
      ],
    },
    {
      marca: "Toyota",
      modelo: "GR Yaris",
      anio: "2020",
      kilometraje: "25000 km",
      descripcion: "Sin detalles estéticos, único dueño",
      precio: "€35000.00",
      color: "Negro",
      imagenes: [
        "https://media.toyota.com.ar/3ab6e620-041a-473b-935f-b18d8ebec6ae.png",
        "https://media.toyota.com.ar/cdd4a921-95c9-4eaf-b167-fdc07eabdd05.png",
      ],
    },
    {
      marca: "Toyota",
      modelo: "GR Yaris",
      anio: "2020",
      kilometraje: "25000 km",
      descripcion: "Sin detalles estéticos, único dueño",
      precio: "€35000.00",
      color: "Negro",
      imagenes: [
        "https://media.toyota.com.ar/222fab5a-9007-4fd8-969c-46091fec24c2.png",
        "https://media.toyota.com.ar/92f74bf8-cfdc-49d6-a5db-29034d160ab6.png",
      ],
    },
    {
      marca: "Toyota",
      modelo: "GR Yaris",
      anio: "2020",
      kilometraje: "25000 km",
      descripcion: "Sin detalles estéticos, único dueño",
      precio: "€35000.00",
      color: "Negro",
      imagenes: [
        "https://media.toyota.com.ar/3ab6e620-041a-473b-935f-b18d8ebec6ae.png",
        "https://media.toyota.com.ar/cdd4a921-95c9-4eaf-b167-fdc07eabdd05.png",
      ],
    },
  ];

  return (
    <>
      <div className="table-responsive p-3 rounded">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Kilometraje</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Color</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo, index) => (
              <tr key={index}>
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.anio}</td>
                <td>{vehiculo.kilometraje}</td>
                <td>{vehiculo.descripcion}</td>
                <td>{vehiculo.precio}</td>
                <td>{vehiculo.color}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-light me-2"
                    onClick={() => abrirModal(vehiculo)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-light me-2">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de imágenes */}
      {mostrarModal && vehiculoSeleccionado && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content text-white" style={{ backgroundColor: "#00665e" }}>
              <div className="modal-header">
                <h5 className="modal-title">
                  Imágenes de {vehiculoSeleccionado.marca}{" "}
                  {vehiculoSeleccionado.modelo}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={cerrarModal}
                ></button>
              </div>
              <div className="modal-body d-flex flex-wrap gap-3 justify-content-center">
                {vehiculoSeleccionado.imagenes.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Imagen ${i + 1}`}
                    className="img-fluid rounded"
                    style={{ maxHeight: "300px" }}
                  />
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-light" onClick={cerrarModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TablaVehiculosAdmin;
