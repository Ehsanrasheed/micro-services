import { Navigate, Route, Routes, NavLink } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

function isLoggedIn() {
  return Boolean(localStorage.getItem("jwtToken"));
}

function App() {
  const loggedIn = isLoggedIn();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Microservices Demo</p>
          <h1>Simple React Frontend</h1>
        </div>
        <nav className="nav">
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          {loggedIn ? (
            <button
              className="link-button"
              type="button"
              onClick={() => {
                localStorage.removeItem("jwtToken");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          ) : null}
        </nav>
      </header>

      <main className="page-wrap">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
