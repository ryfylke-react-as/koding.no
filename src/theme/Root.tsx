import React, { useEffect } from "react";
import { authContext } from "../auth";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

// Default implementation, that you can customize
export default function Root({ children }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [netlifyIdentity, setNetlifyIdentity] =
    React.useState(null);

  useEffect(() => {
    import("netlify-identity-widget").then((netlifyIdentity) => {
      netlifyIdentity.on("login", () => {
        setIsLoggedIn(true);
        setNetlifyIdentity({ ...netlifyIdentity });
        netlifyIdentity.close();
      });
      netlifyIdentity.on("logout", () => setIsLoggedIn(false));
      netlifyIdentity.init({
        locale: "no",
      });
      setNetlifyIdentity({ ...netlifyIdentity });
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
