import React from "react";
import discussion from "@/assets/contact-page/discussion.svg";
import Image from "next/image";
import methods from "@/data/contactMethods";
import MethodCards from "./MethodCards";

const ContactMethods = () => {
  return (
    <div className="py-[2rem] px-[1rem] lg:py-[4rem] lg:px-[3rem] bg-[#D5F0F9] mb-10">
      <div className="grid gap-y-[4rem]">
        <div className="grid gap-y-3 lg:gap-y-5 text-center">
          <p className="text-darkblue rounded-xl bg-[#D5F0F9] p-1 w-fit mx-auto">
            Contact us
          </p>
          <h2 className="font-semibold text-3xl text-darkblue">
            We’d love to hear from you
          </h2>
          <p className="text-gray-600 text-xl">Chat to our friendly team.</p>
        </div>

        <div className="grid gap-y-[2rem] lg:gap-y-[4rem]">
          <div className="w-full">
            <Image src={discussion} alt="People in a round table Discussion" />
          </div>
          <div className="grid gap-x-8 gap-y-4 lg:gap-y-0 lg:flex lg:justify-between items-center">
            {methods.map((item) => (
              <div key={item.id} className="w-full">
                <MethodCards item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMethods;
