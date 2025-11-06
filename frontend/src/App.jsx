import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/LoginAdmin";
import AccesoriosAdmin from "./pages/AccesoriosAdmin";
import RepuestosAdmin from "./pages/RepuestosAdmin";
import VehiculosAdmin from "./pages/VehiculosAdmin";
import ConsultasAdmin from "./pages/ConsultasAdmin";
import Home from "./pages/Home";
import Usados from "./pages/Usados";
import Concesionario from "./pages/Concesionario";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usados" element={<Usados />} />
          <Route path="/concesionario" element={<Concesionario />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/accesorios" element={<AccesoriosAdmin />} />
          <Route path="/admin/repuestos" element={<RepuestosAdmin />} />
          <Route path="/admin/vehiculos" element={<VehiculosAdmin />} />
          <Route path="/admin/consultas" element={<ConsultasAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
