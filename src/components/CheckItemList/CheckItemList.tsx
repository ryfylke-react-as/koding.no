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
        )}
      </BrowserOnly>
    </div>
  );
};
