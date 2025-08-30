"use client";

import React, { useState } from "react";
import { signIn } from "@/services/authentication";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn({ email, password });
      const userType = result?.user?.user_type?.toLowerCase?.();
      const legacyAdmin =
        result?.user?.is_admin ||
        result?.user?.is_staff ||
        result?.user?.is_superuser;
      if (userType !== "admin" && !legacyAdmin) {
        await fetch("/api/remove-cookie");
        showErrorToast("Admin access only. Please use the user login page.");
        return;
      }
      showSuccessToast("Welcome back, Admin.");
      router.replace("/admin");
    } catch (err) {
      showErrorToast(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-16">
      {loading && <LoadingSpinner />}
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Login as TechUnlock Admin
        </h1>
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
        <div className="grid gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          <Link href="/admin/forgot" className="text-sm text-red-500">
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="bg-primary text-white rounded px-4 py-2 w-full"
        >
          Login to Account
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
