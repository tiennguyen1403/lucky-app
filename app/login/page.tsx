"use client";
import React from "react";
import Image from "next/image";
import Snowfall from "react-snowfall";
import { signIn } from "next-auth/react";
import { Fireworks } from "@fireworks-js/react";

import LoginButton from "@/components/LoginButton";

import logo from "@/public/logo.png";
import yellowBlossom from "@/public/yellow-blossom.png";

const LoginPage: React.FC = () => {
  const image1 = document.createElement("img");
  image1.src = yellowBlossom.src;

  const images = [image1];

  const handleClick = () => {
    signIn("azure-ad");
  };

  return (
    <div className="bg-secondary bg-no-repeat bg-cover bg-center h-full flex flex-col gap-4 justify-center items-center">
      <div className="fixed top-0 left-0"></div>
      <div className="fixed w-full top-6 left-1/2 -translate-x-1/2 flex justify-center">
        <Image src={logo} alt="logo" className="scale-75" />
      </div>
      <p className="font-playwrite-india text-4xl md:text-6xl font-bold mb-10 text-red-500 z-50 text-center flex flex-col xl:flex-row gap-6 gap-y-6 md:gap-y-20 leading-10 md:w-fit">
        <span>Happy</span>
        <span>Lunar New Year</span>
        <span>2025</span>
      </p>
      <LoginButton onClick={handleClick}>Đăng nhập</LoginButton>
      <Snowfall images={images} radius={[1, 50]} snowflakeCount={20} />
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
      <audio src="./background-sound.mp3" className="fixed bottom-4 left-1/2 -translate-x-1/2" />
    </div>
  );
};

export default LoginPage;
