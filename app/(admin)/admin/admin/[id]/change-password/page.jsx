"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { changeAdminPassword } from "@/services/admin";

const ChangePasswordPage = ({ params }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Old password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one symbol";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSavePassword = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Make API call to change the password
      await changeAdminPassword(params.id, {
        old_password: formData.oldPassword,
        new_password: formData.newPassword,
      });

      // Success - navigate back
      router.back();
    } catch (error) {
      console.error("Error changing password:", error);
      setErrors({ general: "Failed to change password. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">
          Change Password
        </h1>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <div className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Old password
            </label>
            <Input
              type="password"
              placeholder="Enter old password"
              value={formData.oldPassword}
              onChange={(e) => handleInputChange("oldPassword", e.target.value)}
              className={`w-full ${errors.oldPassword ? "border-red-500" : ""}`}
            />
            {errors.oldPassword && (
              <p className="text-sm text-red-600 mt-1">{errors.oldPassword}</p>
            )}
          </div>

          {/* New Password and Confirm Password Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New password
              </label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                className={`w-full ${
                  errors.newPassword ? "border-red-500" : ""
                }`}
              />
              <p className="text-sm text-gray-500 mt-1">
                Password must have 8 characters and symbols.
              </p>
              {errors.newPassword && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm new password
              </label>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className={`w-full ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              <p className="text-sm text-gray-500 mt-1">
                Make sure the passwords are the same.
              </p>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {errors.general}
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSavePassword}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              {isLoading ? "Saving..." : "Save Password"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
