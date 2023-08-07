import useIsBrowser from "@docusaurus/useIsBrowser";
import React from "react";

export function useCurrentDocID() {
  const isBrowser = useIsBrowser();
  const docId = React.useMemo(() => {
    if (!isBrowser) {
      return "__server__";
    }
    const url = new URL(window.location.href);
    const path = url.pathname.split("/");
    path.shift();
    const asText = path.join("/");
    if (asText.endsWith("/")) {
      path.pop();
    }
    return path.join("/");
  }, [isBrowser]);

  return docId;
}
