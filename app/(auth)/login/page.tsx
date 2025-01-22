"use client";
import React from "react";
import Image from "next/image";
import { Snowfall } from "react-snowfall";
import { Fireworks } from "@fireworks-js/react";

import LoginModal from "@/components/LoginModal";
import LoginButton from "@/components/LoginButton";

import lantern from "@/public/lantern.gif";
import yellowBlossom from "@/public/yellow-blossom.png";

const LoginPage: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [images, setImages] = React.useState<CanvasImageSource[]>([]);

  const handleClick = () => {
    setIsOpen(true);
  };

  React.useEffect(() => {
    const snowflake1 = document.createElement("img");
    snowflake1.src = yellowBlossom.src;
    snowflake1.alt = "snow-flake";
    const images = [snowflake1];
    setImages(images);
  }, []);

  return (
    <div className="h-full flex flex-col gap-4 pt-40 items-center">
      <p className="font-playwrite-india text-4xl md:text-6xl font-bold mb-10 text-red-500 z-10 text-center flex flex-col xl:flex-row gap-6 gap-y-6 md:gap-y-20 leading-10 md:w-fit">
        <span>Happy</span>
        <span>Lunar New Year</span>
        <span>2025</span>
      </p>
      <LoginButton onClick={handleClick}>Đăng nhập</LoginButton>
      <div className="fixed w-screen -top-10 left-1/2 -translate-x-61 flex">
        <Image src={lantern} alt="lantern" className="w-60" />
        <Image src={lantern} alt="lantern" className="w-60" />
        <Image src={lantern} alt="lantern" className="w-60 hidden" />
        <Image src={lantern} alt="lantern" className="w-60 hidden" />
      </div>
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
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default LoginPage;
