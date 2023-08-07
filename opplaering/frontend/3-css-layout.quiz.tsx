import useGlobalData from "@docusaurus/useGlobalData";
import {
  KompetanseTest,
  KompetanseTestData,
} from "@site/src/components/KompetanseTest/KompetanseTest";
import React from "react";

const data: KompetanseTestData = {
  tittel: "CSS Layout - Kompetansetest",
  sporsmal: [
    {
      sporsmal: "Hva omfatter 'Layout' i CSS?",
      svar: [
        "Plassering av innhold",
        "Typografi og farger",
        "Animasjoner og overganger",
        "Bilder og videoer",
      ],
      korrekt: 0,
    },
    {
      sporsmal:
        "Hva er forskjellen mellom 'inline' og 'block' elementer i CSS?",
      svar: [
        "'inline' elementer ligger alltid over hverandre, mens 'block' elementer kan ligge ved siden av hverandre.",
        "'inline' elementer tar ikke opp hele bredden på skjermen, mens 'block' elementer tar opp hele bredden.",
        "'inline' elementer har tykkere border enn 'block' elementer.",
        "'inline' elementer kan ikke inneholde tekst, mens 'block' elementer kan.",
      ],
      korrekt: 1,
    },
    {
      sporsmal: "Hva består boksen rundt et CSS-element av?",
      svar: [
        "Padding, border, background, content",
        "Margin, padding, background, content",
        "Margin, padding, border, content",
        "Margin, border, background, content",
      ],
      korrekt: 2,
    },
    {
      sporsmal: "Hva gjør 'margin'-egenskapen i CSS?",
      svar: [
        "Legger til et mellomrom inni et element",
        "Endrer elementets bakgrunnsfarge",
        "Legger til et mellomrom rundt et element",
        "Endrer elementets skriftstørrelse",
      ],
      korrekt: 2,
    },
    {
      sporsmal:
        "Hvordan lager du en enkel vertikal linje av elementer ved hjelp av Flexbox?",
      svar: [
        "display: flex; flex-direction: column;",
        "display: flex; flex-direction: row;",
        "display: flex; flex-direction: column-reverse;",
        "display: flex; flex-direction: row-reverse;",
      ],
      korrekt: 0,
    },
    {
      sporsmal:
        "Hvordan lager du en enkel horisontal linje av elementer ved hjelp av Flexbox?",
      svar: [
        "display: flex; flex-direction: row;",
        "display: flex; flex-direction: column;",
        "display: flex; justify-content: center;",
        "display: flex; align-items: center;",
      ],
      korrekt: 0,
    },
  ],
};

export const Test = () => {
  return <KompetanseTest data={data} />;
};
