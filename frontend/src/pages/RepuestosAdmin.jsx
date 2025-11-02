import Sidebar from "../components/Sidebar";
import TablaRepuestosAdmin from "../components/TablaRepuestosAdmin";
import "../css/admin.css";

const RepuestosAdmin = () => {
  return (
    <div className="d-flex bg-dark text-white min-vh-100">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold fs-2">Gestión de Repuestos</h1>
          <button className="botones btn  d-flex align-items-center gap-2">
            <i className="bi bi-plus-lg"></i> Agregar Repuesto
          </button>
        </div>
        <TablaRepuestosAdmin />
      </main>
    </div>
  );
};

export default RepuestosAdmin;
