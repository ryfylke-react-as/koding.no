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
      <div className="dropdown dropdown--hoverable">
        <Link
          href="/profil"
          className="navbar__item navbar__link"
          style={{ marginRight: "0.5rem" }}
        >
          🔐 {auth.currentUser().user_metadata.full_name}
        </Link>

        <ul className="dropdown__menu">
          <li>
            <Link className="dropdown__link" href="/profil">
              Profil
            </Link>
          </li>
          <li>
            <Link
              className="dropdown__link"
              href="#"
              onClick={() => {
                auth.logout();
              }}
            >
              Logg ut
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div className="dropdown dropdown--hoverable">
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          auth.open("login");
        }}
        className="navbar__item navbar__link"
        style={{ marginRight: "0.5rem" }}
      >
        🔐 Lokal bruker
      </Link>
      <ul className="dropdown__menu">
        <li>
          <Link
            className="dropdown__link"
            href="#"
            onClick={() => {
              auth.open("login");
            }}
          >
            Logg inn
          </Link>
        </li>
      </ul>
    </div>
  );
}
