import useGlobalData from "@docusaurus/useGlobalData";
import {
  KompetanseTest,
  KompetanseTestData,
} from "@site/src/components/KompetanseTest/KompetanseTest";
import React from "react";

const data: KompetanseTestData = {
  tittel: "CSS - Kompetansetest",
  sporsmal: [
    {
      sporsmal:
        "Hvilket HTML-element er riktig for å inkludere CSS direkte i en HTML-fil?",
      svar: ["`<link>`", "`<script>`", "`<style>`", "`<css>`"],
      korrekt: 2,
    },
    {
      sporsmal:
        'Hvordan refererer du til et HTML-element med ID "logo" i CSS?',
      svar: ["`.logo`", "`#logo`", "`*logo*`", "`logo`"],
      korrekt: 1,
    },
    {
      sporsmal:
        'Hvilken CSS-selektor velger alle <p> (avsnitt) elementer med klassen "intro"?',
      svar: [
        "`p.intro`",
        "`intro p`",
        "`.intro p`",
        "`p .intro`",
      ],
      korrekt: 0,
    },
    {
      sporsmal:
        "Hvordan arver elementer i CSS egenskaper fra foreldrelementer?",
      svar: [
        'Ved å bruke "extend" i CSS-koden.',
        'Ved å bruke "inherit" som en verdi for egenskapen.',
        "Dette er ikke mulig i CSS.",
        "Arv er standardoppførselen til elementer i CSS.",
      ],
      korrekt: 3,
    },
    {
      sporsmal:
        "Hva skjer hvis to CSS-regler har samme spesifisitet?",
      svar: [
        "Den siste regelen i koden vil ha prioritet.",
        "Begge reglene blir ignorert.",
        "Den første regelen i koden vil ha prioritet.",
        "Det blir en syntaksfeil i CSS-koden.",
      ],
      korrekt: 0,
    },
    {
      sporsmal:
        "Hvilken av følgende har høyest spesifisitet i CSS?",
      svar: [
        "En ID-selektor (`#logo`)",
        "En klasse-selektor (`.logo`)",
        "En element-selektor (`div`)",
        "Alle har samme spesifisitet.",
      ],
      korrekt: 0,
    },
    {
      sporsmal:
        "Hvilken CSS-egenskap brukes til å endre avstanden mellom bokstaver?",
      svar: [
        "`letter-spacing`",
        "`word-spacing`",
        "`text-spacing`",
        "`line-spacing`",
      ],
      korrekt: 0,
    },
    {
      sporsmal:
        'Hva er riktig måte å inkludere en ekstern CSS-fil kalt "styles.css" i en HTML-side?',
      svar: [
        '`<css src="styles.css">`',
        "`<stylesheet>styles.css</stylesheet>`",
        '`<link rel="stylesheet" href="styles.css">`',
        '`<style src="styles.css">`',
      ],
      korrekt: 2,
    },
  ],
};

export const Test = () => {
  return <KompetanseTest data={data} />;
};
