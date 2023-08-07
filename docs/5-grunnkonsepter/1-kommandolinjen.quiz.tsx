import useGlobalData from "@docusaurus/useGlobalData";
import {
  KompetanseTest,
  KompetanseTestData,
} from "@site/src/components/KompetanseTest/KompetanseTest";
import React from "react";

const data: KompetanseTestData = {
  tittel: "Kompetansetest - Kommandolinjen",
  sporsmal: [
    {
      sporsmal: "Hva er kommandolinjen?",
      svar: [
        "En måte å kommunisere med datamaskinen på.",
        "En måte å kommunisere med andre brukere på.",
        "En måte å kommunisere med nettleseren på.",
        "En måte å kommunisere med serveren på.",
      ],
      korrekt: 0,
    },
    {
      sporsmal:
        "Hvordan navigerer du til en mappe som heter 'dokumenter'?",
      svar: [
        "navigate dokumenter",
        "goto dokumenter",
        "nav dokumenter",
        "cd dokumenter",
      ],
      korrekt: 3,
    },
    {
      sporsmal:
        "Hvordan oppretter du en ny mappe med navn 'bilder'?",
      svar: [
        "newf 'bilder'",
        "folder 'bilder' --create",
        "mkdir bilder",
        "mkfolder bilder",
      ],
      korrekt: 2,
    },
  ],
};

export const Test = () => {
  return <KompetanseTest data={data} />;
};
