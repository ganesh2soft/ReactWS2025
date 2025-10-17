import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editing, setEditing] = useState(false);

  // Get userId from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      alert("User ID not found in local storage. Please login again.");
      return;
    }

    axios
      .get(`http://localhost:8082/api/users/get/${userId}`)
      .then((response) => {
        setUser(response.data);
        setNewAddress(response.data.address || "");
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [userId]);

  const handleSave = () => {
    if (!userId) {
      alert("User ID missing, cannot update.");
      return;
    }

    const updatedUser = {
      ...user,
      address: newAddress,
    };

    axios
      .put(`http://localhost:8082/api/users/update/${userId}`, updatedUser)
      .then((response) => {
        setUser(response.data);
        setEditing(false);
        alert("Profile updated!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Update failed");
      });
  };

  const handlePasswordReset = () => {
    if (!userId) {
      alert("User ID missing, cannot reset password.");
      return;
    }

    if (!newPassword) {
      alert("Enter a new password");
      return;
    }

    const payload = {
      ...user,
      password: newPassword,
    };

    axios
      .put(`http://localhost:8082/api/users/update/${userId}`, payload)
      .then(() => {
        setNewPassword("");
        alert("Password reset successfully!");
      })
      .catch((error) => {
        console.error("Password reset failed:", error);
        alert("Password reset failed");
      });
  };

  if (!user) return <div className="container mt-4">Loading profile...</div>;

  return (
    <div className="container mt-4">
      <h2>My Profile</h2>
      <div className="card p-4 shadow-sm">
        <p>
          <strong>User ID:</strong> {user.userId}
        </p>
        <p>
          <strong>Username:</strong> {user.userName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.roles}
        </p>

        {!editing ? (
          <>
            <p>
              <strong>Address:</strong> {user.address || "Not Provided"}
            </p>
            <button
              className="btn btn-primary me-2"
              onClick={() => setEditing(true)}
            >
              Edit Address
            </button>
          </>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label">New Address</label>
              <input
                type="text"
                className="form-control"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </div>
            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </>
        )}

        <hr />

        <div className="mb-3">
          <label className="form-label">Reset Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-warning" onClick={handlePasswordReset}>
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
