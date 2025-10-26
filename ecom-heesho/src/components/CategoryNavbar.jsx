import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../store-redux/filtersSlice";
import { useNavigate } from "react-router-dom";

const CategoryNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCategory = useSelector((state) => state.filters.category);

  const categories = [
    { name: "All", key: "all" },
    { name: "Electronics", key: "electronics" },
    { name: "Toys", key: "toys" },
    { name: "Clothes", key: "clothes" },
    { name: "Kitchen & Dining", key: "kitchen" },
    { name: "Beauty & Health", key: "beauty-health" },
  ];

  const handleClick = (key) => {
    dispatch(setCategory(key));
    navigate("/products");
  };

  return (
    <Navbar bg="primary" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Toggle aria-controls="category-navbar" />
        <Navbar.Collapse id="category-navbar">
          <Nav className="me-auto">
            {categories.map((cat) => (
              <Nav.Link
                key={cat.key}
                onClick={() => handleClick(cat.key)}
                className={`text-white ${
                  selectedCategory === cat.key ? "fw-bold" : ""
                }`}
              >
                {cat.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CategoryNavbar;
