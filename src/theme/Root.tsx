import React, { useEffect } from "react";
import { authContext } from "../auth";

// Default implementation, that you can customize
export default function Root({ children }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [netlifyIdentity, setNetlifyIdentity] =
    React.useState(null);
  useEffect(() => {
    import("netlify-identity-widget").then((netlifyIdentity) => {
      netlifyIdentity.on("login", () => setIsLoggedIn(true));
      netlifyIdentity.on("logout", () => setIsLoggedIn(false));
      netlifyIdentity.setLocale("no");
      netlifyIdentity.init();
      setNetlifyIdentity({ ...netlifyIdentity });
    });
  }, []);

  return (
    <authContext.Provider
      value={
        netlifyIdentity
          ? {
              ...netlifyIdentity,
              isLoggedIn,
            }
          : null
      }
    >
      {children}
    </authContext.Provider>
  );
}
