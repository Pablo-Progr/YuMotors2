import Sidebar from "../components/Sidebar";
import TablaPedidos from "../components/TablaPedidos";
import "../css/admin.css";

const PedidosAdmin = () => {
  return (
    <div className="d-flex bg-dark text-white min-vh-100">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold fs-2">Gestión de Pedidos</h1>
        </div>
        <TablaPedidos />
      </main>
    </div>
  );
};

export default PedidosAdmin;
