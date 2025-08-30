"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  ChevronDown,
  MoreVertical,
  Search,
  Bell,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getLearnersStats } from "@/services/admin";
import { showErrorToast } from "@/helpers/toastUtil";

const LearnersPage = () => {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("Monthly");
  const [isLoading, setIsLoading] = useState(true);
  const [learnersData, setLearnersData] = useState({
    metrics: [],
    coursesData: [],
    learnersList: [],
    genderDistribution: { male: 0, female: 0 },
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLearnersData = async () => {
      try {
        setIsLoading(true);

        console.log("Starting API calls...");

        // Fetch learners stats and list in parallel
        const [stats] = await Promise.all([
          getLearnersStats(),
          // getAllLearners(),
        ]);

        console.log("Raw API responses:", { stats });

        // Transform metrics data
        const metricsData = [
          {
            title: "Total Learners",
            value: stats?.total_learners?.toString() || "0",
            icon: GraduationCap,
          },
          {
            title: "Active Learners",
            value: stats?.active_learners?.toString() || "0",
            icon: GraduationCap,
          },
          {
            title: "New Learners",
            value: stats?.new_learners?.toString() || "0",
            icon: GraduationCap,
          },
        ];

        // Transform courses data from the stats response
        const coursesData =
          stats?.courses?.map((course) => ({
            company: course.title || "Unknown Course",
            enrolledLearners: course.enrolled_learners || 0,
            modules: course.total_modules || 0,
            tags: course.tag_names || [],
            dateAdded: course.date_added || "",
            duration: course.duration || "",
            isPublished: course.is_published || false,
          })) || [];

        // Transform learners list from the stats response
        const learnersList =
          stats?.learners?.map((learner, index) => ({
            id: index + 1, // Use index as ID since API doesn't provide one
            name: learner.name || "Unknown User",
            email: learner.email || "No email",
            coursesCount: learner.course_count || 0,
            enrolledCourses: learner.enrolled_courses || [],
            lastActivity: learner.last_activity_at
              ? new Date(learner.last_activity_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Never",
          })) || [];

        console.log("API Response:", stats);
        console.log("Transformed Data:", {
          metrics: metricsData,
          coursesData: coursesData,
          learnersList: learnersList,
          genderDistribution: stats?.gender || { male: 0, female: 0 },
        });

        const finalData = {
          metrics: metricsData,
          coursesData: coursesData,
          learnersList: learnersList,
          genderDistribution: stats?.gender || { male: 0, female: 0 },
        };

        console.log("Final data being set to state:", finalData);

        setLearnersData(finalData);
      } catch (error) {
        console.error("Error fetching learners data:", error);
        showErrorToast("Failed to load learners data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLearnersData();
  }, []);

  // Filter learners based on search term
  const filteredLearners = learnersData.learnersList.filter(
    (learner) =>
      learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      learner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#13485B] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading learners data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Learners</h1>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {learnersData.metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <metric.icon className="w-6 h-6 text-[#13485B]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {metric.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {metric.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Courses Section */}
      <div className="grid grid-cols-1 lg:grid-cols- gap-6">
        {/* Left Column - Gender and Courses */}
        <div className="space-y-6">
          {/* Gender Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Gender</h3>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Yearly</option>
              </select>
            </div>

            {/* Donut Chart */}
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-gray-300"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-500"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${
                      learnersData.genderDistribution.male +
                        learnersData.genderDistribution.female >
                      0
                        ? (learnersData.genderDistribution.male /
                            (learnersData.genderDistribution.male +
                              learnersData.genderDistribution.female)) *
                          100
                        : 0
                    }, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-800">
                    {learnersData.genderDistribution.male +
                      learnersData.genderDistribution.female}
                  </span>
                </div>
              </div>
              <div className="ml-6">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Male</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Female</span>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Courses</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrolled Learners
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No of Modules
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {learnersData.coursesData.length > 0 ? (
                    learnersData.coursesData.map((course, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {course.company}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {course.enrolledLearners}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {course.modules}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No course data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Search and Learners Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Learners</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search learners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No of Courses
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrolled Courses
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLearners.length > 0 ? (
                  filteredLearners.map((learner, index) => (
                    <tr key={learner.id || index} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {learner.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {learner.email}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {learner.coursesCount}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {learner.enrolledCourses.length > 0 ? (
                            <div>
                              {learner.enrolledCourses.slice(0, 2).join(", ")}
                              {learner.enrolledCourses.length > 2 && (
                                <span
                                  className="text-blue-600 cursor-pointer ml-1"
                                  title={learner.enrolledCourses.join(", ")}
                                >
                                  +{learner.enrolledCourses.length - 2} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">
                              No courses enrolled
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {learner.lastActivity}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      {searchTerm
                        ? "No learners found matching your search"
                        : "No learners available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnersPage;
