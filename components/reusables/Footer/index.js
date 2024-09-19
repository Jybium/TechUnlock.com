<<<<<<< HEAD:components/reusables/Footer.jsx
"use client";

import Image from "next/image";
=======
/* eslint-disable @next/next/no-img-element */
>>>>>>> 7e33099e2438a0958a6a686fd09195b2be827a4f:components/reusables/Footer/index.js
import FooterImage from "@/assets/images/footer-logo.svg";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();

  const scrollToTop = () => {
    router.push("/");
  };

  return (
    <footer className="text-white py-8 bg-sky-500 relative w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-800 opacity-50"></div>
<<<<<<< HEAD:components/reusables/Footer.jsx
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
=======
      <section className="mx-auto z-10 px-4 py-8 flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="z-10 pl-10 mb-6 md:mb-0 md:w-2/5 flex justify-center md:justify-start">
          <img src={FooterImage} alt="Logo" className="w-38" />
>>>>>>> 7e33099e2438a0958a6a686fd09195b2be827a4f:components/reusables/Footer/index.js
        </div>
        <div className="w-full md:w-3/5 grid grid-cols-2 md:grid-cols-3 gap-x-5 z-10 md:flex md:justify-between">
          <div className="mb-6 md:mb-0 md:ml-auto md:w-1/3 text-left text-lg">
            <h3 className="font-bold mb-2 text-[#0A3747]">Company</h3>
            <ul>
              <li>
                <Link href="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0 md:w-1/3 text-left text-lg">
            <h3 className="font-bold mb-2 text-[#0A3747]">Programs</h3>
            <ul>
              <li>
<<<<<<< HEAD:components/reusables/Footer.jsx
                <Link
                  href="/courses?category=cyber"
                  className="hover:underline"
                >
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=ui/ux"
                  className="hover:underline"
                >
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="/courses?category=ai" className="hover:underline">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/courses?category=dm" className="hover:underline">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/courses?category=web" className="hover:underline">
                  Web Development
                </Link>
=======
                <a href="#" className="hover:underline">
                  Program 1
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Program 2
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Program 3
                </a>
>>>>>>> 7e33099e2438a0958a6a686fd09195b2be827a4f:components/reusables/Footer/index.js
              </li>
            </ul>
          </div>
          <div className="md:w-1/3 text-left text-lg">
            <h3 className="font-bold mb-2 text-[#0A3747]">Contacts</h3>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/techunlocknigeria"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  @techunlocknigeria
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/techunlock"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  @techunlock
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/TechUnlockNG"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  @TechUnlockNG
                </a>
              </li>
              <li>
                <a
                  href="mailto:admin@techunlock.org"
                  className="hover:underline"
                >
                  admin@techunlock.org
                </a>
              </li>
              <li>
                <a href="tel:07037734027" className="hover:underline">
                  07037734027
                </a>
              </li>
              <li>
                <a href="tel:09034770558" className="hover:underline">
                  09034770558
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
<<<<<<< HEAD:components/reusables/Footer.jsx
      <section className="mx-auto z-10 p-6 bg-[#0A3747] relative">
        <ul className="flex flex-wrap justify-center">
=======
      <section className="mx-auto z-10 p-6 bg-darkblue relative">
        <ul className="flex justify-center items-center">
>>>>>>> 7e33099e2438a0958a6a686fd09195b2be827a4f:components/reusables/Footer/index.js
          <li>
            <Link href="/faqs" className="hover:underline">
              FAQ’s
            </Link>
            <span className="lg:mx-4 mx-2">|</span>
          </li>
          <li>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <span className="lg:mx-4 mx-2">|</span>
          </li>
          <li>
            <Link href="/terms-and-conditions" className="hover:underline">
              Terms and Conditions
            </Link>
            <span className="lg:mx-4 mx-2">|</span>
          </li>
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="lg:mx-4 mx-2">|</span>
          </li>
          <li>
            <Link href="/courses" className="hover:underline">
              Start Learning
            </Link>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
