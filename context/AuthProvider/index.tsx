import React, { createContext, useState } from "react";

type IUser = {
  email: string;
};

type AuthContext = {
  user: IUser | null;
  setUser: (user: IUser) => void;
};

type AuthContextProvider = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<AuthContextProvider> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const contextValue: AuthContext = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
