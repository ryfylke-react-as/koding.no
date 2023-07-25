import netlifyIdentity from "netlify-identity-widget";

declare global {
  interface Window {
    netlifyIdentity: typeof netlifyIdentity;
  }
}

window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();

export const auth = netlifyIdentity;
