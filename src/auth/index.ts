import netlifyIdentity from "netlify-identity-widget";
import { createContext, useContext } from "react";

export type NetlifyIndentify = typeof netlifyIdentity;

export const authContext = createContext<
  | (NetlifyIndentify & {
      isLoggedIn: boolean;
    })
  | null
>(null);
