import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useState } from "react";
import "../css/sideabar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Botón hamburguesa para móviles/tablets */}
      <button
        className="hamburger-btn d-lg-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <i className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"}`}></i>
      </button>

      {/* Overlay para cerrar el menú */}
      {isMenuOpen && (
        <div className="sidebar-overlay d-lg-none" onClick={closeMenu}></div>
      )}

      {/* Sidebar/Header */}
      <aside className={`sidebar bg-dark p-3 ${isMenuOpen ? "sidebar-open" : ""}`}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP_dvY2R2lR1oMoLG-g_bDgS4YIOQHBHp-UO6HcaGkUpgPvE5JcWxTN6ve3gZwxGPTX3OZ4NpR_7hB3u-9RxNMs_P9AAh4PPIAaxXhkt512aRRKFr7CSpZpNBADEi4t8WgYKQhwqJRaYjZVgagnO0BwYo2EOfliBpJ7BxHM7W8qnqUMNcGk101l3jXXSH6GhCL59JwAH84u_mze0EQbVqfiWnyofUZgAqIZaEa-VtQHJA_KJFOwO1MVnWT7QzCj1AyRqa-XJsBTg"
            alt="Admin"
            className="rounded-circle"
            width="40"
            height="40"
          />
          <div>
            <h5 className="mb-0 text-white">{user?.nombre || "Admin"}</h5>
            <button
              onClick={handleLogout}
              className="text-info bg-transparent border-0 p-0"
              style={{ cursor: "pointer" }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
        <nav className="nav flex-column">
          <Link
            to="/admin"
            className="BotonesSidebar nav-link text-white text-opacity-75"
            onClick={closeMenu}
          >
            <i className="bi bi-house-door-fill me-2"></i>
            Dashboard
          </Link>
          <Link
            to="/admin/vehiculos"
            className="BotonesSidebar nav-link text-white text-opacity-75"
            onClick={closeMenu}
          >
            <i className="bi bi-car-front-fill me-2"></i>
            Vehículos
          </Link>
          <Link
            to="/admin/repuestos"
            className="BotonesSidebar nav-link text-white text-opacity-75"
            onClick={closeMenu}
          >
            <i className="bi bi-gear-fill me-2"></i>
            Repuestos
          </Link>
          <Link
            to="/admin/accesorios"
            className="BotonesSidebar nav-link text-white text-opacity-75"
            onClick={closeMenu}
          >
            <i className="bi bi-bag-fill me-2"></i>
            Accesorios
          </Link>
          <Link
            to="/admin/consultas"
            className="BotonesSidebar nav-link text-white text-opacity-75"
            onClick={closeMenu}
          >
            <i className="bi bi-chat-dots-fill me-2"></i>
            Consultas
          </Link>
          <Link
            to="/admin/metricas"
            className="BotonesSidebar nav-link text-white text-opacity-75"
            onClick={closeMenu}
          >
            <i className="bi bi-graph-up-arrow me-2"></i>
            Métricas
          </Link>
          <Link
            to="/admin/post-venta"
            className="BotonesSidebar nav-link text-white text-opacity-75"
            onClick={closeMenu}
          >
            <i className="bi bi-headset me-2"></i>
            Post-Venta
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
