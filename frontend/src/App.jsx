import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/LoginAdmin";
import AccesoriosAdmin from "./pages/AccesoriosAdmin";
import RepuestosAdmin from "./pages/RepuestosAdmin";
import VehiculosAdmin from "./pages/VehiculosAdmin";
import ConsultasAdmin from "./pages/ConsultasAdmin";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminHome from "./pages/AdminHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AdminLogin />} />

          {/* Rutas protegidas para administradores */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/accesorios"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AccesoriosAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/repuestos"
            element={
              <ProtectedRoute requireAdmin={true}>
                <RepuestosAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vehiculos"
            element={
              <ProtectedRoute requireAdmin={true}>
                <VehiculosAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/consultas"
            element={
              <ProtectedRoute requireAdmin={true}>
                <ConsultasAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/metricas"
            element={
              <ProtectedRoute requireAdmin={true}>
                <div className="d-flex bg-dark text-white min-vh-100 justify-content-center align-items-center">
                  <h1>Página de Métricas - En construcción</h1>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/post-venta"
            element={
              <ProtectedRoute requireAdmin={true}>
                <div className="d-flex bg-dark text-white min-vh-100 justify-content-center align-items-center">
                  <h1>Página de Post-Venta - En construcción</h1>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
