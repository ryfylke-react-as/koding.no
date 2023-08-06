import Link from "@docusaurus/Link";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";

import styles from "./index.module.css";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { ScrollHandler } from "@ryfylke-react/scroll-handler";
import { useScrollPercentBetween } from "../hooks/useScrollPercentageBetween";

function HomepageHeaderBase(props: { scroll?: number }) {
  return (
    <header
      className={clsx("hero hero--primary", styles.heroBanner)}
      style={
        {
          "--scroll": props.scroll?.toFixed(0),
        } as React.CSSProperties
      }
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
            to="/kom-i-gang/intro"
          >
            Kom i gang
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageHeaderClient() {
  const endRef = useRef<HTMLDivElement>(null)!;
  const scroll = useScrollPercentBetween({
    after: 0,
    before: endRef,
  });

  return (
    <>
      <HomepageHeaderBase scroll={scroll} />
      <div ref={endRef} />
    </>
  );
}

function HomepageHeader() {
  const isBrowser = useIsBrowser();

  if (isBrowser) {
    return <HomepageHeaderClient />;
  }

  return <HomepageHeaderBase />;
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
