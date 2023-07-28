import React, { useCallback, useEffect, useMemo } from "react";
import { CheckItemList } from "../CheckItemList/CheckItemList";
import { progressionMap } from "@site/src/constants/progression";
import { useAuth } from "@site/src/auth/useAuth";
import { useFetch } from "@site/src/utils/api";
import useLazyQuery from "@site/src/hooks/useLazyQuery";
import { useMutation } from "react-query";
import { toast } from "@site/src/lib/toast";
import { debounce } from "@site/src/utils";
import Admonition from "@theme/Admonition";
import Link from "@docusaurus/Link";

import { H2, H3 } from "../Header/Header";
import BrowserOnly from "@docusaurus/BrowserOnly";

type Props = {
  /** `frontend`, `backend`, `spillprogrammering`, etc... */
  id: string;
};

export const ProgressionPage = (props: Props) => {
  const progression = progressionMap[props.id];
  const [checked, setChecked] = React.useState<string[]>([]);
  const auth = useAuth();
  const appFetch = useFetch();
  const [lazyGetItems, itemsQuery] = useLazyQuery<
    { checked: string[] },
    string
  >(
    ["get-items"],
    async () => {
      const data = await appFetch<{
        checked: string[];
      }>("/.netlify/functions/get-checked?banana", {
        method: "GET",
      });

      return data;
    },
    {
      onSuccess: (data) => {
        setChecked(data.checked);
      },
    }
  );

  const checkedMutation = useMutation(
    async ({ newChecked }: { newChecked: string[] }) => {
      if (auth.isLoggedIn) {
        const response = await appFetch(
          "/.netlify/functions/set-checked",
          {
            method: "POST",
            body: JSON.stringify({ items: newChecked }),
          }
        );
        return response;
      }
      return [];
    },
    {
      onSuccess: (_a, v) => {
        toast({
          title: "Fremgang lagret",
          kind: "success",
        });
      },
    }
  );

  const syncToBackend = useCallback(
    debounce(() => {
      if (auth.isLoggedIn) {
        checkedMutation.mutate({
          newChecked: getLatestCheckedState(),
        });
      }
    }, 1000),
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
    <>
      {auth.isLoggedIn ? (
        <Admonition type="tip" title="Velkommen tilbake!">
          Du er logget inn som{" "}
          <strong>
            <Link href="/profil">
              {auth.currentUser().user_metadata.full_name}
            </Link>
          </strong>
          . Fremgangen din blir lagret automatisk.
        </Admonition>
      ) : (
        <>
          <p>
            Logg inn for å lagre (og hente) fremgangen din på
            tvers av enheter.
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => auth.open("login")}
              className="button button--outline button--secondary"
            >
              Logg inn
            </button>
            <button
              onClick={() => auth.open("signup")}
              className="button button--outline button--secondary"
            >
              Opprett bruker
            </button>
          </div>
        </>
      )}
      <H3>Konsepter</H3>
      <CheckItemList
        items={Object.entries(progression.konsepter).map(
          ([key, value]) => ({
            id: key,
            label: value,
          })
        )}
        onToggleCheckbox={onToggleCheckbox}
        checked={checked}
      />
      <H3>Kodespråk</H3>
      <CheckItemList
        items={Object.entries(progression.kodesprak).map(
          ([key, value]) => ({
            id: key,
            label: value,
          })
        )}
        onToggleCheckbox={onToggleCheckbox}
        checked={checked}
      />
      <H3>Ferdigheter</H3>
      <CheckItemList
        items={Object.entries(progression.ferdigheter).map(
          ([key, value]) => ({
            id: key,
            label: value,
          })
        )}
        onToggleCheckbox={onToggleCheckbox}
        checked={checked}
      />
    </>
  );
};
