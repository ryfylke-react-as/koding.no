import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useScrollPercentBetween } from "@site/src/hooks/useScrollPercentageBetween";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Er koding noe for deg?",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg")
      .default,
    description: (
      <>
        Har du en sans for logikk og problemløsning? Har du
        interesse for ny teknologi? Da er kanskje koding noe for
        deg!
      </>
    ),
  },
  {
    title: "Du velger din egen vei",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg")
      .default,
    description: (
      <>
        Vi hjelper deg å finne ditt fagområde, og gir deg
        muligheten til å velge din egen vei.
      </>
    ),
  },
  {
    title: "Bygd på dugnad",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg")
      .default,
    description: (
      <>
        Alt innhold på Koding.no er skrevet og skreddersynn av
        frivillige bidragsytere.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  const percent = useScrollPercentBetween({
    after: 0,
    before: 350,
  });

  return (
    <div
      className={clsx("col col--4")}
      style={{ transform: `translateY(-${percent * 0.4}px)` }}
    >
      <div className="text--center">
        <Svg
          className={styles.featureSvg}
          role="img"
          style={{
            transform: `rotate(${
              percent * 0.05
            }deg) translateY(${(percent / 100) * 8}px)`,
          }}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <BrowserOnly>
              {() => <Feature key={idx} {...props} />}
            </BrowserOnly>
          ))}
        </div>
      </div>
    </section>
  );
}
