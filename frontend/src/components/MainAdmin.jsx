import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import "../css/AdminHome.css";

const MainAdmin = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Vehículos Usados",
      icon: "bi-car-front-fill",
      path: "/admin/vehiculos",
      backgroundImage:
        "https://andigital.com.ar/uploads/noticias/5/2025/09/20250930201732_autoooo.jpg",
    },
    {
      title: "Repuestos",
      icon: "bi-gear-fill",
      path: "/admin/repuestos",
      backgroundImage:
        "https://www.fortunatofortino.com/wp-content/uploads/2019/10/repuestos-citroen.jpg",
    },
    {
      title: "Accesorios",
      icon: "bi-bag-fill",
      path: "/admin/accesorios",
      backgroundImage:
        "https://www.shutterstock.com/image-photo/sport-car-tuning-equipment-accessories-600nw-2221101627.jpg",
    },
    {
      title: "Consultas",
      icon: "bi-chat-dots-fill",
      path: "/admin/consultas",
      backgroundImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0HHfLd103T_fuABFL8sCEgWlSSPBP6Dvw1g&s",
    },
    {
      title: "Métricas",
      icon: "bi-graph-up-arrow",
      path: "/admin/metricas",
      backgroundImage:
        "https://d3t4nwcgmfrp9x.cloudfront.net/upload/metricas-marketing-b2b.jpg",
    },
    {
      title: "Post-Venta",
      icon: "bi-headset",
      path: "/admin/post-venta",
      backgroundImage:
        "https://www.toyotasarthou.com/_red/sarthou/userfiles/images/servicios/service-posventa.jpg",
    },
  ];

  return (
    <main className="flex-grow-1 p-4">
      <div className="admin-header">
        <div className="admin-welcome">
          <h1>Bienvenido {user?.nombre || "Administrador"}</h1>
          <p>Panel de Control - Yu Motors</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          <i className="bi bi-box-arrow-right me-2"></i>
          Cerrar Sesión
        </button>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-card w-25"
            style={
              item.backgroundImage
                ? {
                    backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${item.backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {
                    background: `linear-gradient(135deg, ${item.color}dd, ${item.color}99)`,
                  }
            }
            onClick={() => navigate(item.path)}
          >
            <i className={`bi ${item.icon}`}></i>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainAdmin;
