import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PRODUCT_API_BASE, CART_API_BASE } from "../components/misc/constants";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const selectedCategory = useSelector((state) => state.filters.category);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${PRODUCT_API_BASE}/getall`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleAddToCart = async (product) => {
    const user = localStorage.getItem("userName");
    if (!user || !token) {
      localStorage.setItem("redirectAfterLogin", "/dashboard/mycart");
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        `${CART_API_BASE}/addToCart`,
        { productId: product.productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/dashboard/mycart");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while adding to cart.");
    }
  };

  return (
    <div className="product-grid">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div className="product-card" key={product.productId}>
            <img src={product.imageURL} alt={product.productName} />
            <h3>{product.productName}</h3>
            <h5>{product.category}</h5>
            <p>{product.description}</p>
            <h5>₹{product.price.toFixed(2)}</h5>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default ProductList;
