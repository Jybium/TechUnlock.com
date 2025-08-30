import React from "react";
import Link from "next/link";
import Image from "next/image";
import image from "@/assets/dashboard-layout/logo.png";

const AdminLogo = () => {
  return (
    <div className="w-full">
      <Link href="/dashboard">
        <Image
          src={image}
          alt="logo"
          width={100}
          height={100}
          className="block w-2/3 mx-auto"
          priority
        />
      </Link>
    </div>
  );
};

export default AdminLogo;
