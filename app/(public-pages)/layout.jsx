"use client";

import React, { useEffect } from "react";
import Footer from "@/components/reusables/Footer";
import Navbar from "@/components/reusables/Navbar";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const path = usePathname();

  return (
    <main className="">
      {!path.includes("pay") && !path.includes("verify") && <Navbar />}

      <section className="relative h-full w-full">{children}</section>
      {!path.includes("pay") && !path.includes("verify") && <Footer />}
    </main>
  );
};

export default Layout;
