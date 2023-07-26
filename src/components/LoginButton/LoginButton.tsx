import React from "react";
import { useAuth } from "@site/src/auth/useAuth";
import styles from "./LoginButton.module.scss";

export const LoginButton = () => {
  const auth = useAuth();

  if (auth.isLoggedIn) {
    return (
      <button
        className={styles.logout}
        onClick={() => {
          auth.logout().then(() => {
            window.location.reload();
          });
        }}
      >
        Logg ut
      </button>
    );
  }

  return (
    <button
      className={styles.login}
      onClick={() => {
        auth.open("login");
      }}
    >
      Logg inn
    </button>
  );
};
