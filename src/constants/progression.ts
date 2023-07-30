import { ValidateUniquePaths } from "../types/index";
import { createProgressionMap } from "../utils/index";

/**
 * For å legge til nytt mål:
 * 1. Legg til ny unik id i `ids`-arrayet
 * 2. Legg til nytt mål i `progressionMap`-objektet
 *
 * Hvis du får noen feil, så er det mest sannsynlig siden id-en
 * du prøver å legge til allerede eksisterer.
 */

const ids = [
  "server-klient",
  "fe_htmlcssjs",
  "fe_responsivt-design",
  "fe_tilgjengelighet",
  "http-request",
  "https-http",
  "fe_version-control",
  "fe_package-managers-know",
  "fe_js-framework-know",
  "fe_api",
  "fe_database",
  "fe_html",
  "fe_css",
  "fe_javascript",
  "fe_can-create-website",
  "fe_fe-be-diff",
  "fe_understands-requests",
  "fe_understands-git",
  "fe_understands_load",
  "fe_can-use-js",
  "fe_package-managers-use",
  "fe_js-framework-use",
  "be_python",
] as const;

export const progressionMap = createProgressionMap<
  (typeof ids)[number]
>({
  frontend: {
    konsepter: {
      ["server-klient"]: {
        level: 1,
        label: "Server vs klient",
      },
      ["http-request"]: {
        level: 1,
        label: "Hva er en HTTP forespørsel?",
      },
      ["https-http"]: { level: 1, label: "HTTPS" },
      ["fe_htmlcssjs"]: {
        level: 2,
        label: "Semantisk HTML",
      },
      ["fe_tilgjengelighet"]: {
        level: 2,
        label: "Tilgjengelighet",
      },
      ["fe_responsivt-design"]: {
        level: 2,
        label: "Responsivt design",
      },
      ["fe_api"]: {
        level: 2,
        label: "Hva er et API?",
      },
      ["fe_database"]: {
        level: 2,
        label: "Hva er en database?",
      },
      ["fe_version-control"]: {
        level: 3,
        label: "Versjon-kontrollering (version control / git)",
      },
      ["fe_package-managers-know"]: {
        level: 3,
        label: "NPM",
      },
      ["fe_js-framework-know"]: {
        level: 3,
        label: "JavaScript rammeverk",
      },
    },
    kodesprak: {
      ["fe_html"]: { level: 1, label: "HTML" },
      ["fe_css"]: { level: 2, label: "CSS" },
      ["fe_javascript"]: {
        level: 3,
        label: "JavaScript",
      },
    },
    ferdigheter: {
      ["fe_can-create-website"]: {
        level: 2,
        label:
          "Kan lage en enkel nettside med HTML og CSS, ut ifra gitt design",
      },
      ["fe_fe-be-diff"]: {
        level: 2,
        label:
          "Forstår ansvarsskille mellom frontend og backend",
      },
      ["fe_understands-requests"]: {
        level: 2,
        label: "Klarer å prate med et API via HTTP forespørsler",
      },
      ["fe_understands-git"]: {
        level: 2,
        label: "Klarer å integrere git inn i arbeidsflyten sin",
      },
      ["fe_understands_load"]: {
        level: 3,
        label:
          "Har god forståelse for hvordan en nettside lastes inn i nettleseren",
      },
      ["fe_can-use-js"]: {
        level: 3,
        label:
          "Kan bruke JavaScript effektivt for å lage interaktive nettsider",
      },
      ["fe_package-managers-use"]: {
        level: 3,
        label:
          'Klarer å installere pakker gjennom "package managers" (npm, yarn, etc...)',
      },
      ["fe_js-framework-use"]: {
        level: 3,
        label:
          "Klarer å bruke et JavaScript rammeverk for å lage en nettside",
      },
    },
  },
  backend: {
    konsepter: {
      ["server-klient"]: {
        level: 1,
        label: "Server vs klient",
      },
      ["http-request"]: {
        level: 1,
        label: "Hva er en HTTP forespørsel?",
      },
      ["https-http"]: { level: 1, label: "HTTPS" },
    },
    kodesprak: {
      ["be_python"]: {
        level: 2,
        label: "Python",
      },
    },
    ferdigheter: {},
  },
  spillprogrammering: {
    konsepter: {},
    kodesprak: {},
    ferdigheter: {},
  },
});

// Flattens the progressionMap records into a single object
export const totalProgressMap = Object.keys(
  progressionMap
).reduce((acc, key) => {
  const typedKey = key as keyof typeof progressionMap;
  if (progressionMap[typedKey].konsepter) {
    Object.keys(progressionMap[typedKey].konsepter).forEach(
      (key) => {
        acc[key] = progressionMap[typedKey].konsepter[key];
      }
    );
  }
  if (progressionMap[typedKey].ferdigheter) {
    Object.keys(progressionMap[typedKey].ferdigheter).forEach(
      (key) => {
        acc[key] = progressionMap[typedKey].ferdigheter[key];
      }
    );
  }
  if (progressionMap[typedKey].kodesprak) {
    Object.keys(progressionMap[typedKey].kodesprak).forEach(
      (key) => {
        acc[key] = progressionMap[typedKey].kodesprak[key];
      }
    );
  }
  return acc;
}, {} as Record<string, string>);
