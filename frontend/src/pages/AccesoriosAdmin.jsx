import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TablaAccesoriosAdmin from "../components/TablaAccesoriosAdmin";
import ModalAgregarAccesorios from "../components/ModalAgregarAccesorios";
import "../css/admin.css";

const AccesoriosAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAccesorioAgregado = () => {
    setRefresh(!refresh); // Cambia el estado para forzar la recarga de la tabla
  };

  return (
    <div className="d-flex bg-dark text-white min-vh-100">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold fs-2">Gestión de Accesorios</h1>
          <button className="botones btn  d-flex align-items-center gap-2" onClick={handleShowModal}>
            <i className="bi bi-plus-lg"></i> Agregar Accesorio
          </button>
        </div>
        <TablaAccesoriosAdmin />
      </main>

      <ModalAgregarAccesorios
        show={showModal}
        onHide={handleCloseModal}
        onAccesorioAgregado={handleAccesorioAgregado}
      />
    </div>
  );
};

export default AccesoriosAdmin;
