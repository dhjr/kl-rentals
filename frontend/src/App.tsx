import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import BookingConfirmation from "./pages/BookingConfirmation";
import SellerDashboard from "./pages/SellerDashboard";
import SellerLanding from "./pages/SellerLanding";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import LandingRouter from "./pages/LandingRouter";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCars from "./pages/admin/AdminCars";
import AdminBookings from "./pages/admin/AdminBookings";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Dynamic Root Route */}
              <Route index element={<LandingRouter />} />

              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="cars" element={<Cars />} />
              <Route path="cars/:id" element={<CarDetails />} />

              {/* Shared Protected Routes (Payment, Profile) */}
              <Route element={<ProtectedRoute />}>
                <Route path="profile" element={<Profile />} />
                <Route path="payment-success" element={<PaymentSuccess />} />
                <Route path="payment-cancelled" element={<PaymentCancel />} />
              </Route>

              {/* Seller Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
                <Route path="seller-home" element={<SellerLanding />} />
                <Route path="seller-dashboard" element={<SellerDashboard />} />
                <Route path="seller-dashboard/add-car" element={<AddCar />} />
                <Route
                  path="seller-dashboard/edit-car/:id"
                  element={<EditCar />}
                />
              </Route>

              {/* Customer Protected Routes */}
              <Route
                element={<ProtectedRoute allowedRoles={["user", "customer"]} />}
              >
                <Route
                  path="customer-dashboard"
                  element={<CustomerDashboard />}
                />
                <Route path="bookings" element={<Bookings />} />
                <Route
                  path="booking-confirmation/:id"
                  element={<BookingConfirmation />}
                />
              </Route>

              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="admin/dashboard" element={<AdminDashboard />} />
                <Route path="admin/users" element={<AdminUsers />} />
                <Route path="admin/cars" element={<AdminCars />} />
                <Route path="admin/bookings" element={<AdminBookings />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
