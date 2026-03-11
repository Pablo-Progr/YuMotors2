import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/LoginAdmin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logoBlancoRojo from "../img/yumotors-rojo-blanco.png";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  useEffect(() => {
    const activate = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/verify-email/${token}`
        );
        const data = await response.json();
        if (response.ok && data.success) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.message || "El enlace de activación no es válido.");
        }
      } catch {
        setStatus("error");
        setMessage("Error al conectar con el servidor.");
      }
    };

    activate();
  }, [token]);

  return (
    <div className="background-login d-flex justify-content-center align-items-center vh-100">
      <button className="btn-back-home" onClick={() => navigate("/")}>
        ← Volver al inicio
      </button>
      <div className="login-container d-flex flex-column justify-content-center align-items-center text-center px-4">
        <div className="mb-4">
          <img className="nav-logo" src={logoBlancoRojo} alt="Yu Motors" />
        </div>

        {status === "loading" && (
          <>
            <h2 className="text-white mb-3">Activando tu cuenta...</h2>
            <p className="text-light">Por favor espera un momento.</p>
            <div className="spinner-border text-light mt-3" role="status" />
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-white mb-3">¡Cuenta activada!</h2>
            <p className="text-light mb-4">{message}</p>
            <button
              className="boton-inicio-sesion btn w-50"
              onClick={() => navigate("/login")}
            >
              Iniciar Sesión
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-white mb-3">Enlace inválido</h2>
            <p className="text-light mb-4">{message}</p>
            <button
              className="boton-inicio-sesion btn w-50"
              onClick={() => navigate("/login")}
            >
              Volver al inicio de sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
