import useGlobalData from "@docusaurus/useGlobalData";
import {
  KompetanseTest,
  KompetanseTestData,
} from "@site/src/components/KompetanseTest/KompetanseTest";
import React from "react";

const data: KompetanseTestData = {
  tittel: "Semantisk HTML & tilgjengelighet - Kompetansetest",
  sporsmal: [
    {
      sporsmal:
        "Hvilken av disse er mest semantisk korrekt for hovedtittelen?",
      svar: ["`<h1>`", "`<h2>`", "`<h3>`", "`<h4>`"],
      korrekt: 0,
    },
    {
      sporsmal: "Hva handler tilgjengelighet om?",
      svar: [
        "At alle kan bruke nettstedet",
        "At nettstedet ikke er passordbeskyttet",
        "At nettstedet er tilgjengelig for alle",
        "At nettstedet er tilgjengelig for alle, uavhengig av funksjonsevne",
      ],
      korrekt: 3,
    },
    {
      sporsmal: "Hva stemmer _ikke_ om semantisk HTML?",
      svar: [
        "Semantisk HTML er viktig for søkemotoroptimalisering",
        "Semantisk HTML er viktig for å gjøre nettsiden mer visuelt tiltalende",
        "Semantisk HTML er viktig for tilgjengelighet",
        "Semantisk HTML er viktig for å strukturere innholdet på nettsiden",
      ],
      korrekt: 1,
    },
  ],
};

export const Test = () => {
  return <KompetanseTest data={data} />;
};
