import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/products";

export default function DisplayProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/getall`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>🛍️ Available Products</h3>
      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Special Price</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.productName}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.discount}</td>
                <td>{p.specialPrice}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
