"use client";
import React from "react";
import Image from "next/image";

import Header from "@/components/Header";

import secondaryBg from "@/public/secondary-background.jpg";

type Props = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-auto">
      <Header />
      <Image
        src={secondaryBg}
        priority
        layout="fill"
        objectFit="cover"
        alt="secondary-background"
      />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default AuthLayout;
