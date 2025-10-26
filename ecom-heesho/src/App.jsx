import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/Footer";
import CategoryNavbar from "./components/CategoryNavbar";
import Sidebar from "./components/Sidebar";
import ProductsAdmin from "./components/adminFolder/ProductsAdmin";
import OrdersAdmin from "./components/adminFolder/OrdersAdmin";
import PaymentsAdmin from "./components/adminFolder/PaymentsAdmin";
import UsersAdmin from "./components/adminFolder/UsersAdmin";
import Offers from "./components/misc/Offers";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/userFolder/Dashboard";
import AdminPanel from "./components/adminFolder/AdminPanel";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import CartAdmin from "./components/adminFolder/CartAdmin";
import ProductList from "./components/ProductList";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <CategoryNavbar /> {/* Only once */}
          <div className="app-body" style={{ display: "flex" }}>
            <Sidebar />
            <div className="app-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard/*"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/adminpanel" element={<AdminPanel />}>
                  <Route
                    index
                    element={<h2>Welcome to the Admin Dashboard</h2>}
                  />
                  <Route path="productsadmin" element={<ProductsAdmin />} />
                  <Route path="cartadmin" element={<CartAdmin />} />
                  <Route path="ordersadmin" element={<OrdersAdmin />} />
                  <Route path="paymentsadmin" element={<PaymentsAdmin />} />
                  <Route path="usersadmin" element={<UsersAdmin />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
