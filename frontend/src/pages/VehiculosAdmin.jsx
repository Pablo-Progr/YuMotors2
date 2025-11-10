import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TablaVehiculosAdmin from "../components/TablaVehiculosAdmin";
import ModalAgregarVehiculo from "../components/ModalAgregarVehiculo";
import "../css/admin.css";

const VehiculosAdmin = () => {
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const abrirModalAgregar = () => {
    setMostrarModalAgregar(true);
  };

  const cerrarModalAgregar = () => {
    setMostrarModalAgregar(false);
  };

  const handleVehiculoAgregado = () => {
    setRefreshTrigger((prev) => prev + 1); // Trigger refresh de la tabla
  };

  return (
    <div className="d-flex bg-dark text-white min-vh-100">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold fs-2">
            <i className="bi bi-car-front me-2"></i>
            Gestión de Vehículos
          </h1>
          <button
            className="botones btn d-flex align-items-center gap-2"
            onClick={abrirModalAgregar}
          >
            <i className="bi bi-plus-lg"></i> Agregar Vehículo
          </button>
        </div>
        <TablaVehiculosAdmin refreshTrigger={refreshTrigger} />
      </main>

      {/* Modal para agregar vehículo */}
      <ModalAgregarVehiculo
        show={mostrarModalAgregar}
        onHide={cerrarModalAgregar}
        onVehiculoAgregado={handleVehiculoAgregado}
      />
    </div>
  );
};

export default VehiculosAdmin;
