import React, { useEffect } from "react";
import { authContext } from "../auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastList } from "../components/ToastList/ToastList";
import { toast } from "../lib/toast";

export const queryClient = new QueryClient();

// Default implementation, that you can customize
export default function Root({ children }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [netlifyIdentity, setNetlifyIdentity] =
    React.useState(null);

  useEffect(() => {
    import("netlify-identity-widget").then(
      (importedNetlifyIdentity) => {
        importedNetlifyIdentity.on("login", () => {
          setIsLoggedIn(true);
          setNetlifyIdentity({ ...importedNetlifyIdentity });
          importedNetlifyIdentity.close();
          importedNetlifyIdentity.refresh().catch((err) => {
            importedNetlifyIdentity.logout();
          });
        });
        importedNetlifyIdentity.on("logout", () => {
          setIsLoggedIn(false);
          toast({
            title: "Du er nå logget ut",
            kind: "success",
          });
        });
        importedNetlifyIdentity.init({
          locale: "no",
        });
        setNetlifyIdentity({ ...importedNetlifyIdentity });
      }
    );
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
        <ToastList />
      </authContext.Provider>
    </QueryClientProvider>
  );
}
