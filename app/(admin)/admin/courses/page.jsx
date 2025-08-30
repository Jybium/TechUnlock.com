"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  GraduationCap,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllCourses, deleteCourse, getCourseStats } from "@/services/admin";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";

const AdminCoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseStats, setCourseStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCourses();
    fetchCourseStats();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await getAllCourses();
      setCourses(response.courses || response || []);
    } catch (error) {
      showErrorToast("Failed to fetch courses");
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourseStats = async () => {
    try {
      const response = await getCourseStats();
      setCourseStats(response.data || response || {});
    } catch (error) {
      console.error("Error fetching course stats:", error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId);
        showSuccessToast("Course deleted successfully");
        fetchCourses(); // Refresh the list
      } catch (error) {
        showErrorToast("Failed to delete course");
        console.error("Error deleting course:", error);
      }
    }
  };

  const filteredCourses = courses?.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseClick = (courseId) => {
    router.push(`/admin/courses/${courseId}`);
  };

  const handleAddCourse = () => {
    router.push("/admin/courses/create");
  };

  return (
    <div className="space-y-6">
      {isLoading && <LoadingSpinner />}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
          <p className="text-gray-600">Manage your course offerings</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-800">
                {courseStats.total_courses || courses.length}
              </p>
            </div>
            <BookOpen className="w-8 h-8 text-[#13485B]" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Learners</p>
              <p className="text-2xl font-bold text-gray-800">
                {courseStats.total_learners || 0}
              </p>
            </div>
            <GraduationCap className="w-8 h-8 text-[#13485B]" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published Courses</p>
              <p className="text-2xl font-bold text-gray-800">
                {courseStats.total_published_courses ||
                  courses.filter((c) => c.is_published).length}
              </p>
            </div>
            <FileText className="w-8 h-8 text-[#13485B]" />
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Courses</h3>
          <button
            onClick={handleAddCourse}
            className="bg-[#13485B] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrolled Learners
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Training level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Added
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleCourseClick(course.id)}
                      className="text-sm font-medium text-[#13485B] hover:text-blue-800 hover:underline text-left"
                    >
                      {course.title}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.enrolled_learners || course.enrolledLearners || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        (course.training_level || course.trainingLevel) ===
                        "Beginner"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {course.training_level ||
                        course.trainingLevel ||
                        "Beginner"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.duration || "2 hours"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.created_at
                      ? new Date(course.created_at).toLocaleDateString()
                      : course.timeAdded || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCourseClick(course.id)}
                        className="text-[#13485B] hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCoursesPage;
