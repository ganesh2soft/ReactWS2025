import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Browse Categories</h3>

      <div className="category-section">
        <h4>Product Type</h4>
        <ul>
          <li>
            <Link to="/products?category=Phones">Phones</Link>
          </li>
          <li>
            <Link to="/products?category=Laptops">Laptops</Link>
          </li>
        </ul>
      </div>

      <div className="category-section">
        <h4>Brand Name</h4>
        <ul>
          <li>
            <Link to="/products?brand=Apple">Apple</Link>
          </li>
          <li>
            <Link to="/products?brand=Samsung">Samsung</Link>
          </li>
          <li>
            <Link to="/products?brand=Dell">Dell</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
