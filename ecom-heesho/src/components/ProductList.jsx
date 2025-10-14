import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css"; // optional styling

const ProductList = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.imageUrl} alt={product.productName} />
          <h3>{product.productName}</h3>
          <h5>{product.category}</h5>
          <p>{product.description}</p>
          <h5>₹{product.price.toFixed(2)}</h5>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
