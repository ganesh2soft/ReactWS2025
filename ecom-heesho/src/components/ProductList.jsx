import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/products/getall")
      .then((res) => {
        setProducts(res.data);
        console.log("Products data:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

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
        "http://localhost:8082/api/carts/addToCart",
        {
          productId: product.productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product added to cart:", product.productName);
      navigate("/dashboard/mycart");
    } catch (error) {
      console.error("Failed to add product to cart", error);
      alert("Something went wrong while adding to cart.");
    }
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product.productId}>
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
