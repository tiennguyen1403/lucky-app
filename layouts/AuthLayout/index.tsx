"use client";
import React from "react";

import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default AuthLayout;
