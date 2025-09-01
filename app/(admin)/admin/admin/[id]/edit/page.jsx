"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAdminUsers, editAdminUser } from "@/services/admin";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";

const AdminProfileEditPage = ({ params }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "Male",
    role: "",
    homeAddress: "",
    phoneNumber: "",
  });

  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const roles = ["Super Admin", "Trainer", "Content Manager", "Support Admin"];

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Fetch admin details on component mount
  useEffect(() => {
    fetchAdminDetails();
  }, [params.id]);

  const fetchAdminDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getAdminUsers();
      const adminsData = response.admins || response || [];

      // Find the specific admin by ID
      const adminData = adminsData.find(
        (admin) => admin.id === parseInt(params.id)
      );

      if (!adminData) {
        showErrorToast("Admin not found");
        return;
      }

      // Transform the API response to match our form structure
      setFormData({
        firstName: adminData.first_name || "",
        lastName: adminData.last_name || "",
        email: adminData.email || "",
        gender: adminData.gender || "Male",
        role: adminData.user_type || "",
        homeAddress: adminData.home_address || "",
        phoneNumber: adminData.phone_number || "",
      });

      setSelectedRole(adminData.user_type || "");
    } catch (error) {
      console.error("Error fetching admin details:", error);
      showErrorToast("Failed to load admin details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDetails = async () => {
    try {
      setIsSaving(true);

      // Prepare data for API
      const updateData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        gender: formData.gender,
        role: selectedRole,
        address: formData.homeAddress,
        phone: formData.phoneNumber,
      };

      await editAdminUser(updateData, params.id);
      showSuccessToast("Admin details updated successfully");
      router.back();
    } catch (error) {
      console.error("Error updating admin details:", error);
      showErrorToast("Failed to update admin details");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePhoto = () => {
    // Handle photo change logic
    console.log("Change photo clicked");
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Loading admin details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Profile
          </h1>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Profile Picture Section */}
        <div className="flex justify-between">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <span className="text-3xl font-semibold text-gray-600">
                  {formData.firstName[0]}
                  {formData.lastName[0]}
                </span>
              </div>
            </div>
            <Button
              onClick={handleChangePhoto}
              variant="outline"
              className="border-blue-300 text-[#268FB6] hover:bg-blue-50"
            >
              <Camera className="h-4 w-4 mr-2" />
              Change photo
            </Button>
          </div>

          <Button
            onClick={handleSaveDetails}
            disabled={isSaving}
            className="bg-[#268FB6] hover:bg-[#268FB6]/50 text-white hover:text-white px-6 py-2"
          >
            {isSaving ? "Saving..." : "Save Details"}
          </Button>
        </div>

        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-sec10 mb-2">
                  First name
                </label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sec10 mb-2">
                  Email address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sec10 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#268FB6] mb-2">
                  Role
                </label>
                <div className="space-y-2">
                  <p className="text-sm text-sec10">Role</p>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select role</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last name
                </label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home address
                </label>
                <Input
                  type="text"
                  value={formData.homeAddress}
                  onChange={(e) =>
                    handleInputChange("homeAddress", e.target.value)
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number
                </label>
                <Input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileEditPage;
