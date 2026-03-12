import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuthStore();

  // Rutas de admin: si no está autenticado → login, si no es admin → 404
  if (requireAdmin) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (!isAdmin) {
      return <Navigate to="/404" replace />;
    }
    return children;
  }

  // Rutas protegidas normales: redirigir al login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si pasa todas las validaciones, mostrar el componente
  return children;
};

export default ProtectedRoute;
