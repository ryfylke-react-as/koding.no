import React from "react";
import { useAuth } from "@site/src/auth/useAuth";

export const LoginButton = () => {
  const auth = useAuth();

  if (auth.isLoggedIn) {
    return (
      <button
        onClick={() => {
          auth.logout().then(() => {
            window.location.reload();
          });
        }}
      >
        Logout
      </button>
    );
  }

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
