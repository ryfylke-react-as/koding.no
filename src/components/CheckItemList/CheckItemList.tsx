import BrowserOnly from "@docusaurus/BrowserOnly";
import { useAuth } from "@site/src/auth/useAuth";
import { queryClient } from "@site/src/theme/Root";
import React, { useCallback, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { CheckItem } from "../CheckItem/CheckItem";
import useLazyQuery from "@site/src/hooks/useLazyQuery";

export type Props = { items: CheckItem[] };

const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const CheckItemList = ({ items }: Props) => {
  const [checked, setChecked] = React.useState<string[]>([]);
  const auth = useAuth();

  const [lazyGetItems, itemsQuery] = useLazyQuery<
    { checked: string[] },
    string
  >(
    [
      "get-items",
      {
        token: auth.isLoggedIn
          ? auth.currentUser().token.access_token
          : "",
      },
    ],
    async ({ queryKey }) => {
      const [_getitems, { token }] = queryKey as [
        string,
        { token: string }
      ];
      if (!token) {
        return { checked: [] };
      }
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
      const response = await fetch(
        "/.netlify/functions/get-checked?banana",
        {
          method: "GET",
          headers,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    },
    {
      onSuccess: (data) => {
        setChecked(data.checked);
      },
    }
  );

  const checkedMutation = useMutation(
    async ({
      newChecked,
      token,
    }: {
      newChecked: string[];
      token: string;
    }) => {
      const headers = new Headers();
      if (auth.isLoggedIn) {
        headers.append("Authorization", `Bearer ${token}`);
        const response = await fetch(
          "/.netlify/functions/set-checked",
          {
            method: "POST",
            headers,
            body: JSON.stringify({ items: newChecked }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
      }
      return [];
    },
    {
      onSuccess: (_a, v) => {
        console.log("Progressjon lagret ✅", {
          progressjon: v.newChecked,
        });
      },
    }
  );

  const syncToBackend = useCallback(
    debounce(() => {
      if (auth.isLoggedIn) {
        checkedMutation.mutate({
          newChecked: getLatestCheckedState(),
          token: auth.currentUser().token.access_token,
        });
      }
    }, 2000),
    [auth.isLoggedIn]
  );

  const onToggleCheckbox = async (id: string) => {
    const newChecked = !checked.includes(id)
      ? [...checked, id]
      : checked.filter((i) => i !== id);
    localStorage.setItem(
      id,
      !checked.includes(id) ? "true" : "false"
    );
    setChecked(newChecked);
    syncToBackend();
  };

  const getLatestCheckedState = () => {
    let newChecked: string[] = [];
    setChecked((p) => {
      newChecked = p;
      return p;
    });

    return newChecked;
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      lazyGetItems();
    }
  }, [auth.isLoggedIn]);

  if (items.length === 0) {
    return (
      <div className="theme-admonition theme-admonition-caution alert alert--warning admonition_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-styles-module">
        <div className="admonitionHeading_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-styles-module">
          <span className="admonitionIcon_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-styles-module">
            <svg viewBox="0 0 16 16">
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
        pointerEvents: itemsQuery.isLoading ? "none" : undefined,
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
              {items.map((item) => (
                <li key={item.id}>
                  <CheckItem
                    {...item}
                    checked={checked?.includes(item.id)}
                    onToggle={() => onToggleCheckbox(item.id)}
                  />
                </li>
              ))}
            </ul>
            <div
              style={{
                textAlign: "right",
                borderTop:
                  "1px solid var(--ifm-blockquote-border-color)",
                padding: "0.5rem 0 0",
                margin: "0.5rem 0 0",
                opacity: 0.75,
                fontSize: "0.875rem",
              }}
            >
              {auth.isLoggedIn ? (
                <>
                  {checkedMutation.isLoading ? (
                    <span>Lagrer...</span>
                  ) : (
                    <>
                      Logget inn som{" "}
                      <strong>
                        {
                          auth.currentUser()?.user_metadata
                            ?.full_name
                        }
                      </strong>
                    </>
                  )}
                </>
              ) : (
                <>
                  <button
                    className="button button--secondary button--sm button--outline"
                    onClick={() => auth.open("login")}
                  >
                    Logg inn for å lagre
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </BrowserOnly>
    </div>
  );
};
