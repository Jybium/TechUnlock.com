import React from "react";
import TopBanner from "@/components/reusables/dashboard/TopBanner";
import RecommendCourse from "@/components/reusables/dashboard/RecommendCourse";

const HomePage = () => {
  return (
    <div className="">
      <TopBanner />

      <div className="my-10">
        <RecommendCourse />
      </div>
    </div>
  );
};

export default HomePage;
