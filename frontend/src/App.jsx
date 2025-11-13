import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/LoginAdmin";
import AccesoriosAdmin from "./pages/AccesoriosAdmin";
import RepuestosAdmin from "./pages/RepuestosAdmin";
import VehiculosAdmin from "./pages/VehiculosAdmin";
import ConsultasAdmin from "./pages/ConsultasAdmin";
import MetricasAdmin from "./pages/MetricasAdmin";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminHome from "./pages/AdminHome";
import VehPostVentaAdmin from "./pages/VehPostVentaAdmin";
import RegistroPosventa from "./pages/RegistroPosventa.jsx";
import Usados from "./pages/Usados";
import Concesionario from "./pages/Concesionario";
import Accesorios from "./pages/Accesorios";
import Repuestos from "./pages/Repuestos";
import Toyota from "./pages/Toyota";
import GazooRacing from "./pages/GazooRacing";
import Marcas from "./pages/Marcas";
import Yaris from "./pages/Yaris";
import Corolla from "./pages/Corolla"
import HiluxSR from "./pages/HiluxSR";
import Contanto from "./pages/Contanto";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usados" element={<Usados />} />
          <Route path="/concesionario" element={<Concesionario />} />
          <Route path="/repuestos" element={<Repuestos />} />
          <Route path="/accesorios" element={<Accesorios />} />
          <Route path="/toyota" element={<Toyota />} />
          <Route path="/marcas/gr" element={<GazooRacing />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/marcas/gr/yaris" element={<Yaris />} />
          <Route path="/marcas/toyota/corolla" element={<Corolla />} />
          <Route path="/marcas/toyota/hiluxsr" element={<HiluxSR />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/contacto" element={<Contanto />} />

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
                <MetricasAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/post-venta"
            element={
              <ProtectedRoute requireAdmin={true}>
                <VehPostVentaAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/registro-posventa/:id"
            element={
              <ProtectedRoute requireAdmin={true}>
                <RegistroPosventa />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
