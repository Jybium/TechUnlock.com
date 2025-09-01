"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  Edit,
  Trash2,
  Plus,
  GraduationCap,
  Flag,
} from "lucide-react";
import { getCourseDetailsForAdmin } from "@/services/admin";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import { showErrorToast } from "@/helpers/toastUtil";

const AdminCourseDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const data = await getCourseDetailsForAdmin(id);
        setCourseDetails(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError("Failed to load course details");
        showErrorToast("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

  const handleEditCourse = () => {
    // Route to create course page with course preloaded for editing
    router.push(`/admin/courses/create?editCourse=${id}`);
  };

  const handleViewModule = (moduleId) => {
    router.push(`/admin/modules/${moduleId}`);
  };

  const handleEditModule = (moduleId) => {
    // Route to create course page with module preloaded
    router.push(`/admin/courses/create?editModule=${moduleId}&courseId=${id}`);
  };

  const handleDeleteModule = async (moduleId) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      try {
        // TODO: Implement delete module API call
        console.log("Deleting module:", moduleId);
        showErrorToast("Delete module functionality not implemented yet");
      } catch (error) {
        console.error("Error deleting module:", error);
        showErrorToast("Failed to delete module");
      }
    }
  };

  const handleAddModule = () => {
    router.push(`/admin/courses/${id}/modules/create`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !courseDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Course not found"}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#13485B] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Mock data for statistics - replace with actual API data
  const stats = [
    {
      icon: GraduationCap,
      label: "Total Learners",
      value: courseDetails.total_learners || 140,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: GraduationCap,
      label: "Active Learners",
      value: courseDetails.active_learners || 140,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: GraduationCap,
      label: "New Learners",
      value: courseDetails.new_learners || 140,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Flag,
      label: "Course Completion",
      value: courseDetails.course_completion || 0,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                {courseDetails.learners?.[0]?.course_title || "Course Title"}
              </h1>
            </div>
            <button
              onClick={handleEditCourse}
              className="bg-[#2FB3E3] text-white px-4 py-2 rounded-lg hover:bg-[#13485B]/80 transition-colors"
            >
              Edit Course
            </button>
          </div>
        </div>
      </div>

      <div className="">
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-3 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modules Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Modules</h2>
              <button
                onClick={handleAddModule}
                className="bg-[#2FB3E3] text-white px-4 py-2 rounded-lg hover:bg-[#13485B]/80 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Module</span>
              </button>
            </div>
          </div>

          {/* Table Header */}

          {/* Table Rows */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#EAF7FC]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Module No
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Module Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number of Video
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courseDetails.modules?.map((module, index) => (
                <tr key={module.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Module {module.order || index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {module.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {module.video_count || module.videos?.length || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {module.duration || "30 mins"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {module.date_added
                      ? new Date(module.date_added).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "Jun 24, 2022"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewModule(module.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Module"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteModule(module.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Module"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditModule(module.id)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Edit Module"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {(!courseDetails.modules || courseDetails.modules.length === 0) && (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 mb-4">
                <GraduationCap className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No modules yet
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by creating your first module for this course.
              </p>
              <button
                onClick={handleAddModule}
                className="bg-[#2FB3E3] text-white px-4 py-2 rounded-lg hover:bg-[#13485B]/80 transition-colors"
              >
                Create First Module
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCourseDetailsPage;
