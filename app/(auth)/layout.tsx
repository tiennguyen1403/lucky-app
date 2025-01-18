import React from "react";

import AuthLayout from "@/layouts/AuthLayout";

type Props = {
  children: React.ReactNode;
};

const AppAuthLayout: React.FC<Props> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default AppAuthLayout;
