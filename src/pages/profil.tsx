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
          <img src={getImageUrl(currentUser.email)} />{" "}
          {currentUser.user_metadata.full_name}
        </h1>
      </header>
      <main className={styles.main}>
        <h2>Total fremgang</h2>
        <label>
          <input
            type="checkbox"
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
          />
          Vis alle fremgangsmål
        </label>
        {itemsQuery.isLoading ? (
          <p>Vent litt...</p>
        ) : (
          <>
            <h3>
              <a href="/opplaering/start/frontend">Frontend</a>
            </h3>
            {getProgress("frontend").length === 0 && "-"}
            <ul>
              {getProgress("frontend").map((key) => (
                <li key={key}>
                  <span>
                    {progress.includes(key) ? "✅" : "❌"}{" "}
                    {totalProgressMap[key]}
                  </span>
                </li>
              ))}
            </ul>
            <h3>
              <a href="/opplaering/start/backend">Backend</a>
            </h3>
            {getProgress("backend").length === 0 && "-"}
            <ul>
              {getProgress("backend").map((key) => (
                <li key={key}>
                  <span>
                    {progress.includes(key) ? "✅" : "❌"}{" "}
                    {totalProgressMap[key]}
                  </span>
                </li>
              ))}
            </ul>
            <h3>
              <a href="/opplaering/start/spillprogrammering">
                Spillprogrammering
              </a>
            </h3>
            {getProgress("spillprogrammering").length === 0 &&
              "-"}
            <ul>
              {getProgress("spillprogrammering").map((key) => (
                <li key={key}>
                  <span>
                    {progress.includes(key) ? "✅" : "❌"}{" "}
                    {totalProgressMap[key]}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default function Profil() {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    auth.open("login");
  }

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
