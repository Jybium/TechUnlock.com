"use client";

import Image from "next/image";
import FooterImage from "@/assets/images/footer-logo.svg";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const scrollToTop = () => {
    router.push("/");
  };

  return (
    <footer className="text-white relative w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-800 opacity-50"></div>
      <section className="w-full mx-auto z-10 px-4 flex flex-col md:flex-row justify-between items-start py-8 bg-[#1886AD] lg:h-[50vh]">
        <div className="flex justify-between w-full md:w-2/5">
          <div className="z-10 lg:pl-10 mb-6 md:mb-0 md:w-2/5 flex justify-start">
            <Image src={FooterImage} alt="Logo" className="w-38" />
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center justify-center md:hidden w-10 h-10 border font-bold border-white text-white rounded-full"
          >
            <ArrowUp />
          </button>
        </div>
        <div className="w-full md:w-3/5 flex gap-x-5 z-10 flex-row justify-between">
          <div className="mb-6 md:mb-0 md:ml-auto md:w-1/4 text-left">
            <h3 className="font-bold mb-2 text-[#0A3747]">Company</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0 md:w-1/3 text-left">
            <h3 className="font-bold mb-2 text-[#0A3747]">Programs</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Cybersecurity
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Artificial Intelligence
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Web Development
                </a>
              </li>
            </ul>
          </div>
          <div className="md:w-1/3 text-left">
            <h3 className="font-bold mb-2 text-[#0A3747]">Contacts</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  @techunlockNigeria
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  @Techunlock
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  07037734027
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  09034770558
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mx-auto z-10 p-6 bg-[#0A3747] relative">
        <ul className="flex flex-wrap justify-center">
          <li>
            <a href="#" className="hover:underline">
              FAQ’s
            </a>
            <span className="lg:mx-4 mx-2">|</span>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <span className="lg:mx-4 mx-2">|</span>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Terms and Conditions
            </a>
            <span className="lg:mx-4 mx-2">|</span>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Home
            </a>
            <span className="lg:mx-4 mx-2">|</span>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Start Learning
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
