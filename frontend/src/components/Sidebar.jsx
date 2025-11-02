import { Link, useNavigate } from "react-router-dom";
import "../css/sideabar.css";

const Sidebar = () => (
  <aside className="bg-dark p-3" style={{ width: "250px" }}>
    <div className="d-flex align-items-center gap-3 mb-4">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP_dvY2R2lR1oMoLG-g_bDgS4YIOQHBHp-UO6HcaGkUpgPvE5JcWxTN6ve3gZwxGPTX3OZ4NpR_7hB3u-9RxNMs_P9AAh4PPIAaxXhkt512aRRKFr7CSpZpNBADEi4t8WgYKQhwqJRaYjZVgagnO0BwYo2EOfliBpJ7BxHM7W8qnqUMNcGk101l3jXXSH6GhCL59JwAH84u_mze0EQbVqfiWnyofUZgAqIZaEa-VtQHJA_KJFOwO1MVnWT7QzCj1AyRqa-XJsBTg"
        alt="Admin"
        className="rounded-circle"
        width="40"
        height="40"
      />
      <div>
        <h5 className="mb-0 text-white">Admin</h5>
        <Link to="/login" className="text-info">
          Cerrar Sesion
        </Link>
      </div>
    </div>
    <nav className="nav flex-column">
      <Link
        to="/admin/vehiculos"
        className="BotonesSidebar nav-link text-white text-opacity-75"
      >
        Vehiculos
      </Link>
      <Link
        to="/admin/repuestos"
        className="BotonesSidebar nav-link text-white text-opacity-75"
      >
        Repuestos
      </Link>
      <Link
        to="/admin/accesorios"
        className="BotonesSidebar nav-link text-white text-opacity-75"
      >
        Accesorios
      </Link>
      <Link
        to="/admin/consultas"
        className="BotonesSidebar nav-link text-white text-opacity-75"
      >
        Consultas
      </Link>
    </nav>
  </aside>
);

export default Sidebar;
