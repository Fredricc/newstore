import "./App.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ProductInfo from "./pages/ProductInfo";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/AdminPage";
import { ToastContainer } from "react-toastify";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import "./stylesheets/layout.css";
import "./stylesheets/product.css";
import "./stylesheets/authentication.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoutes>
                <Homepage />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route
            path="/productinfo/:productid"
            exact
            element={
              <ProtectedRoutes>
                <ProductInfo />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            exact
            element={
              <ProtectedRoutes>
                <CartPage />
              </ProtectedRoutes>
            }
          />
        <Route
            path="/orders"
            exact
            element={
              <ProtectedRoutes>
                <OrderPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            exact
            element={
              <ProtectedRoutes>
                <AdminPage />
              </ProtectedRoutes>
            }
          />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
