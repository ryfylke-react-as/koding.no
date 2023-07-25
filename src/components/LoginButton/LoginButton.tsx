import React from "react";
import { useAuth } from "@site/src/auth/useAuth";

export const LoginButton = () => {
  const auth = useAuth();
  return (
    <button
      onClick={() => {
        auth.open("login");
      }}
    >
      Login
    </button>
  );
};
