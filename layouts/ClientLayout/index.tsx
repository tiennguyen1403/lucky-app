"use client";
import React from "react";

import Header from "@/components/Header";
import { createClient } from "@/utils/client";

type Props = {
  children: React.ReactNode;
};

const ClientLayout: React.FC<Props> = ({ children }) => {
  const supabase = createClient();

  React.useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("event :>> ", event);
      console.log("session :>> ", session);
    });
    return data.subscription.unsubscribe();
  }, []);
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
