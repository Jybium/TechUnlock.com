"use client";

import React from "react";
import { useParams } from "next/navigation";
import { getCourses } from "@/services/course";
import Banner from "@/components/reusables/coursesPage/[id]/Banner";
import Description from "@/components/reusables/coursesPage/[id]/Description";
import Curriculum from "@/components/reusables/coursesPage/[id]/Curriculum";
import CourseAddOn from "@/components/reusables/coursesPage/[id]/CourseAddOn";
import FeedbackContainer from "@/components/reusables/coursesPage/[id]/FeedbackContainer";
import PromotionBanner from "@/components/reusables/coursesPage/[id]/PromotionBanner";

const SpecificCoursePage = () => {
  const { id } = useParams();
  const [Courses, setCourses] = React.useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        console.log("Courses data:", data);
        setCourses(data.filter((item) => item.id === id));
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []);

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
