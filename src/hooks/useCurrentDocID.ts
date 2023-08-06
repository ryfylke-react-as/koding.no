import useIsBrowser from "@docusaurus/useIsBrowser";
import React from "react";

export function useCurrentDocID() {
  const isBrowser = useIsBrowser();
  const docId = React.useMemo(() => {
    if (!isBrowser) {
      return "__server__";
    }
    const url = new URL(window.location.href);
    const docId = url.pathname.split("/");
    docId.shift();
    return docId.join("/");
  }, [isBrowser]);

  return docId;
}
