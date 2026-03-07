import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check roles if the route is restricted
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect them to their designated home base
    if (user.role === "seller") {
      return <Navigate to="/seller-home" replace />;
    }
    return <Navigate to="/customer-dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
