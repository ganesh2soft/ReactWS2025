import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsAdmin from "./ProductsAdmin";
import OrdersAdmin from "./OrdersAdmin";
import PaymentsAdmin from "./PaymentsAdmin";
import UsersAdmin from "./UsersAdmin";

const AdminPanel = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <nav style={{ width: "200px", background: "#f0f0f0", padding: "1rem" }}>
        <h3>Admin Panel</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/adminpanel/productsadmin">Products Admin</Link>
          </li>
          <li>
            <Link to="/adminpanel/ordersadmin">Orders Admin</Link>
          </li>
          <li>
            <Link to="/adminpanel/paymentsadmin">Payments Admin</Link>
          </li>
          <li>
            <Link to="/adminpanel/usersadmin">Users Admin</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "1rem" }}>
        <Routes>
          <Route path="/productsadmin" element={<ProductsAdmin />} />
          <Route path="/ordersadmin" element={<OrdersAdmin />} />
          <Route path="/paymentsadmin" element={<PaymentsAdmin />} />
          <Route path="/usersadmin" element={<UsersAdmin />} />
          <Route
            path="/adminpanel"
            element={<h2>Welcome to the Admin Dashboard</h2>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
