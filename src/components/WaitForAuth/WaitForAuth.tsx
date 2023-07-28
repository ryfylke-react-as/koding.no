import BrowserOnly from "@docusaurus/BrowserOnly";
import { useAuth } from "@site/src/auth/useAuth";
import React from "react";

export function WaitForAuth(props: {
  children: React.ReactNode;
  loading?: React.ReactNode;
}) {
  const auth = useAuth();

  if (auth.initialized) {
    return (
      <BrowserOnly>{() => <>(props.children)</>}</BrowserOnly>
    );
  }
  return props.loading ?? null;
}
