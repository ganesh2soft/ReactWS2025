import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { USER_API_BASE } from "../misc/constants";
const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editing, setEditing] = useState(false);

  // Get userId from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      alert("Session Cleared.No UserID found. Please login again.");
      return;
    }

    axios
      .get(`${USER_API_BASE}/get/${userId}`)
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
      .put(`${USER_API_BASE}/update/${userId}`, updatedUser)
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

        toast.info("Password reset successful, please login again.");
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Password reset failed:", error);
        alert("Password reset failed");
      });
  };

  if (!user) return <div className="container mt-4">Loading profile...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-start fw-bold border-bottom pb-2">
        <FaUserCircle className="me-2 text-warning" />
        My Profile
      </h3>

      <div className="row">
        <div className="col-md-8">
          <div
            className="card p-4 shadow-sm bg-light"
            style={{ maxWidth: "100%" }}
          >
            {/* Profile Info Rows */}
            <div className="row mb-2">
              <div className="col-sm-3 fw-bold">User ID:</div>
              <div className="col-sm-9">{user.userId}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-3 fw-bold">Username:</div>
              <div className="col-sm-9">{user.userName}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-3 fw-bold">Email:</div>
              <div className="col-sm-9">{user.email}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-3 fw-bold">Role:</div>
              <div className="col-sm-9">{user.roles}</div>
            </div>

            {/* Address Section */}
            {!editing ? (
              <div className="row mb-2">
                <label className="col-sm-4 fw-bold">Address:</label>
                <div className="col-sm-8">
                  {user.address || "Not Provided"}
                  <br />
                  <button
                    className="btn btn-outline-primary btn-sm mt-2"
                    onClick={() => setEditing(true)}
                  >
                    Edit Address
                  </button>
                </div>
              </div>
            ) : (
              <div className="row mb-2">
                <label className="col-sm-4 fw-bold">Edit Address:</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control form-control-sm mb-2"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <hr />

            {/* Reset Password Section */}
            <div className="row mb-2">
              <label className="col-sm-4 fw-bold">Reset Password:</label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control form-control-sm mb-2"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handlePasswordReset}
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
