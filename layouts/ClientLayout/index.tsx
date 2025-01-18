"use client";
import React from "react";

import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
};

const ClientLayout: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="flex flex-col h-screen bg-no-repeat bg-cover bg-center"
      style={{ overflow: "auto" }}
    >
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ClientLayout;
