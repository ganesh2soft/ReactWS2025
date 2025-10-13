import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = "http://localhost:8082/api/products";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    brandName: "",
    category: "",
    price: "",
    discount: "",
    quantity: "",
    specialPrice: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Fetch all products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/getall`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // 🔹 Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // or wherever you're storing it

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("Submitting headers:", config);
      if (isEditing) {
        console.log("Inside Product editing");
        await axios.put(
          `${API_BASE}/updateproducts/${formData.productId}`,
          formData,
          config
        );
      } else {
        await axios.post(`${API_BASE}/addproducts`, formData, config);
      }

      fetchProducts();
      resetForm();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // 🔹 Edit existing product
  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  // 🔹 Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      const token = localStorage.getItem("token"); // or wherever you're storing it

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const productId = id; // Assuming 'id' is the correct identifier
      try {
        await axios.delete(`${API_BASE}/deleteproducts/${productId}`, config);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  // 🔹 Reset form
  const resetForm = () => {
    setFormData({
      productId: "",
      productName: "",
      brandName: "",
      category: "",
      price: "",
      discount: "",
      quantity: "",
      specialPrice: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">🛠️ Product Admin Panel</h2>

      {/* ===== Product Form ===== */}
      <div className="card p-3 mb-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-3">
              <input
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-3">
              <input
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                placeholder="Brand Name"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-2">
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Discount (%)"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Qty"
                className="form-control"
              />
            </div>
            <div className="col-md-1 d-grid">
              <button className="btn btn-primary" type="submit">
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ===== Product List ===== */}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Quantity</th>
            <th>Special Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.productId}>
                <td>{p.productId}</td>
                <td>{p.productName}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.discount}</td>
                <td>{p.quantity}</td>
                <td>{p.specialPrice}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.productId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
