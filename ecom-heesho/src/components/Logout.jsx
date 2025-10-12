import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 Clear token or session data
    localStorage.removeItem("token");

    localStorage.removeItem("userName");

    // 🧭 Redirect to login (or home)
    navigate("/login");
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
