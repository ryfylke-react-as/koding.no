import netlifyIdentity from "netlify-identity-widget";

export type NetlifyIndentify = typeof netlifyIdentity;

declare global {
  interface Window {
    netlifyIdentity: NetlifyIndentify;
  }
}
