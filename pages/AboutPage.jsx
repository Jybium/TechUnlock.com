import React from "react";
import Banner from "@/components/reusables/aboutPage/Banner";
import WhoWeAre from "@/components/reusables/aboutPage/WhoWeAre";
import Founder from "@/components/reusables/aboutPage/Founder";
import Offers from "@/components/reusables/aboutPage/Offers";
import Testimonial from "@/components/reusables/aboutPage/Testimonial";

const AboutPage = () => {
  return (
    <div className="w-full h-full min-h-screen bg-white">
      <Banner />

      <div className="relative z-30 bg-white">
        <Offers />
        <WhoWeAre />
        <Testimonial />
        <Founder />
      </div>
    </div>
  );
};

export default AboutPage;
