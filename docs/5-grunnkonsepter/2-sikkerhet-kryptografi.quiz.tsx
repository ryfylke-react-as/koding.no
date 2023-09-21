import {
  KompetanseTest,
  KompetanseTestData,
} from "@site/src/components/KompetanseTest/KompetanseTest";
import React from "react";

const data: KompetanseTestData = {
  tittel: "Kompetansetest - Sikkerhet og Kryptografi",
  sporsmal: [
    {
      sporsmal:
        "Hva er viktig når man sender en forespørsel over internett?",
      svar: [
        "Å bruke mye slang.",
        "Å sikre at mottakeren forstår hva du mener.",
        "Å sikre at mottakeren er den du tror det er.",
      ],
      korrekt: 2,
    },
    {
      sporsmal: "Hvor lagres passord på internett?",
      svar: ["I klienten", "På serveren"],
      korrekt: 1,
    },
    {
      sporsmal: "Hva er sant om passord?",
      svar: [
        "Passord bør lagres i klartekst på serveren.",
        "Passord bør lagres i klartekst på klienten.",
        "Passord bør lagres i kryptert form på serveren.",
        "Passord bør lagres i kryptert form på klienten.",
      ],
      korrekt: 2,
    },
  ],
};

export const Test = () => {
  return <KompetanseTest data={data} />;
};
