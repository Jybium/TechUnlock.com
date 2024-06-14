/* eslint-disable @next/next/no-img-element */

import Programs from "./landingPage/Programs";
import More from "./landingPage/More";
import image from "@/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-around bg-pri1 font-sora py-2 rounded-md">
      <Link href="/">
        <div className="md:cursor-pointer z-50 md:w-auto w-full flex items-center justify-between">
          <Image src={image} alt="techUnlock logo" className="w-60" />
        </div>
      </Link>
      <div className="md:flex hidden items-center gap-12 text-sec10">
        <Link href="/about-us" className="text-xl font-semibold cursor-pointer">
          About
        </Link>
        <Programs />
        <Link href="/faqs" className="text-xl font-semibold cursor-pointer">
          FAQs
        </Link>
        <More />
      </div>
      <div className="md:flex items-center gap-5 hidden">
        <Link href="/login" className="cursor-pointer">
          <button className="text-pri9 border-primary border-2 bg-white w-20 p-3 rounded-xl">
            Login
          </button>
        </Link>

        <Link href="/register" className="cursor-pointer">
          <button className="w-52 p-3 rounded-xl text-white bg-primary">
            Create an Account
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
