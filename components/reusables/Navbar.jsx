"use client";

import { useEffect, useState } from "react";
import Programs from "./landingPage/Programs";
import { removeToken } from "@/helpers/removeToken";
import { useRouter, usePathname } from "next/navigation";
import More from "./landingPage/More";
import image from "@/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { fetchToken } from "@/helpers/getToken";
import { Menu, X } from "lucide-react";
import { showSuccessToast } from "@/helpers/toastUtil";
import axios from "axios";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Navbar = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [accountDetails, setAccountDetails] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [Open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchTokens = async () => {
      const token = await fetchToken();
      if (token) {
        setToken(token);
        fetchAccountDetails(token);
      } else {
        setToken("");
      }
    };

    fetchTokens();
  }, []);

  const fetchAccountDetails = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://techunlock.pythonanywhere.com/account/account-details/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAccountDetails(response.data);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        handleInvalidToken();
      } else {
        console.error("Failed to fetch account details:", error);
        // Optionally handle other errors
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInvalidToken = () => {
    // Remove token and redirect to login if pathname matches
    if (
      pathname.includes("pay") ||
      pathname.includes("register") ||
      pathname.includes("verify")
    ) {
      removeToken().then(() => {
        router.push("/login");
      });
    } else {
      // Optionally, handle other cases if needed
      removeToken();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMenu = () => {
    setOpen(!Open);
  };

  const handleLogout = async () => {
    await removeToken();
    showSuccessToast("Logged out successfully");
    window.location.href = "/";
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
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
        <Link href="/about-us" className="text-lg font-semibold cursor-pointer">
          About
        </Link>
        <Programs />
        <Link href="/faqs" className="text-lg font-semibold cursor-pointer">
          FAQs
        </Link>
        <More />
        <p className="">
          {token?.length !== 0 || Object.entries(token).length === 0}
        </p>
      </div>
      <div className="hidden lg:block">
        {loading ? (
          " "
        ) : token && Object.entries(token).length !== 0 ? (
          <div className="relative">
            <div
              onClick={toggleMenu}
              className="flex gap-x-3 items-center shadow rounded-md border border-sec10 py-2 px-4 bg-white cursor-pointer"
            >
              <p className="flex items-center capitalize">
                {accountDetails?.first_name} {accountDetails?.last_name}
              </p>
              <span className="">
                {Open ? (
                  <IoIosArrowUp size={16} />
                ) : (
                  <IoIosArrowDown size={16} />
                )}
              </span>
            </div>

            <p
              className={`${
                Open ? "block" : "hidden"
              } absolute top-11 z-10 cursor-pointer text-red-500 px-4 py-2 bg-white rounded shadow drop-shadow`}
              onClick={handleLogout}
            >
              Logout
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
            onClick={handleNavLinkClick}
          >
            About
          </Link>

          <Programs onclick={handleNavLinkClick} />

          <Link
            href="/faqs"
            className="text-xl font-semibold cursor-pointer"
            onClick={handleNavLinkClick}
          >
            FAQs
          </Link>

          <More onclick={handleNavLinkClick} />

          {loading ? (
            " "
          ) : token && Object.entries(token).length !== 0 ? (
            <div className="relative">
              <div
                onClick={toggleMenu}
                className="flex gap-x-3 w-fit items-center shadow rounded-md border border-sec10 py-2 px-4 bg-white cursor-pointer"
              >
                <p className="flex items-center capitalize">
                  {accountDetails?.first_name} {accountDetails?.last_name}
                </p>
                <span className="">
                  {Open ? (
                    <IoIosArrowUp size={16} />
                  ) : (
                    <IoIosArrowDown size={16} />
                  )}
                </span>
              </div>

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
            <div className="flex flex-row items-center gap-5">
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
