"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogoutCurve, ProfileCircle } from "iconsax-react";

import useAuthStore from "@/store/authStore";
import { createClient } from "@/utils/client";

import logo from "@/public/logo.png";

const button = `flex items-center justify-center gap-1.5 outline-none bg-white rounded-xl shadow-xl px-3 py-1.5 flex-1`;

const Header: React.FC = () => {
  const router = useRouter();
  const supabase = createClient();
  const { user, setUser } = useAuthStore();

  const goProfile = () => {
    router.push("/profile");
  };

  const onSignOut = () => {
    setUser(null);
    supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <div className="w-full py-6 px-10 flex flex-col md:flex-row items-center justify-between gap-4 z-10">
      <Link
        target="_blank"
        href="https://nois.vn/"
        className="bg-white py-4 px-6 rounded-2xl shadow-2xl"
      >
        <Image src={logo} alt="logo" className="w-60" />
      </Link>
      {user && (
        <div className="flex items-center justify-between w-72 gap-4">
          <button className={button} onClick={goProfile}>
            <ProfileCircle variant="Bold" size="28" color="#288bcb" />
            <span className="text-primary text-[15px] font-semibold">Profile</span>
          </button>
          <button className={button} onClick={onSignOut}>
            <LogoutCurve size="28" color="#E21932" />
            <span className="text-error text-[15px] font-semibold">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
