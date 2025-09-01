"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreVertical, Plus, Users, Search, Filter, Eye } from "lucide-react";
import Image from "next/image";
import { getAdminUsers, deleteAdminUser } from "@/services/admin";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";

const AdminPage = () => {
  const router = useRouter();
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showActionMenu, setShowActionMenu] = useState(null);
  const actionMenuRef = useRef(null);

  // Fetch admin users on component mount
  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      setIsLoading(true);
      const response = await getAdminUsers();
      const adminsData = response.admins || response || [];

      // Transform the data to match our UI structure
      const transformedAdmins = adminsData.map((admin) => ({
        id: admin.id,
        name:
          `${admin.first_name || ""} ${admin.last_name || ""}`.trim() ||
          "Unknown",
        email: admin.email,
        role: admin.role || admin.user_type || "Admin",
        lastLogin: admin.last_login
          ? new Date(admin.last_login).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Never",
        avatar: admin.profile_image || "/api/placeholder/40/40",
        status: admin.is_active ? "active" : "inactive",
      }));

      setAdmins(transformedAdmins);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      showErrorToast("Failed to load admin users");
    } finally {
      setIsLoading(false);
    }
  };

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target)
      ) {
        setShowActionMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Trainer":
        return "bg-green-100 text-green-800";
      case "Super Admin":
        return "bg-red-100 text-red-800";
      case "Unresolved":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || admin.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleActionMenu = (adminId) => {
    setShowActionMenu(showActionMenu === adminId ? null : adminId);
  };

  const handleEditAdmin = (admin) => {
    router.push(`/admin/admin/${admin.id}/edit`);
    setShowActionMenu(null);
  };

  const handleDeleteAdmin = async (admin) => {
    if (window.confirm(`Are you sure you want to delete ${admin.name}?`)) {
      try {
        await deleteAdminUser(admin.id);
        showSuccessToast("Admin deleted successfully");
        fetchAdminUsers(); // Refresh the list
        setShowActionMenu(null);
      } catch (error) {
        console.error("Error deleting admin:", error);
        showErrorToast("Failed to delete admin");
      }
    }
  };

  const handleViewProfile = (admin) => {
    router.push(`/admin/admin/${admin.id}`);
    setShowActionMenu(null);
  };

  const handleAddAdmin = () => {
    // For now, we'll show a simple alert. You can create a modal or separate page for this
    alert(
      "Add Admin functionality - You can create a modal or separate page for adding new admins"
    );
    // router.push('/admin/admin/create');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Total Admin Card */}
      <div className="mb-6">
        <Card className="w-64">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Admin</p>
                <p className="text-2xl font-bold text-gray-900">
                  {admins.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Admin</h1>
            <Button
              onClick={handleAddAdmin}
              className="bg-[#268FB6] hover:bg-[#268FB6]/80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#268FB6] focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="Trainer">Trainer</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Unresolved">Unresolved</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Admin Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {admin.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div
                          className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                          onClick={() => handleViewProfile(admin)}
                        >
                          {admin.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{admin.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
                        admin.role
                      )}`}
                    >
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleActionMenu(admin.id)}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {/* Action Menu */}
                    {showActionMenu === admin.id && (
                      <div
                        ref={actionMenuRef}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200"
                      >
                        <div className="py-1">
                          <button
                            onClick={() => handleViewProfile(admin)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Eye className="h-4 w-4 inline mr-2" />
                            View Profile
                          </button>
                          <button
                            onClick={() => handleEditAdmin(admin)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Edit Admin
                          </button>
                          <button
                            onClick={() => handleDeleteAdmin(admin)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Delete Admin
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading admins...</p>
            </div>
          ) : filteredAdmins.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No admins found matching your criteria.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
