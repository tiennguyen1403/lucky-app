import React from "react";

import ClientLayout from "@/layouts/ClientLayout";

type Props = {
  children: React.ReactNode;
};

const AppClientLayout: React.FC<Props> = ({ children }) => {
  return <ClientLayout>{children}</ClientLayout>;
};

export default AppClientLayout;
