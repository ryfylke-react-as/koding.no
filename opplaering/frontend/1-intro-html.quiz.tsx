import {
  KompetanseTest,
  KompetanseTestData,
} from "@site/src/components/KompetanseTest/KompetanseTest";
import React from "react";

const data: KompetanseTestData = {
  tittel: "Frontend introduksjon - Kompetansetest",
  sporsmal: [
    {
      sporsmal: "Hva er jobben til HTML?",
      svar: [
        "Å definere utseende til et dokument",
        "Å definere strukturen til et dokument",
        "Å definere funksjonalitet til et dokument",
      ],
      korrekt: 1,
    },
    {
      sporsmal: "Hva er jobben til CSS?",
      svar: [
        "Å definere strukturen til et dokument",
        "Å definere funksjonalitet til et dokument",
        "Å definere utseende til et dokument",
      ],
      korrekt: 2,
    },
    {
      sporsmal: "Hva er HTTP?",
      svar: [
        "Shady nettsider",
        "En protokoll for å overføre data over internett",
        "En gamlere versjon av HTML",
      ],
      korrekt: 1,
    },
    {
      sporsmal: "Hvilket av svarene er korrekt HTML?",
      svar: [
        "#div { Hei verden! }",
        "<div> Hei verden! </div>",
        'div("Hei verden!")',
      ],
      korrekt: 1,
    },
    {
      sporsmal: "For å kjøre HTML-kode så trenger man",
      svar: ["En nettleser", "En server", "En database"],
      korrekt: 0,
    },
  ],
};

export const Test = () => <KompetanseTest data={data} />;
