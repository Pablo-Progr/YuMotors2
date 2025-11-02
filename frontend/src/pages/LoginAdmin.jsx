import "../css/LoginAdmin.css"; // Estilos personalizados
import "bootstrap/dist/css/bootstrap.min.css";

const LoginAdmin = () => {
  return (
    <div className="background-login d-flex justify-content-center align-items-center vh-100">
      <div className="login-container d-flex flex-column justify-content-center align-items-center ">
        <div className="text-center d-flex flex-column justify-content-start align-items-center mb-4">
          <h2 className="text-white mb-2">Acceso para Administradores</h2>
          <p className="text-light mb-4">
            Inicia sesión para gestionar el concesionario.
          </p>
        </div>
        <div className="w-50 mb-3">
          <input
            type="text"
            className="mb-3 input-custom"
            placeholder="Nombre de Usuario"
          />
          <input
            type="password"
            className="mb-3 input-custom"
            placeholder="Contraseña"
          />
          <button className="boton-inicio-sesion btn w-100 mb-2">Iniciar Sesión</button>
        </div>

        <a href="#" className="text-info">
          Olvidé mi contraseña
        </a>
      </div>
    </div>
  );
};

export default LoginAdmin;
