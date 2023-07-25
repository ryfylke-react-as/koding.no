import React, { useEffect } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";
import { useFunction } from "../hooks/useFunction";
import { auth } from "../auth";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { data, error } = useFunction("check-item");

  console.log(data, error);

  return (
    <header
      className={clsx("hero hero--primary", styles.heroBanner)}
    >
      <div className="container">
        <h1 className="hero__title">
          Din guide for selvstudium av koding
        </h1>
        <p className="hero__subtitle">
          Koding.no er en open source ressurs for de som har lyst
          til å lære seg koding.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/opplaering/intro"
          >
            Kom i gang
          </Link>
        </div>
        <button
          onClick={() => {
            auth.open("login");
          }}
        >
          Login
        </button>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Hjem`}
      description="Lær koding ved hjelp av norske utviklere!"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
