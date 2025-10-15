import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 important
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/products/getall")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleAddToCart = (product) => {
    const user = localStorage.getItem("userName");
    if (!user) {
      // 👇 Save intent to redirect after login
      localStorage.setItem("redirectAfterLogin", "/dashboard/mycart");
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    // ✅ Save to localStorage (or dispatch Redux action here)
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    navigate("/dashboard/mycart");
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.imageUrl} alt={product.productName} />
          <h3>{product.productName}</h3>
          <h5>{product.category}</h5>
          <p>{product.description}</p>
          <h5>₹{product.price.toFixed(2)}</h5>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
