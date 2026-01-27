import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Swal from "sweetalert2";
import "../css/LoginAdmin.css"; // Estilos personalizados
import "bootstrap/dist/css/bootstrap.min.css";
import logoBlancoRojo from "../img/yumotors-rojo-blanco.png";

const LoginAdmin = () => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [loadingRecovery, setLoadingRecovery] = useState(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Guardar datos del usuario en Zustand
        login(data.data);

        // Mostrar mensaje de éxito
        await Swal.fire({
          icon: "success",
          title: "Login exitoso",
          text: `Bienvenido ${data.data.nombre}`,
          timer: 1500,
          showConfirmButton: false,
        });

        // Redireccionar según el rol
        if (data.data.idRol === 1) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        // Mostrar error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Credenciales inválidas",
        });
      }
    } catch (error) {
      console.error("Error en login:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al conectar con el servidor",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRecoverySubmit = async (e) => {
    e.preventDefault();
    setLoadingRecovery(true);

    try {
      const response = await fetch("http://localhost:3000/api/password-recovery/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail: recoveryEmail }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await Swal.fire({
          icon: "success",
          title: "Correo Enviado",
          text: data.message,
          confirmButtonColor: "#d32f2f",
        });
        setShowRecovery(false);
        setRecoveryEmail("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "No se pudo enviar el correo",
          confirmButtonColor: "#d32f2f",
        });
      }
    } catch (error) {
      console.error("Error en recuperación:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al conectar con el servidor",
        confirmButtonColor: "#d32f2f",
      });
    } finally {
      setLoadingRecovery(false);
    }
  };

  return (
    <div className="background-login d-flex justify-content-center align-items-center vh-100">
      <div className="login-container d-flex flex-column justify-content-center align-items-center ">
        <div className="text-center d-flex flex-column justify-content-start align-items-center mb-4">
          <div className="mb-3">
            <img className="nav-logo" src={logoBlancoRojo} alt="Yu Motors" />
          </div>    
          <h2 className="text-white mb-2">Acceso para Administradores</h2>
          <p className="text-light mb-4">
            Inicia sesión para gestionar el concesionario.
          </p>
        </div>

        {!showRecovery ? (
          <>
            <form onSubmit={handleSubmit} className="w-50 mb-3">
              <input
                type="text"
                className="mb-3 input-custom"
                placeholder="Nombre de Usuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
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
              <button
                type="submit"
                className="boton-inicio-sesion btn w-100 mb-2"
                disabled={loading}
              >
                {loading ? "Iniciando..." : "Iniciar Sesión"}
              </button>
            </form>
            <button
              className="btn btn-link text-white"
              onClick={() => setShowRecovery(true)}
              style={{ textDecoration: "underline", fontSize: "14px" }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </>
        ) : (
          <>
            <form onSubmit={handleRecoverySubmit} className="w-50 mb-3">
              <h5 className="text-white mb-3">Recuperar Contraseña</h5>
              <p className="text-light mb-3" style={{ fontSize: "14px" }}>
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
              </p>
              <input
                type="email"
                className="mb-3 input-custom"
                placeholder="Correo Electrónico"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="boton-inicio-sesion btn w-100 mb-2"
                disabled={loadingRecovery}
              >
                {loadingRecovery ? "Enviando..." : "Enviar"}
              </button>
            </form>
            <button
              className="btn btn-link text-white"
              onClick={() => {
                setShowRecovery(false);
                setRecoveryEmail("");
              }}
              style={{ textDecoration: "underline", fontSize: "14px" }}
            >
              Volver al inicio de sesión
            </button>
          </>
        )}
        
      </div>
    </div>
  );
};

export default LoginAdmin;
