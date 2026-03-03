import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Swal from "sweetalert2";
import "../css/LoginAdmin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logoBlancoRojo from "../img/yumotors-rojo-blanco.png";

const LoginAdmin = () => {
  // Vista activa: "login" | "recovery" | "register"
  const [vista, setVista] = useState("login");

  // Login
  const [credencial, setCredencial] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Recuperación
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [loadingRecovery, setLoadingRecovery] = useState(false);

  // Registro
  const [regNombre, setRegNombre] = useState("");
  const [regMail, setRegMail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPassword2, setRegPassword2] = useState("");
  const [loadingRegister, setLoadingRegister] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  // Si se navega desde Header con state { vista: "register" }, abrir registro directamente
  useEffect(() => {
    if (location.state?.vista) {
      setVista(location.state.vista);
    }
  }, [location.state]);

  // ─── LOGIN ───────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: credencial, password }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        login(data.data);
        await Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: `Hola, ${data.data.nombre}`,
          timer: 1500,
          showConfirmButton: false,
        });
        if (data.data.idRol === 1) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Credenciales inválidas",
          confirmButtonColor: "#c8102e",
        });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Error al conectar con el servidor", confirmButtonColor: "#c8102e" });
    } finally {
      setLoading(false);
    }
  };

  // ─── RECUPERACIÓN ────────────────────────────────────────
  const handleRecoverySubmit = async (e) => {
    e.preventDefault();
    setLoadingRecovery(true);
    try {
      const response = await fetch("http://localhost:3000/api/password-recovery/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail: recoveryEmail }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        await Swal.fire({ icon: "success", title: "Correo Enviado", text: data.message, confirmButtonColor: "#c8102e" });
        setVista("login");
        setRecoveryEmail("");
      } else {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "No se pudo enviar el correo", confirmButtonColor: "#c8102e" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Error al conectar con el servidor", confirmButtonColor: "#c8102e" });
    } finally {
      setLoadingRecovery(false);
    }
  };

  // ─── REGISTRO ────────────────────────────────────────────
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (regNombre.length > 15) {
      return Swal.fire({ icon: "error", title: "Error", text: "El nombre no puede tener más de 15 caracteres", confirmButtonColor: "#c8102e" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regMail)) {
      return Swal.fire({ icon: "error", title: "Error", text: "El correo electrónico no tiene un formato válido", confirmButtonColor: "#c8102e" });
    }
    if (regPassword.length < 6) {
      return Swal.fire({ icon: "error", title: "Error", text: "La contraseña debe tener al menos 6 caracteres", confirmButtonColor: "#c8102e" });
    }
    if (regPassword !== regPassword2) {
      return Swal.fire({ icon: "error", title: "Error", text: "Las contraseñas no coinciden", confirmButtonColor: "#c8102e" });
    }
    setLoadingRegister(true);
    try {
      const response = await fetch("http://localhost:3000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: regNombre, mail: regMail, password: regPassword }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        await Swal.fire({ icon: "success", title: "¡Cuenta creada!", text: "Ya podés iniciar sesión.", confirmButtonColor: "#c8102e" });
        setVista("login");
        setRegNombre(""); setRegMail(""); setRegPassword(""); setRegPassword2("");
      } else {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "Error al registrarse", confirmButtonColor: "#c8102e" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Error al conectar con el servidor", confirmButtonColor: "#c8102e" });
    } finally {
      setLoadingRegister(false);
    }
  };

  // ─── Títulos según vista ──────────────────────────────────
  const titulos = {
    login:    { h2: "Iniciar Sesión", sub: "Accedé a tu cuenta para usar el carrito." },
    recovery: { h2: "Recuperar Contraseña", sub: "Te enviaremos un enlace a tu correo." },
    register: { h2: "Crear Cuenta", sub: "Completá los datos para registrarte." },
  };

  return (
    <div className="background-login d-flex justify-content-center align-items-center vh-100">
      <button className="btn-back-home" onClick={() => navigate("/")}>
        ← Volver al inicio
      </button>
      <div className="login-container d-flex flex-column justify-content-center align-items-center">
        <div className="text-center d-flex flex-column justify-content-start align-items-center mb-4">
          <div className="mb-3">
            <img className="nav-logo" src={logoBlancoRojo} alt="Yu Motors" />
          </div>
          <h2 className="text-white mb-2">{titulos[vista].h2}</h2>
          <p className="text-light mb-4">{titulos[vista].sub}</p>
        </div>

        {/* ── FORMULARIO LOGIN ── */}
        {vista === "login" && (
          <>
            <form onSubmit={handleSubmit} className="w-50 mb-3">
              <input
                type="text"
                className="mb-3 input-custom"
                placeholder="Nombre de usuario o Email"
                value={credencial}
                onChange={(e) => setCredencial(e.target.value)}
                required
              />
              <input
                type="password"
                className="mb-3 input-custom"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="boton-inicio-sesion btn w-100 mb-2" disabled={loading}>
                {loading ? "Iniciando..." : "Iniciar Sesión"}
              </button>
            </form>
            <button className="btn btn-link text-white" onClick={() => setVista("recovery")}
              style={{ textDecoration: "underline", fontSize: "14px" }}>
              ¿Olvidaste tu contraseña?
            </button>
            <button className="btn btn-link text-white" onClick={() => setVista("register")}
              style={{ textDecoration: "underline", fontSize: "14px" }}>
              ¿No tenés cuenta? Registrate
            </button>
          </>
        )}

        {/* ── FORMULARIO RECUPERACIÓN ── */}
        {vista === "recovery" && (
          <>
            <form onSubmit={handleRecoverySubmit} className="w-50 mb-3">
              <p className="text-light mb-3" style={{ fontSize: "14px" }}>
                Ingresá tu correo y te enviaremos el enlace para restablecer tu contraseña.
              </p>
              <input
                type="email"
                className="mb-3 input-custom"
                placeholder="Correo Electrónico"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                required
              />
              <button type="submit" className="boton-inicio-sesion btn w-100 mb-2" disabled={loadingRecovery}>
                {loadingRecovery ? "Enviando..." : "Enviar"}
              </button>
            </form>
            <button className="btn btn-link text-white" onClick={() => setVista("login")}
              style={{ textDecoration: "underline", fontSize: "14px" }}>
              Volver al inicio de sesión
            </button>
          </>
        )}

        {/* ── FORMULARIO REGISTRO ── */}
        {vista === "register" && (
          <>
            <form onSubmit={handleRegisterSubmit} className="w-50 mb-3">
              <input
                type="text"
                className="mb-3 input-custom"
                placeholder="Nombre de usuario"
                value={regNombre}
                onChange={(e) => setRegNombre(e.target.value)}
                maxLength={15}
                required
              />
              <small className="text-secondary d-block mb-2" style={{ marginTop: "-8px", fontSize: "12px" }}>
                {regNombre.length}/15 caracteres
              </small>
              <input
                type="email"
                className="mb-3 input-custom"
                placeholder="Correo Electrónico"
                value={regMail}
                onChange={(e) => setRegMail(e.target.value)}
                required
              />
              <input
                type="password"
                className="mb-3 input-custom"
                placeholder="Contraseña (mínimo 6 caracteres)"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                minLength={6}
                required
              />
              <input
                type="password"
                className="mb-3 input-custom"
                placeholder="Repetir Contraseña"
                value={regPassword2}
                onChange={(e) => setRegPassword2(e.target.value)}
                required
              />
              <button type="submit" className="boton-inicio-sesion btn w-100 mb-2" disabled={loadingRegister}>
                {loadingRegister ? "Creando cuenta..." : "Crear Cuenta"}
              </button>
            </form>
            <button className="btn btn-link text-white" onClick={() => setVista("login")}
              style={{ textDecoration: "underline", fontSize: "14px" }}>
              ¿Ya tenés cuenta? Iniciá sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginAdmin;
