import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/Footer";
import CategoryNavbar from "./components/CategoryNavbar";
import Sidebar from "./components/Sidebar";
import ProductsAdmin from "./components/adminFolder/ProductsAdmin";
import Offers from "./components/misc/Offers";
import Cart from "./components/Cart";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/adminFolder/AdminPanel";
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
                <Route path="/adminpanel/*" element={<AdminPanel />} />
                <Route path="/offers" element={<Offers />} />

                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
                {/* Protect the dashboard route */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
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
