/* eslint-disable @next/next/no-img-element */

import Programs from "../Programs";
import More from "../More";
import image from "@/assets/images/logo.svg";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-around bg-pri1 font-sora py-2 rounded-md">
      <div className="md:cursor-pointer z-50 md:w-auto w-full flex items-center justify-between">
        <Image
          src={image}
          alt="techUnlock logo"
          className="w-60"
        />
      </div>
      <div className="md:flex hidden items-center gap-12 text-sec10">
        <span className="text-xl font-semibold">About</span>
        <Programs />
        <span className="text-xl font-semibold">FAQs</span>
        <More />
      </div>
      <div className="md:flex items-center gap-5 hidden">
        <button className="text-pri9 border-primary border-2 bg-white w-20 p-3 rounded-xl">
          Login
        </button>
        <button className="w-52 p-3 rounded-xl text-white bg-primary">
          Create an Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
