"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fireworks } from "@fireworks-js/react";

import useAuthStore from "@/store/authStore";
import LoginButton from "@/components/LoginButton";

import lantern from "@/public/lantern.gif";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleClick = () => {
    router.push("/profile");
    setUser({ email: "tien.nguyen.linh@nois.vn" });
  };

  return (
    <div className="h-full flex flex-col gap-4 pt-40 items-center">
      <p className="font-playwrite-india text-4xl md:text-6xl font-bold mb-10 text-red-500 z-50 text-center flex flex-col xl:flex-row gap-6 gap-y-6 md:gap-y-20 leading-10 md:w-fit">
        <span>Happy</span>
        <span>Lunar New Year</span>
        <span>2025</span>
      </p>
      <LoginButton onClick={handleClick}>Đăng nhập</LoginButton>
      <div className="fixed -top-10 left-1/2 -translate-x-1/2 flex">
        <Image src={lantern} alt="lantern" className="w-60" />
        <Image src={lantern} alt="lantern" className="w-60" />
        <Image src={lantern} alt="lantern" className="w-60" />
        <Image src={lantern} alt="lantern" className="w-60" />
      </div>
      <Fireworks
        autostart
        options={{ opacity: 0.5, acceleration: 1 }}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
        }}
      />
      <audio
        controls
        src="./background-sound.mp3"
        className="fixed bottom-4 left-1/2 -translate-x-1/2"
      />
    </div>
  );
};

export default LoginPage;
