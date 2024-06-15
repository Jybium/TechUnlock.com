import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { footerLinks } from "@/components/reusables/Layout/AuthLayout";
import { ArrowLeft } from "lucide-react";

const page = () => {
  return (
    <div className="flex flex-col w-[90%] h-screen mx-auto py-10">
      {/* This is for the Logo header */}
      <div className="">
        <Image
          src={logo}
          alt="TechUnlock Logo"
          className="object-contain w-[10rem] md:w-[13rem] lg:w-[16.38rem]"
        />
      </div>

      {/* main */}
      <div className="flex grow flex-col justify-between mt-10">
        <div className="flex flex-col justify-start items-center">
          {/* This space is for the form */}
          <div className="w-full grid gap-y-[1.2rem] text-center">
            <div className="grid gap-y-5">
              <h1 className="font-semibold text-2xl lg:text-3xl text-darkblue">
                Email confirmation
              </h1>
              <p className="lg:text-lg text-gray-900">
                A link to recover your account has been sent to your email!
              </p>
            </div>
          </div>
        </div>

        <Link
          className="text-primary flex justify-center items-center gap-x-2"
          href="/"
        >
          <ArrowLeft />
          <p>Go back</p>
        </Link>

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

export default page;
