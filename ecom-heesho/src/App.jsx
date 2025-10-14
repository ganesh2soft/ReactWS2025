import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/userFolder/Dashboard";
import AdminPanel from "./components/adminFolder/AdminPanel";
import Logout from "./components/Logout";
import MyCart from "./components/userFolder/MyCart";
import MyOrders from "./components/userFolder/MyOrders";
import MyProfile from "./components/userFolder/MyProfile";

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
        theme="colored" // Looks good with Bootstrap
      />
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <CategoryNavbar />
          <div className="app-body" style={{ display: "flex" }}>
            <Sidebar />
            <div className="app-content">
              <Routes>
                <Route path="/" element={<Home />} />
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
                  <Route path="ordersadmin" element={<OrdersAdmin />} />
                  <Route path="paymentsadmin" element={<PaymentsAdmin />} />
                  <Route path="usersadmin" element={<UsersAdmin />} />
                </Route>
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
{
  /*
       
       
        
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/checkout' element={ <Checkout />}/>
            <Route path='/order-confirm' element={ <PaymentConfirmation />}/>
          </Route>

          <Route path='/' element={<PrivateRoute publicPage />}>
            <Route path='/login' element={ <LogIn />}/>
            <Route path='/register' element={ <Register />}/>
          </Route>

           <Route path='/' element={<PrivateRoute adminOnly />}>
            <Route path='/admin' element={ <AdminLayout />}>
              <Route path='' element={<Dashboard />} />
              <Route path='products' element={<AdminProducts />} />
              <Route path='sellers' element={<Sellers />} />
              <Route path='orders' element={<Orders />} />
              <Route path='categories' element={<Category />} />
            </Route>
          </Route>*/
}
