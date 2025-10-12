import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = "http://localhost:8082/api/users"; // Change if needed

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);

  // 🔹 Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get/all`);
      console.log(res.data);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // 🔹 Delete user
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(`${API_BASE}/delete/${userId}`, config);
        fetchUsers(); // refresh list
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">👤 User Management</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-success">
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.roles}</td>

                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(user.userId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersAdmin;
