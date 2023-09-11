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
        "Å validere mottatt data",
        "Sørge for at frontend har riktig farger",
        "Lagre data i database for senere bruk",
      ],
      korrekt: 1,
    },
    {
      sporsmal: "Hvilken av følgende er en backend utvikler sin oppgave?",
      svar: [
        "Designe brukergrensesnitt",
        "Å sørge for at web-applikasjon kjører i riktig skjermstørrelse",
        "Utvikle applikasjonslogikk som behandler data på en server",
      ],
      korrekt: 2,
    },
    {
      sporsmal: "Hva er FEIL om DevOps under?",
      svar: [
        "Å ha overlevering av programvaren fra utvikling til drift, så drift kan deploye den",
        "Å automatisere mest mulig for å øke produktivitet",
        "Å ha fokus på kontinuerlig leveranser, som i noen tilfeller kan være så ofte som hver time",
      ],
      korrekt: 0,
    },
  ],
};

export const Test = () => <KompetanseTest data={data} />;
