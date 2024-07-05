import React from "react";
import TopBanner from "@/components/reusables/dashboard/TopBanner";
import RecommendCourse from "@/components/reusables/dashboard/RecommendCourse";
import CourseOverview from "@/components/reusables/dashboard/CourseOverview";
import RecentlyEnrolledCourse from "@/components/reusables/dashboard/RecentlyEnrolledCourse";

const HomePage = () => {
  return (
    <div className="">
      <TopBanner />

      <div className="my-10">
        <CourseOverview />
        <RecentlyEnrolledCourse />
        <RecommendCourse />
      </div>
    </div>
  );
};

export default HomePage;
