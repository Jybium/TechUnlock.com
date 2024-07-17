"use client";

import { useEffect, useState } from "react";
import Programs from "./landingPage/Programs";
import { removeToken } from "@/helpers/removeToken";
import { useRouter } from "next/navigation";
import More from "./landingPage/More";
import image from "@/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { fetchToken } from "@/helpers/getToken";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Menu, X } from "lucide-react";
import { showSuccessToast } from "@/helpers/toastUtil";

const Navbar = () => {
  const [token, setToken] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [Open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchTokens = async () => {
      const token = await fetchToken();
      if (token) {
        setToken(token);
      } else {
        setToken("");
      }
    };

    fetchTokens();
    console.log(token);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMenu = () => {
    setOpen(!Open);
  };

  const handleLogout = async () => {
    const data = await removeToken();
    showSuccessToast(data);
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-around bg-pri1 font-sora py-4 lg:py-2 rounded-md">
      <Link href="/">
        <div className="md:cursor-pointer z-50 md:w-auto w-full flex items-center justify-between">
          <Image src={image} alt="techUnlock logo" className="w-48 lg:w-60" />
        </div>
      </Link>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-sec10" />
          ) : (
            <Menu className="h-6 w-6 text-sec10" />
          )}
        </button>
      </div>

      <div className="md:flex hidden items-center gap-12 text-sec10">
        <Link href="/about-us" className="text-xl font-semibold cursor-pointer">
          About
        </Link>
        <Programs />
        <Link href="/faqs" className="text-xl font-semibold cursor-pointer">
          FAQs
        </Link>
        <More />
        <p className="">
          {token?.length !== 0 || Object.entries(token).length === 0}
        </p>
      </div>
      <div className="hidden lg:block">
        {token && Object.entries(token).length !== 0 ? (
          <div className="relative">
            <Avatar onClick={toggleMenu}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <p
              className={`${
                Open ? "block" : "hidden"
              } absolute top-10 z-10 cursor-pointer text-red-500 px-4 py-2 bg-white rounded shadow drop-shadow`}
              onClick={handleLogout}
            >
              logout
            </p>
          </div>
        ) : (
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
        )}
      </div>

      <div
        className={`lg:hidden items-center gap-12 text-sec10 ${
          isMobileMenuOpen ? "grid bg-pri1 z-50" : "hidden"
        } flex-col md:flex-row absolute md:relative  top-16 left-0 right-0 md:top-auto md:left-auto md:right-auto bg-pri1 md:bg-pri1`}
      >
        <div className="w-5/6 mx-auto py-6">
          <Link
            href="/about-us"
            className="text-xl font-semibold cursor-pointer"
          >
            About
          </Link>
          <Programs />
          <Link href="/faqs" className="text-xl font-semibold cursor-pointer">
            FAQs
          </Link>
          <More />

          {token && Object.entries(token).length !== 0 ? (
            <div className="relative">
              <Avatar onClick={toggleMenu}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <p
                className={`${
                  Open ? "block" : "hidden"
                } absolute top-10 z-10 cursor-pointer text-red-500 px-4 py-2 bg-white rounded shadow drop-shadow`}
                onClick={handleLogout}
              >
                logout
              </p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-5">
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
