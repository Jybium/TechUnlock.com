"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  DollarSign,
  FileText,
} from "lucide-react";
import {
  getDashboardStats,
  getLearnersStats,
  getCourseStats,
  getPaymentStats,
} from "@/services/admin";
import { showErrorToast } from "@/helpers/toastUtil";

const AdminAnalyticsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30");
  const [analyticsData, setAnalyticsData] = useState({
    overview: [],
    trends: [],
    courseAnalytics: [],
    learnerAnalytics: [],
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);

        // Fetch all analytics data in parallel
        const [dashboardStats, learnersStats, courseStats, paymentStats] =
          await Promise.all([
            getDashboardStats(),
            getLearnersStats(),
            getCourseStats(),
            getPaymentStats(),
          ]);

        // Transform overview metrics
        const overviewData = [
          {
            title: "Total Revenue",
            value: `₦${paymentStats?.total_revenue?.toLocaleString() || "0"}`,
            change: paymentStats?.revenue_growth || 0,
            icon: DollarSign,
            color: "bg-green-100",
            trend: paymentStats?.revenue_growth > 0 ? "up" : "down",
          },
          {
            title: "Total Learners",
            value: learnersStats?.total_learners?.toString() || "0",
            change: learnersStats?.learner_growth || 0,
            icon: Users,
            color: "bg-blue-100",
            trend: learnersStats?.learner_growth > 0 ? "up" : "down",
          },
          {
            title: "Active Courses",
            value: courseStats?.total_courses?.toString() || "0",
            change: courseStats?.course_growth || 0,
            icon: BookOpen,
            color: "bg-purple-100",
            trend: courseStats?.course_growth > 0 ? "up" : "down",
          },
          {
            title: "Completion Rate",
            value: `${dashboardStats?.completion_rate?.toFixed(1) || "0"}%`,
            change: dashboardStats?.completion_growth || 0,
            icon: FileText,
            color: "bg-yellow-100",
            trend: dashboardStats?.completion_growth > 0 ? "up" : "down",
          },
        ];

        // Transform trends data
        const trendsData =
          dashboardStats?.trends?.map((trend) => ({
            period: trend.period,
            revenue: trend.revenue || 0,
            learners: trend.learners || 0,
            enrollments: trend.enrollments || 0,
          })) || [];

        // Transform course analytics
        const courseAnalyticsData =
          courseStats?.course_performance?.map((course) => ({
            name: course.course_name || "Unknown Course",
            enrollments: course.total_enrollments || 0,
            completions: course.completions || 0,
            revenue: course.revenue || 0,
            rating: course.average_rating || 0,
          })) || [];

        // Transform learner analytics
        const learnerAnalyticsData =
          learnersStats?.learner_analytics?.map((learner) => ({
            segment: learner.segment || "Unknown",
            count: learner.count || 0,
            percentage: learner.percentage || 0,
          })) || [];

        setAnalyticsData({
          overview: overviewData,
          trends: trendsData,
          courseAnalytics: courseAnalyticsData,
          learnerAnalytics: learnerAnalyticsData,
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        showErrorToast("Failed to load analytics data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeRange]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#13485B] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.overview.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-800">
                  {metric.value}
                </p>
                <div className="flex items-center mt-2">
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`text-sm ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {Math.abs(metric.change)}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    vs last period
                  </span>
                </div>
              </div>
              <div
                className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}
              >
                <metric.icon className="w-6 h-6 text-[#13485B]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Course Performance
          </h3>
          <div className="space-y-4">
            {analyticsData.courseAnalytics.length > 0 ? (
              analyticsData.courseAnalytics.map((course, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-800">{course.name}</h4>
                    <p className="text-sm text-gray-500">
                      {course.enrollments} enrollments • {course.completions}{" "}
                      completions
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      ₦{course.revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      ⭐ {course.rating.toFixed(1)} rating
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No course performance data available
              </div>
            )}
          </div>
        </div>

        {/* Learner Segments */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Learner Segments
          </h3>
          <div className="space-y-4">
            {analyticsData.learnerAnalytics.length > 0 ? (
              analyticsData.learnerAnalytics.map((segment, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {segment.segment}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {segment.count} learners
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      {segment.percentage}%
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No learner segment data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trends Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Trends Over Time
        </h3>
        <div className="space-y-4">
          {analyticsData.trends.length > 0 ? (
            analyticsData.trends.map((trend, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-800">{trend.period}</h4>
                </div>
                <div className="flex space-x-8">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="font-semibold text-gray-800">
                      ₦{trend.revenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Learners</p>
                    <p className="font-semibold text-gray-800">
                      {trend.learners}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Enrollments</p>
                    <p className="font-semibold text-gray-800">
                      {trend.enrollments}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No trend data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
