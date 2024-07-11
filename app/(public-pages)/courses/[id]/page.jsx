import React from "react";
import SpecificCoursePage from "@/page/SpecificCoursePage";
import SelectPaymentGuide from "@/page/CoursePayment";

const page = () => {
  return (
    <div className="">
      <SelectPaymentGuide/>
      <SpecificCoursePage />
    </div>
  );
};

export default page;
