import Sidebar from "../components/Sidebar";
import TablaVehiculosAdmin from "../components/TablaVehiculosAdmin";
import "../css/admin.css";

const VehiculosAdmin = () => {
  return (
    <div className="d-flex bg-dark text-white min-vh-100">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold fs-2">Gestión de Vehículos</h1>
          <button className="botones btn  d-flex align-items-center gap-2">
            <i className="bi bi-plus-lg"></i> Agregar Vehículo
          </button>
        </div>
        <TablaVehiculosAdmin />
      </main>
    </div>
  );
};

export default VehiculosAdmin;
