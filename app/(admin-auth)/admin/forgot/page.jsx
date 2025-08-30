"use client";

import React, { useState } from "react";
import { forgotPassword } from "@/services/authentication";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import Link from "next/link";

const AdminForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await forgotPassword({ email });
      showSuccessToast(
        result?.message || "A reset email has been sent if the address exists."
      );
    } catch (err) {
      showErrorToast(err?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-16">
      {loading && <LoadingSpinner />}
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        <div className="grid gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white rounded px-4 py-2 w-full"
        >
          Login to Account
        </button>
        <div className="text-center text-sm">
          <Link href="/admin/login" className="text-primary">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminForgotPasswordPage;
