"use client";

import React, { useState } from "react";
import { apiClient } from "@/helpers/apiClient";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await apiClient.post("/account/make-admin/", formData);

      if (response.status === 200) {
        setSuccess("User promoted to admin successfully.");
        showSuccessToast("User promoted to admin successfully.");
      } else {
        setError("Failed to promote user to admin. Please try again.");
        showErrorToast("Failed to promote user to admin.");
      }
    } catch (err) {
      setError("An error occurred while making the user an admin.");
      showErrorToast("An error occurred while making the user an admin.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-[90%] mx-auto space-y-7 my-5">
      <h2 className="font-bold text-lg text-pri10">Make User Admin</h2>

      <form onSubmit={handleSubmit} className="space-y-5 make-admin-container ">
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter user's email to promote"
          />
        </div>

        {loading ? (
          <button type="submit" disabled>
            Promoting...
          </button>
        ) : (
          <button type="submit">Make Admin</button>
        )}

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </form>

      <style jsx>{`
        .make-admin-container {
          max-width: 70%;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
          background-color: #f9f9f9;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          padding: 10px 15px;
          background-color: #4caf50;
          border: none;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #ccc;
        }
        .error-message {
          color: red;
          margin-top: 10px;
        }
        .success-message {
          color: green;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default MakeAdmin;
