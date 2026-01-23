import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/loginAdmin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logoBlancoRojo from "../img/yumotors-rojo-blanco.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();

  // Verificar token al cargar la página
  useEffect(() => {
    const verificarToken = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/password-recovery/verify/${token}`
        );
        const data = await response.json();

        if (response.ok && data.success) {
          setTokenValid(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Token Inválido",
            text: data.message || "El enlace es inválido o ha expirado",
            confirmButtonColor: "#d32f2f",
          }).then(() => {
            navigate("/loginadmin");
          });
        }
      } catch (error) {
        console.error("Error al verificar token:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al verificar el enlace",
          confirmButtonColor: "#d32f2f",
        }).then(() => {
          navigate("/loginadmin");
        });
      } finally {
        setValidatingToken(false);
      }
    };

    verificarToken();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de contraseñas
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Las contraseñas no coinciden",
        confirmButtonColor: "#d32f2f",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña débil",
        text: "La contraseña debe tener al menos 6 caracteres",
        confirmButtonColor: "#d32f2f",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/password-recovery/reset/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, confirmPassword }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        await Swal.fire({
          icon: "success",
          title: "Contraseña Restablecida",
          text: "Tu contraseña ha sido actualizada exitosamente",
          confirmButtonColor: "#d32f2f",
        });
        navigate("/loginadmin");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "No se pudo restablecer la contraseña",
          confirmButtonColor: "#d32f2f",
        });
      }
    } catch (error) {
      console.error("Error al resetear contraseña:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al conectar con el servidor",
        confirmButtonColor: "#d32f2f",
      });
    } finally {
      setLoading(false);
    }
  };

  if (validatingToken) {
    return (
      <div className="background-login d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Validando...</span>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return null; // La redirección se maneja en el useEffect
  }

  return (
    <div className="background-login d-flex justify-content-center align-items-center vh-100">
      <div className="login-container d-flex flex-column justify-content-center align-items-center">
        <div className="text-center d-flex flex-column justify-content-start align-items-center mb-4">
          <div className="mb-3">
            <img className="nav-logo" src={logoBlancoRojo} alt="Yu Motors" />
          </div>
          <h2 className="text-white mb-2">Restablecer Contraseña</h2>
          <p className="text-light mb-4">
            Ingresa tu nueva contraseña a continuación.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-50 mb-3">
          <input
            type="password"
            className="mb-3 input-custom"
            placeholder="Nueva Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <input
            type="password"
            className="mb-3 input-custom"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
          <button
            type="submit"
            className="boton-inicio-sesion btn w-100 mb-2"
            disabled={loading}
          >
            {loading ? "Restableciendo..." : "Restablecer Contraseña"}
          </button>
        </form>
        <button
          className="btn btn-link text-white"
          onClick={() => navigate("/loginadmin")}
          style={{ textDecoration: "underline", fontSize: "14px" }}
        >
          Volver al inicio de sesión
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
