import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Outlet } from "react-router-dom";

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
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
