import React from "react";
import ColorModeToggle from "@theme-original/Navbar/ColorModeToggle";
import { useAuth } from "@site/src/auth/useAuth";
import useIsBrowser from "@docusaurus/useIsBrowser";
import Link from "@docusaurus/Link";

export default function ColorModeToggleWrapper(props) {
  return (
    <>
      <LoginButton />
      <ColorModeToggle {...props} />
    </>
  );
}

function LoginButton() {
  const auth = useAuth();
  const isBrowser = useIsBrowser();

  if (!isBrowser) {
    return null;
  }
  if (auth.isLoggedIn) {
    return (
      <Link
        href="/profil"
        className="navbar__item navbar__link"
        style={{ marginRight: "0.5rem" }}
      >
        🙋 Profil
      </Link>
    );
  }
  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        auth.open("login");
      }}
      className="navbar__item navbar__link"
      style={{ marginRight: "0.5rem" }}
    >
      🔐 Logg inn
    </Link>
  );
}
