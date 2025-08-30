"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Users,
  Clock,
  BookOpen,
  Star,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";

const CourseDetailsPage = ({ params }) => {
  const router = useRouter();

  // Mock data for course details
  const courseDetails = {
    title: "Introduction to Digital Marketing",
    description:
      "This beginner-friendly course introduces you to digital marketing, covering understanding audiences, social media, content creation, targeted ads, and performance measurement.",
    rating: 4.0,
    totalLearners: 148,
    activeLearners: 120,
    newLearners: 28,
    completionRate: 85,
    totalModules: 10,
    totalQuizzes: 10,
    duration: "6 hours",
    lastUpdated: "1 week ago",
    status: "Active",
    enrolledLearners: [
      {
        id: 1,
        name: "Daniel Ruda",
        email: "danielruba@gmail.com",
        progress: 75,
        lastActivity: "2 hours ago",
        status: "Active",
      },
      {
        id: 2,
        name: "Bradley Binod",
        email: "bradleybinod@gmail.com",
        progress: 100,
        lastActivity: "1 day ago",
        status: "Completed",
      },
      {
        id: 3,
        name: "Jackson James",
        email: "jacksonjames@gmail.com",
        progress: 45,
        lastActivity: "3 days ago",
        status: "Active",
      },
      {
        id: 4,
        name: "Kola Jola",
        email: "kolajola@gmail.com",
        progress: 90,
        lastActivity: "5 hours ago",
        status: "Active",
      },
      {
        id: 5,
        name: "Olivia Wye",
        email: "oliviawye@gmail.com",
        progress: 60,
        lastActivity: "1 week ago",
        status: "Inactive",
      },
    ],
    modules: [
      {
        id: 1,
        title: "Introduction to Digital Marketing",
        videos: 4,
        duration: "45 minutes",
        completedBy: 120,
      },
      {
        id: 2,
        title: "Understanding Your Audience",
        videos: 3,
        duration: "35 minutes",
        completedBy: 110,
      },
      {
        id: 3,
        title: "Social Media Marketing Fundamentals",
        videos: 5,
        duration: "60 minutes",
        completedBy: 95,
      },
      {
        id: 4,
        title: "Content Creation Strategies",
        videos: 4,
        duration: "50 minutes",
        completedBy: 85,
      },
      {
        id: 5,
        title: "Social Media Advertising",
        videos: 6,
        duration: "75 minutes",
        completedBy: 70,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {courseDetails.title}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Course Overview Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {courseDetails.title}
            </h2>
            <p className="text-gray-600 mb-4">{courseDetails.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{courseDetails.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Updated {courseDetails.lastUpdated}</span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  courseDetails.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {courseDetails.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-[#13485B]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Total Learners
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {courseDetails.totalLearners}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Active Learners
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {courseDetails.activeLearners}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Completion Rate
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {courseDetails.completionRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Duration</h3>
              <p className="text-3xl font-bold text-gray-900">
                {courseDetails.duration}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content and Learners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Modules */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Course Modules
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {courseDetails.modules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">
                      {module.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{module.videos} videos</span>
                      <span>{module.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-800">
                      {module.completedBy} learners
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enrolled Learners */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Enrolled Learners
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courseDetails.enrolledLearners.map((learner) => (
                  <tr key={learner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {learner.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {learner.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-[#13485B] h-2 rounded-full"
                            style={{ width: `${learner.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          {learner.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          learner.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : learner.status === "Active"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {learner.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {learner.lastActivity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#13485B] text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Edit className="w-4 h-4" />
          <span>Edit Course</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Users className="w-4 h-4" />
          <span>View All Learners</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <BookOpen className="w-4 h-4" />
          <span>Course Analytics</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <Trash2 className="w-4 h-4" />
          <span>Delete Course</span>
        </button>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
