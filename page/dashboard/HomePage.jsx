"use client";

import React from "react";
import { useAuth } from "@/Context/auth";
import { useRouter } from "next/navigation";
import TopBanner from "@/components/reusables/dashboard/TopBanner";
import RecommendCourse from "@/components/reusables/dashboard/RecommendCourse";
import CourseOverview from "@/components/reusables/dashboard/CourseOverview";
import RecentlyEnrolledCourse from "@/components/reusables/dashboard/RecentlyEnrolledCourse";
import { getUserDashboard } from "@/services/course";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { auth } = useAuth();
  const router = useRouter();
  const [overview, setOverview] = useState(null);
  const userType =
    typeof auth?.user_type === "string" ? auth.user_type : undefined;
  const isAdmin =
    userType === "Super Admin" ||
    userType === "Admin" ||
    Boolean(
      auth?.is_admin_user ||
        auth?.is_admin ||
        auth?.is_staff ||
        auth?.is_superuser
    );

  const [isNotEnrolled, setIsNotEnrolled] = useState(true);

  // Redirect admin users to admin dashboard
  useEffect(() => {
    console.log("Auth check:", { auth, isAdmin, userType });
    if (auth && isAdmin) {
      console.log("Redirecting admin user to /admin");
      router.replace("/admin");
    }
  }, [auth, isAdmin, router]);

  // Show loading while redirecting or if user is admin
  if (auth && isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#13485B] mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to admin dashboard...</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserDashboard();
        setOverview([
          {
            id: 1,
            name: "Enrolled",
            value: data?.course_count || 0,
            icon: null,
          },
          {
            id: 2,
            name: "Completed",
            value: data?.completed_courses || 0,
            icon: null,
          },
          {
            id: 3,
            name: "Certification",
            value: data?.badge_count || 0,
            icon: null,
          },
        ]);
        setIsNotEnrolled(!(data?.enrolled_courses?.length > 0));
      } catch (e) {
        // ignore, keep fallback
      }
    };
    load();
  }, []);

  return (
    <div className="">
      <TopBanner />
      <div className="my-10">
        <CourseOverview items={overview || undefined} />
        <RecentlyEnrolledCourse isNotEnrolled={isNotEnrolled} />
        <RecommendCourse />
      </div>
    </div>
  );
};

export default HomePage;
