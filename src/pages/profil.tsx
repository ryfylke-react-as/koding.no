import React, { useState } from "react";
import Layout from "@theme/Layout";
import { useAuth } from "../auth/useAuth";
import styles from "./profil.module.scss";
import {
  progressionMap,
  totalProgressMap,
} from "../constants/progression";
import { useFetch } from "../utils/api";
import { useQuery } from "react-query";
import { getImageUrl } from "../utils/user";
import Link from "@docusaurus/Link";
import { LoginButton } from "../components/LoginButton/LoginButton";

function LoggedInPage() {
  const [showAll, setShowAll] = useState(false);
  const [progress, setProgress] = React.useState<string[]>([]);
  const auth = useAuth();
  const currentUser = auth.currentUser();

  const appFetch = useFetch();
  const itemsQuery = useQuery<{ checked: string[] }, string>(
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
        setProgress(data.checked);
      },
    }
  );

  const getProgress = (id: string) => {
    return Object.keys({
      ...progressionMap[id].ferdigheter,
      ...progressionMap[id].kodesprak,
      ...progressionMap[id].konsepter,
    }).filter((key) =>
      showAll ? true : progress.includes(key)
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          {currentUser?.email && (
            <img src={getImageUrl(currentUser.email)} />
          )}{" "}
          {currentUser.user_metadata.full_name}
        </h1>
      </header>
      <main className={styles.main}>
        <LoginButton />
      </main>
    </div>
  );
}

export default function Profil() {
  const auth = useAuth();

  return (
    <Layout
      title={`Hjem`}
      description="Lær koding ved hjelp av norske utviklere!"
    >
      {auth.isLoggedIn ? (
        <LoggedInPage />
      ) : (
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>401 - Ikke autorisert</h1>
          </header>
          <main className={styles.main}>
            <p>Beskyttet område.</p>
            <button
              className="button button--outline button--secondary"
              onClick={() => auth.open("login")}
            >
              Logg inn
            </button>
          </main>
        </div>
      )}
    </Layout>
  );
}
