import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image src="/logo.png" alt="logo" width={32} height={32} />
      <h1 className="text-pri10 text-2xl font-semibold">Logo</h1>
    </div>
  );
};

export default Logo;
