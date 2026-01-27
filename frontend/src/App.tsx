import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { CarCatalog } from "./pages/CarCatalog";
import { CarDetails } from "./pages/CarDetails";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarCatalog />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Add other routes here later */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
