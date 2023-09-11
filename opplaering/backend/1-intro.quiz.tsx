import {
  KompetanseTest,
  KompetanseTestData,
} from "@site/src/components/KompetanseTest/KompetanseTest";
import React from "react";

const data: KompetanseTestData = {
  tittel: "Backend introduksjon - Kompetansetest",
  sporsmal: [
    {
      sporsmal: "Hvilke av følgende er IKKE et ansvarsområde for backend?",
      svar: [
        "å validere mottatt data",
        "sørge for at frontend har riktig farger",
        "lagre data i database for senere bruk",
      ],
      korrekt: 1,
    },
    {
      sporsmal: "Hvilken av følgende er en backend utvikler sin oppgave?",
      svar: [
        "Designe brukergrensesnitt",
        "å sørge for at web-applikasjon kjører i riktig skjermstørrelse",
        "utvikle applikasjonslogikk som behandler data på en server",
      ],
      korrekt: 2,
    },
    {
      sporsmal: "Hva er FEIL om DevOps under?",
      svar: [
        "å ha overlevering av programvaren fra utvikling til drift, så drift kan deploye den",
        "å automatisere mest mulig for å øke produktivitet",
        "å ha fokus på kontinuerlig leveranser, som i noen tilfeller kan være så ofte som hver time",
      ],
      korrekt: 0,
    },
  ],
};

export const Test = () => <KompetanseTest data={data} />;
