import React, { useEffect } from "react";
import Link from "@theme-original/DocSidebarItem/Link";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { useQuery } from "react-query";
import { useFetch } from "@site/src/utils/api";
import { useCurrentDocID } from "@site/src/hooks/useCurrentDocID";
import useLazyQuery from "@site/src/hooks/useLazyQuery";
import { useAuth } from "@site/src/auth/useAuth";
import useGlobalData from "@docusaurus/useGlobalData";
import styles from "./index.module.scss";
import { progressChannel } from "@site/src/lib/custom-events";

export default function LinkWrapper(props) {
  const isBrowser = useIsBrowser();

  if (!isBrowser) {
    return (
      <>
        <Link {...props} />
      </>
    );
  }

  return <LinkWrapperInBrowser {...props} />;
}

const LinkWrapperInBrowser = (props) => {
  const [_rerenderer, rerender] = React.useState(0);
  const auth = useAuth();
  const appFetch = useFetch();
  const url = document.location.pathname;
  const docId = `${url.split("/")[1]}/${props.item.docId}`;
  const query = useQuery(
    ["progress", { docId: docId }],
    async () => {
      const res = await appFetch<{
        completed: boolean;
      }>("/.netlify/functions/is-completed", {
        method: "POST",
        body: JSON.stringify({
          id: docId,
        }),
      });

      return res;
    },
    {
      enabled: auth.isLoggedIn,
    }
  );
  const valueFromLocalStorage = localStorage.getItem(
    `progress-${docId}`
  );

  const runQuery = query.refetch;

  useEffect(() => {
    if (auth.isLoggedIn) {
      runQuery();
    }
  }, [auth.isLoggedIn]);

  useEffect(() => {
    const unsubscribe = progressChannel.subscribe((data) => {
      if (docId === data.docId) {
        rerender((p) => p + 1);
      }
    });
    return () => unsubscribe();
  }, [docId]);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          right: "0.875rem",
          top: "50%",
          transform: "translateY(-50%)",
          userSelect: "none",
          pointerEvents: "none",
          color: "var(--ifm-color-primary)",
        }}
      >
        {((auth.isLoggedIn &&
          query.data &&
          query.data.completed) ||
          valueFromLocalStorage === "true") && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className={styles.check}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        )}
      </div>
      <Link {...props} />
    </div>
  );
};
