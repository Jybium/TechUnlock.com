import React from "react";
import Image from "next/image";
import customercare from "@/assets/contact-page/Image.svg";
import ContactUsForm from "@/components/forms/ContactForm";

const ContactUs = () => {
  return (
    <div className="w-full my-[2rem] lg:my-[3rem]">
      <div className="lg:flex lg:justify-between items-center w-[95%] lg:w-[90%] mx-auto">
        <div className="lg:w-1/2 lg:ml-10 grid gap-y-12">
          <div className="grid gap-y-5 ml-6">
            <h1 className="text-4xl text-[#101828] font-semibold">
              Contact Us
            </h1>
            <p className="text-lg text-ash">
              Our friendly team would love to hear from you.
            </p>
          </div>
          <ContactUsForm />
        </div>

        <div className="w-1/2 hidden lg:grid">
          <Image
            src={customercare}
            alt="Customer Care"
            className="w-[90%] ml-auto h-full block object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
