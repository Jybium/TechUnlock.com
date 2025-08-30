"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ArrowRight, Award, BookOpen, Trophy } from "lucide-react";
import { getBadges, listUserBadges } from "@/services/badge";
import { useAuth } from "@/Context/auth";

const Page = () => {
  const [activeTab, setActiveTab] = useState("my-badges");
  const [badges, setBadges] = useState([]);

  const { auth } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const userId = auth?.id || auth?.user?.id;
        const data = userId ? await listUserBadges() : await getBadges();
        setBadges(
          (data || []).map((b, idx) => ({
            id: b.id || idx + 1,
            title: b.title || b.name || "Badge",
            description: b.description || "",
            modulesCompleted: b.modules_completed || 0,
            totalModules: b.total_modules || 0,
            progress: b.progress || 0,
            status: b.completed ? "completed" : "in-progress",
            badgeColor: b.completed
              ? "from-green-600 to-green-800"
              : "from-[#13485B] to-blue-800",
          }))
        );
      } catch (error) {
        console.error("Error loading badges:", error);
      }
    };
    load();
  }, [auth]);

  const handleGoBack = () => {
    console.log("Going back to previous page");
    // In a real app, this would use router.back() or similar
  };

  const handleContinueLearning = (badgeId) => {
    console.log(`Continue learning badge ${badgeId}`);
    // In a real app, this would navigate to the course
  };

  const handleBadgeClick = (badgeId) => {
    console.log(`Clicked on badge ${badgeId}`);
    // In a real app, this would show badge details or navigate to course
  };

  const getFilteredBadges = () => {
    if (activeTab === "my-badges") {
      return badges;
    } else {
      return badges.filter((badge) => badge.status === "in-progress");
    }
  };

  const getBadgeIcon = (status) => {
    if (status === "completed") {
      return <Trophy className="w-8 h-8 text-yellow-400" />;
    }
    return <BookOpen className="w-8 h-8 text-gray-400" />;
  };

  const EmptyState = ({ type }) => (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Award className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {type === "in-progress" ? "No courses in progress" : "No badges yet"}
      </h3>
      <p className="text-gray-600 max-w-sm mb-6">
        {type === "in-progress"
          ? "Start learning a new course to see your progress here."
          : "Complete courses to earn badges and showcase your achievements."}
      </p>
      <button className="bg-[#268FB6] text-white px-6 py-2 rounded-lg hover:bg-[#268FB6/80 transition-colors">
        Browse Courses
      </button>
    </div>
  );

  const filteredBadges = getFilteredBadges();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleGoBack}
          className="hover:bg-gray-200 rounded-full transition-colors mr-3"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Badges</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => setActiveTab("my-badges")}
          className={`px-4 py-2 font-medium rounded-xl transition-colors ${
            activeTab === "my-badges"
              ? "text-white bg-[#268FB6]"
              : "text-[#268FB6] border-transparent hover:text-gray-900"
          }`}
        >
          My Badges
        </button>
        <button
          onClick={() => setActiveTab("in-progress")}
          className={`px-4 py-2 ml-4 text-sm font-medium rounded-xl transition-colors ${
            activeTab === "in-progress"
              ? "text-white bg-[#268FB6]"
              : "text-[#268FB6] hover:bg-[#268FB6]/10"
          }`}
        >
          In Progress ({badges.filter((b) => b.status === "in-progress").length}
          )
        </button>
      </div>

      {/* Badge Cards or Empty State */}
      {filteredBadges.length === 0 ? (
        <EmptyState type={activeTab} />
      ) : (
        <div className="space-y-4">
          {filteredBadges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => handleBadgeClick(badge.id)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-md cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                {/* Badge Image */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${badge.badgeColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  {getBadgeIcon(badge.status)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 pr-2">
                      {badge.title}
                    </h3>
                    {badge.status === "completed" && (
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        Completed
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {badge.description}
                  </p>

                  {/* Progress Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {badge.modulesCompleted}/{badge.totalModules} Modules
                        completed
                      </span>
                      <span
                        className={`font-medium ${
                          badge.status === "completed"
                            ? "text-green-600"
                            : "text-[#13485B]"
                        }`}
                      >
                        {badge.progress}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          badge.status === "completed"
                            ? "bg-green-500"
                            : "bg-[#13485B]"
                        }`}
                        style={{ width: `${badge.progress}%` }}
                      ></div>
                    </div>

                    {/* Action Button */}
                    {badge.status === "in-progress" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContinueLearning(badge.id);
                        }}
                        className="flex items-center text-[#13485B] text-sm font-medium hover:text-blue-700 transition-colors mt-4 group"
                      >
                        Continue learning
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                    {badge.status === "completed" && (
                      <div className="flex items-center text-green-600 text-sm font-medium mt-4">
                        <Trophy className="w-4 h-4 mr-1" />
                        Badge Earned!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
