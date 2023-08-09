import useGlobalData from "@docusaurus/useGlobalData";
import {
  KompetanseTest,
  KompetanseTestData,
} from "@site/src/components/KompetanseTest/KompetanseTest";
import React from "react";

const data: KompetanseTestData = {
  tittel: "Responsiv design - Kompetansetest",
  sporsmal: [
    {
      sporsmal:
        "Hvilke to dynamiske enheter endrer seg basert på nettleserens standard font-størrelse?",
      svar: [
        "`px` og `vw`",
        "`rem` og `em`",
        "`em` og `pt`",
        "`vh` og `mm`",
      ],
      korrekt: 1,
    },
    {
      sporsmal:
        "Hvordan oppnår du sentrert innhold i begge retninger ved bruk av Flexbox?",
      svar: [
        "`align-center: horizontal;` `justify-center: vertical;`",
        "`flex-center: horizontal;` `flex-center: vertical;`",
        "`center-content: row;` `center-content: column;`",
        "`align-items: center;` `justify-content: center;`",
      ],
      korrekt: 3,
    },
    {
      sporsmal:
        "Hvorfor bør du begrense bruket av 'media queries' i responsiv design?",
      svar: [
        "Fordi media queries ikke fungerer på alle nettlesere.",
        "Fordi de gjør nettsiden mer komplisert å vedlikeholde.",
        "Fordi media queries endrer ikke noe på nettsidens utseende.",
        "Fordi media queries kun fungerer på mobil og nettbrett.",
      ],
      korrekt: 1,
    },
    {
      sporsmal:
        "Hva er 'mobile-first' tilnærming i responsiv design?",
      svar: [
        "Å designe nettsiden først for desktop, deretter tilpasse den til mobil.",
        "Å designe nettsiden først for mobil, deretter tilpasse den til større skjermer.",
        "Å designe nettsiden kun for nettbrett.",
        "Å designe nettsiden først for store skjermer, deretter tilpasse den til mindre enheter.",
      ],
      korrekt: 1,
    },
    {
      sporsmal: "Hva er en 'Viewport' i responsiv design?",
      svar: [
        "En boks som inneholder nettsidens innhold.",
        "Det samlede området på skjermen der nettsiden vises.",
        "En grafisk representasjon av nettsidens hierarki.",
        "En måling av nettsidens lastetid på forskjellige enheter.",
      ],
      korrekt: 1,
    },
    {
      sporsmal: "Hva er overflow?",
      svar: [
        "En CSS-property som bestemmer hvordan innholdet skal vises når det er for stort for sin container",
        "En CSS-verdi som sier at innholdet skal vises på ny linje når det er for stort for sin container",
        "Når en nettside overlastes av innhold og blir tregere",
        "Når det er for mye trafikk på en nettside og den krasjer",
      ],
      korrekt: 0,
    },
  ],
};

export const Test = () => {
  return <KompetanseTest data={data} />;
};
