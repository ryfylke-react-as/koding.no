import React from "react";
import Link from "@theme-original/DocSidebarItem/Link";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { useQuery } from "react-query";
import { useFetch } from "@site/src/utils/api";

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
  const appFetch = useFetch();
  const query = useQuery({
    queryKey: ["doc", props.item.docId],
    queryFn: async () => {
      const res = await appFetch<{
        completed: boolean;
      }>("/.netlify/functions/is-completed", {
        method: "POST",
        body: JSON.stringify({
          id: props.item.docId,
        }),
      });

      return res;
    },
  });

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
        {query.data && query.data.completed && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            style={{
              width: "1em",
              height: "1em",
            }}
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
