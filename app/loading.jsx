import React from "react";
import Logo from "@/assets/images/logo.svg";
import Image from "next/image";

const Loading = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-50 z-50">
    <div className="animate-pulse inline-block" role="status">
      <Image src={Logo} alt="Logo" />
    </div>
  </div>
);

export default Loading;
