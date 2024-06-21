import React from "react";
import Banner from "@/components/reusables/coursesPage/[id]/Banner";
import Description from "@/components/reusables/coursesPage/[id]/Description";
import Curriculum from "@/components/reusables/coursesPage/[id]/Curriculum";
import CourseAddOn from "@/components/reusables/coursesPage/[id]/CourseAddOn";
import FeedbackContainer from "@/components/reusables/coursesPage/[id]/FeedbackContainer";
import PromotionBanner from "@/components/reusables/coursesPage/[id]/PromotionBanner";

const SpecificCoursePage = () => {
  return (
    <div className="">
      <Banner />
      <Description />
      <Curriculum />
      <CourseAddOn />
      <FeedbackContainer />
      <PromotionBanner />
    </div>
  );
};

export default SpecificCoursePage;
