import { KompetanseTest, KompetanseTestData } from "@site/src/components/KompetanseTest/KompetanseTest"
import React from "react"

const data: KompetanseTestData = {
    tittel: "JavaScript - Kompetansetest",
    sporsmal: [
        {
            sporsmal: "Hva brukes JavaScript hovedsaklig til?",
            svar: ["For å endre utseendet til en nettside.", "For å legge til interaktivitet til en nettside.", "For å lage selve oppsettet til en nettside.", "For å laste inn en nettside."],
            korrekt: 1,
        },
        {
            sporsmal: "Hvordan lenker man til en ekstern JavaScript-fil?",
            svar: ['<link href="" />', '<javascript file="" />', '<src file=""></src>', '<script src=""></script>'],
            korrekt: 3,
        },
        {
            sporsmal: "Hva gjør `let`?",
            svar: ["Definerer en variabel.", "Definerer en funksjon.", "Lager en array.", "Lager et objekt."],
            korrekt: 0,
        },
        {
            sporsmal: "Hva gjør funksjonen `querySelector()`?",
            svar: ["Henter alle elementer fra HTML.", "Lager et nytt HTML-element.", "Henter et tilfeldig element fra HTML.", "Henter et HTML-element basert på verdien inn."],
            korrekt: 3,
        },
        {
            sporsmal: "Hvilket nøkkelord blir brukt for å definere en funksjon?",
            svar: ["var", "function", "func", "const"],
            korrekt: 1,
        },
    ],
}

export const Test = () => {
    return <KompetanseTest data={data} />
}
