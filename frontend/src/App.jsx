import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/LoginAdmin";
import ResetPassword from "./pages/ResetPassword";
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
import SW4 from "./pages/SW4";
import Contanto from "./pages/Contanto";
import PosventaUser from "./pages/PosventaUser";
import VehiculoDetalle from "./pages/VehiculoDetalle";
import RegistrosPosventaUser from "./pages/RegistrosPosventaUser";
import Carrito from "./pages/Carrito";

import PedidosAdmin from "./pages/PedidosAdmin";
import PedidosUser from "./pages/PedidosUser";
import NotFound from "./pages/NotFound";
import AutoLogout from "./components/AutoLogout";

// Nuevas páginas de Mi Posventa
import MiPosventa from "./pages/MiPosventa";
import MiPosventaHistorial from "./pages/MiPosventaHistorial";
import MiPosventaAgendar from "./pages/MiPosventaAgendar";
import MiPosventaRegistrar from "./pages/MiPosventaRegistrar";


function App() {
  return (
    <>
      <BrowserRouter>
        <AutoLogout />
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
          <Route path="/marcas/toyota/sw4" element={<SW4 />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/loginadmin" element={<AdminLogin />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/contacto" element={<Contanto />} />
          <Route path="/posventa" element={<PosventaUser />} />
          <Route path="/posventa/vehiculo/:id" element={<VehiculoDetalle />} />
          <Route path="/posventa/registros/:id" element={<RegistrosPosventaUser />} />
          <Route
            path="/carrito"
            element={
              <ProtectedRoute>
                <Carrito />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pedidos"
            element={
              <ProtectedRoute>
                <PedidosUser />
              </ProtectedRoute>
            }
          />

          {/* Rutas protegidas para Mi Posventa (usuarios logueados) */}
          <Route
            path="/mi-posventa"
            element={
              <ProtectedRoute>
                <MiPosventa />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mi-posventa/vehiculo/:id"
            element={
              <ProtectedRoute>
                <MiPosventaHistorial />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mi-posventa/agendar/:id"
            element={
              <ProtectedRoute>
                <MiPosventaAgendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mi-posventa/registrar"
            element={
              <ProtectedRoute>
                <MiPosventaRegistrar />
              </ProtectedRoute>
            }
          />

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
            path="/admin/pedidos"
            element={
              <ProtectedRoute requireAdmin={true}>
                <PedidosAdmin />
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
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
