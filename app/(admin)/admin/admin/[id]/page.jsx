"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAdminUsers } from "@/services/admin";
import { showErrorToast } from "@/helpers/toastUtil";

const AdminProfilePage = ({ params }) => {
  const router = useRouter();
  const [admin, setAdmin] = useState({
    id: params.id,
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    phone: "",
    gender: "",
    role: "",
    status: "Active",
    permissions: "",
    assignedSections: "",
    profileImage: "/api/placeholder/120/120",
    lastLogin: null,
    lastActivity: null,
    qualification: "",
    country: "",
    state: "",
    dateOfBirth: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const handleChangePassword = () => {
    router.push(`/admin/admin/${admin.id}/change-password`);
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

      // Transform the API response to match our UI structure
      setAdmin({
        id: adminData.id || params.id,
        firstName: adminData.first_name || "",
        lastName: adminData.last_name || "",
        email: adminData.email || "",
        location: adminData.home_address || adminData.country || "",
        phone: adminData.phone_number || "",
        gender: adminData.gender || "",
        role: adminData.user_type || "Admin",
        status: adminData.is_admin_user ? "Active" : "Inactive",
        permissions: adminData.is_2fa_enabled
          ? "Two-factor authentication enabled. Full access to all features."
          : "Standard admin permissions. Manage users, edit course details and view user reports.",
        assignedSections: "Courses, learners and notification management.",
        profileImage: adminData.profile_picture || "/api/placeholder/120/120",
        lastLogin: adminData.last_login,
        lastActivity: adminData.last_activity_at,
        qualification: adminData.qualification,
        country: adminData.country,
        state: adminData.state,
        dateOfBirth: adminData.date_of_birth,
      });
    } catch (error) {
      console.error("Error fetching admin details:", error);
      showErrorToast("Failed to load admin details");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Loading admin details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Profile
          </h1>
        </div>
        <Button
          onClick={handleChangePassword}
          className="bg-[#268FB6] hover:bg-[#268FB6]/80 text-white"
        >
          <Lock className="h-4 w-4 mr-2" />
          Change Password
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Profile Picture and Status */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <span className="text-3xl font-semibold text-gray-600">
                    {admin.firstName[0]}
                    {admin.lastName[0]}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">
                  {admin.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="lg:flex lg:justify-between gap-6">
          {/* Personal Information Card */}
          <Card className="bg-blue-50 border-blue-200 w-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Personal Information
                </CardTitle>
                <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                  {admin.role}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First name
                  </label>
                  <p className="text-sm text-gray-900">{admin.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last name
                  </label>
                  <p className="text-sm text-gray-900">{admin.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-sm text-gray-900">{admin.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <p className="text-sm text-gray-900">{admin.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <p className="text-sm text-gray-900">{admin.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <p className="text-sm text-gray-900">{admin.gender}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Roles and Permission Card */}
          <Card className="bg-blue-50 border-blue-200 w-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Roles and Permission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current role
                </label>
                <p className="text-sm text-gray-900">{admin.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permission
                </label>
                <p className="text-sm text-gray-900">{admin.permissions}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned section
                </label>
                <p className="text-sm text-gray-900">
                  {admin.assignedSections}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
