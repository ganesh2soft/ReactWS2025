// src/components/misc/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="display-3 text-danger">404</h1>
      <h2>Page Not Found</h2>
      <p className="mb-4">The page you are looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
