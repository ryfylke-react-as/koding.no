import { useEffect } from "react";
import { NetlifyIndentify } from ".";

export function useAuth(): NetlifyIndentify | null {
  useEffect(() => {
    if (
      typeof window !== undefined &&
      window.netlifyIdentity === undefined
    ) {
      import("netlify-identity-widget").then(
        (netlifyIdentity) => {
          window.netlifyIdentity = netlifyIdentity;
          netlifyIdentity.init();
        }
      );
    }
  }, []);

  return typeof window !== undefined
    ? window.netlifyIdentity
    : null;
}
