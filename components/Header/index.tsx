"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/authStore";

import logo from "@/public/logo.png";

const Header: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  const onClick = () => {
    router.push("/profile");
  };

  return (
    <div className="w-full py-6 px-10 flex flex-col md:flex-row items-center justify-between gap-4 z-10">
      <Image src={logo} alt="logo" className="w-80" />
      {user && (
        <button
          className="bg-white text-primary shadow-lg font-medium tracking-wider px-6 py-1 rounded-lg md:py-2 md:text-xl"
          onClick={onClick}
        >
          {user.email}
        </button>
      )}
    </div>
  );
};

export default Header;
