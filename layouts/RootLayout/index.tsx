"use client";
import React from "react";

import { createClient } from "@/utils/client";
import useAuthStore from "@/store/authStore";

type Props = {
  children: React.ReactNode;
};

const AuthStateLayout: React.FC<Props> = ({ children }) => {
  const supabase = createClient();
  const { setUser } = useAuthStore();

  React.useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        if (!session) {
          setUser(null);
        } else {
          const { user } = session;
          setUser({ id: user.id, email: user.email, ...user.user_metadata });
        }
      }

      if (event === "SIGNED_IN") {
        if (!session) {
          setUser(null);
        } else {
          const { user } = session;
          setUser({ id: user.id, email: user.email, ...user.user_metadata });
        }
      }

      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return <>{children}</>;
};

export default AuthStateLayout;
