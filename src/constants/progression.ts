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
  "fe_server-klient",
  "fe_htmlcssjs",
  "fe_responsivt-design",
  "fe_tilgjengelighet",
  "fe_http-request",
  "fe_https-http",
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
      ["fe_server-klient"]: "Server vs klient",
      ["fe_htmlcssjs"]: "Semantisk HTML",
      ["fe_responsivt-design"]: "Responsivt design",
      ["fe_tilgjengelighet"]: "Tilgjengelighet",
      ["fe_http-request"]: "Hva er en HTTP forespørsel?",
      ["fe_https-http"]: "HTTPS",
      ["fe_version-control"]:
        "Versjon-kontrollering (version control / git)",
      ["fe_package-managers-know"]: "NPM",
      ["fe_js-framework-know"]: "JavaScript rammeverk",
      ["fe_api"]: "Hva er et API?",
      ["fe_database"]: "Hva er en database?",
    },
    kodesprak: {
      ["fe_html"]: "1. HTML",
      ["fe_css"]: "2. CSS",
      ["fe_javascript"]: "3. JavaScript",
    },
    ferdigheter: {
      ["fe_can-create-website"]:
        "Kan lage en enkel nettside med HTML og CSS, ut ifra gitt design",
      ["fe_fe-be-diff"]:
        "Forstår ansvarsskille mellom frontend og backend",
      ["fe_understands-requests"]:
        "Klarer å prate med et API via HTTP forespørsler",
      ["fe_understands-git"]:
        "Klarer å integrere git inn i arbeidsflyten sin",
      ["fe_understands_load"]:
        "Har god forståelse for hvordan en nettside lastes inn i nettleseren",
      ["fe_can-use-js"]:
        "Kan bruke JavaScript effektivt for å lage interaktive nettsider",
      ["fe_package-managers-use"]:
        'Klarer å installere pakker gjennom "package managers" (npm, yarn, etc...)',
      ["fe_js-framework-use"]:
        "Klarer å bruke et JavaScript rammeverk for å lage en nettside",
    },
  },
  backend: {
    konsepter: {},
    kodesprak: {
      ["be_python"]: "1. Python",
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
