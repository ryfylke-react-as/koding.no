import { useContext, useEffect, useRef, useState } from "react";
import { NetlifyIndentify, authContext } from ".";

export function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    return {
      isLoggedIn: false,
      currentUser: () => null,
      login: () => null,
      logout: () => null,
      open: () => null,
    };
  }
  return context;
}
