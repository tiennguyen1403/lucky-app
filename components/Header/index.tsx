"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProfileCircle } from "iconsax-react";

import useAuthStore from "@/store/authStore";

import logo from "@/public/logo.png";

const loginButtonClassName = `bg-white text-primary shadow-lg font-medium tracking-wider px-6 py-2 rounded-xl flex items-center gap-2 md:text-lg`;

const Header: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  const onClick = () => {
    router.push("/profile");
  };

  return (
    <div className="w-full py-6 px-10 flex flex-col md:flex-row items-center justify-between gap-4 z-10">
      <div className="bg-white py-4 px-6 rounded-2xl shadow-2xl">
        <Image src={logo} alt="logo" className="w-60" />
      </div>
      {user && (
        <button className={loginButtonClassName} onClick={onClick}>
          <ProfileCircle variant="Bold" size={32} color="#288bcb" />
          <span>{user.email}</span>
        </button>
      )}
    </div>
  );
};

export default Header;
