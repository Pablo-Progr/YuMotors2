import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuthStore();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si la ruta requiere admin y el usuario no es admin, redirigir al home
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Si pasa todas las validaciones, mostrar el componente
  return children;
};

export default ProtectedRoute;
