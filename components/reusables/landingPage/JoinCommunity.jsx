import React from "react";
import Image from "next/image";
import community from "@/assets/landing-page/community.svg";
import Link from "next/link";

const JoinCommunity = () => {
  return (
    <div className="w-full">
      <h1 className="text-first-primary font-semibold text-3xl lg:text-4xl text-center">
        Join our Community
      </h1>
      <div className="lg:flex lg:justify-between items-center w-[90%] mx-auto mt-8">
        <div className="lg:w-[40%]">
          <h2 className="text-first-primary font-semibold text-2xl lg:text-4xl leading-[1.3]">
            Start{" "}
            <Link href="/courses" className="text-primary">
              learning
            </Link>{" "}
            a tech skill now or get{" "}
            <Link href="/contact-us" className="text-primary">
              in touch
            </Link>{" "}
            with us and ask your
            <Link href="/faqs" className="text-primary">
              {" "}
              questions.
            </Link>
          </h2>
        </div>
        <div className="lg:w-[50%] lg:ml-auto">
          <Image
            src={community}
            alt="community interaction"
            className="block h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinCommunity;
