import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Home from "./Home";

const LandingRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If not logged in, show the default marketing homepage
  if (!user) {
    return <Home />;
  }

  // If logged in as seller, direct to seller landing
  if (user.role === "seller") {
    return <Navigate to="/seller-home" replace />;
  }

  // If logged in as customer/user, direct to customer dashboard
  return <Navigate to="/customer-dashboard" replace />;
};

export default LandingRouter;
