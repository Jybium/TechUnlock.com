import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import image from "@/assets/landing-page/authImage.png";
import Link from "next/link";

export const footerLinks = [
  { id: 1, name: "FAQs", url: "/faqs" },
  { id: 2, name: "Privacy Policy", url: "/privacy-policy" },
  { id: 3, name: "Terms", url: "/terms-and-conditions" },
];

const AuthLayout = ({ children, title, message, action, to }) => {
  return (
    <div className="w-[90%] h-full my-10 mx-auto">
      {/* This is the whole page content */}
      <div className="flex flex-col justify-between w-full space-y-10">
        {/* This is for the Logo header */}
        <Image
          src={logo}
          alt="logo"
          className="object-contain w-[10rem] md:w-[13rem] lg:w-[16.38rem]"
        />

        <div className="flex justify-between items-start">
          {/* This space is for the form */}
          <div className="w-full lg:w-[40%] grid gap-y-[1.2rem]">
            <div className="grid gap-y-1">
              <h1 className="font-bold text-3xl">{title}</h1>
              <p className="text-sm flex gap-x-1 items-center">
                {message}{" "}
                <Link className="text-primary" href={`/${to}`}>
                  {action}
                </Link>
              </p>
            </div>
            <div className="">{children}</div>
          </div>

          {/* This is for the image part */}
          <div className="md:w-3/6 hidden lg:block">
            <Image
              src={image}
              alt="a lady holding a laptop"
              className="block object-cover w-full h-4/6"
            />
          </div>
        </div>

        {/* This is for the footer link part */}
        <div className="flex justify-between md:w-1/2 w-5/6 mx-auto">
          {footerLinks.map(({ id, name, url }) => (
            <Link key={id} href={url}>
              <p className="text-sm text-gray-900">{name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
