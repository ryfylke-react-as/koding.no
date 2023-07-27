import BrowserOnly from "@docusaurus/BrowserOnly";
import { useAuth } from "@site/src/auth/useAuth";
import { queryClient } from "@site/src/theme/Root";
import React, { useCallback, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { CheckItem } from "../CheckItem/CheckItem";
import useLazyQuery from "@site/src/hooks/useLazyQuery";
import { toast } from "@site/src/lib/toast";
import { useFetch } from "@site/src/utils/api";

export type Props = {
  items: CheckItem[];
  onToggleCheckbox: (id: string) => void;
  checked: string[];
};

export const CheckItemListBase = (props: Props) => {
  if (props.items.length === 0) {
    return (
      <div className="theme-admonition theme-admonition-caution alert alert--warning admonition_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-styles-module">
        <div className="admonitionHeading_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-styles-module">
          <span className="admonitionIcon_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-styles-module">
            <svg
              viewBox="0 0 16 16"
              style={{
                width: "1.6em",
                height: "1.6em",
                fill: "var(--ifm-alert-foreground-color)",
                display: "inline-block",
              }}
            >
              <path
                fill-rule="evenodd"
                d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"
              ></path>
            </svg>
          </span>
          TODO
        </div>
      </div>
    );
  }

  return (
    <div
      className="card shadow-lg"
      style={{
        padding: "1rem",
      }}
    >
      <BrowserOnly>
        {() => (
          <>
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                margin: 0,
                display: "grid",
                gap: "0.5rem",
              }}
            >
              {props.items.map((item) => (
                <li key={item.id}>
                  <CheckItem
                    {...item}
                    checked={props.checked.includes(item.id)}
                    onToggle={() =>
                      props.onToggleCheckbox(item.id)
                    }
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </BrowserOnly>
    </div>
  );
};

export const CheckItemList = (props: Props) => {
  console.log("woop!");
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <CheckItemListBase {...props} />}
    </BrowserOnly>
  );
};
