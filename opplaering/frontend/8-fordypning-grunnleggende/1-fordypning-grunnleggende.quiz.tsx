import {
  KompetanseTest,
  KompetanseTestData,
} from "@site/src/components/KompetanseTest/KompetanseTest";
import React from "react";

const data: KompetanseTestData = {
  tittel: "Fordypning i det grunnleggende",
  sporsmal: [
    {
      sporsmal: "Er du klar for å komme i gang?",
      svar: ["Ja! 🚀", "Nei 💩"],
      korrekt: 0,
    },
  ],
  feil: "Det var synd. 😭 Du kan alltids komme tilbake og fortsette senere!",
  suksess: "Wihu, la oss komme i gang! 🎉",
};

export const Test = () => <KompetanseTest data={data} />;
