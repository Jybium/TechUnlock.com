"use client";

import Footer from "@/components/reusables/Footer";
import Modal from "@/components/reusables/Modal";
import Navbar from "@/components/reusables/Navbar";
import { ModalProvider } from "@/Context/modal";
import { usePathname } from "next/navigation";
import React from "react";

const Layout = ({ children }) => {
  const path = usePathname();
  return (
    <ModalProvider>
      <main className="">
        {!path.includes("pay") && !path.includes("verify") && <Navbar />}

        <section className="relative h-full w-full">{children}</section>
        {!path.includes("pay") && !path.includes("verify") && <Footer />}
      </main>
    </ModalProvider>
  );
};

export default Layout;
