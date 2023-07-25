import netlifyIdentity from "netlify-identity-widget";
import { createContext } from "react";

export type NetlifyIndentify = typeof netlifyIdentity;

declare global {
  interface Window {
    netlifyIdentity: NetlifyIndentify;
  }
}

export const authContext = createContext<
  | (NetlifyIndentify & {
      isLoggedIn: boolean;
    })
  | null
>(null);
