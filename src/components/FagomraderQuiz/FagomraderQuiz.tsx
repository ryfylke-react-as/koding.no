import React from "react";
import { styled } from "styled-components";
import { Quiz } from "../Quiz/Quiz";

const answers = ["Stemmer", "Stemmer delvis", "Stemmer ikke"];

export const FagomraderQuiz = () => {
  const [score, setScore] = React.useState<
    "frontend" | "backend" | "gaming" | null
  >(null);
  const tabulate = (answers: Record<string, string>) => {
    const scores = {
      backend: 0,
      frontend: 0,
      gaming: 0,
    };
    const mapping = {
      "design-estetikk": ["frontend", "gaming"],
      strukturert: ["backend", "frontend"],
      "simulere-verden": ["gaming"],
      "detalje-orientert": ["backend", "frontend"],
      brukeropplevelse: ["frontend"],
      effektivitet: ["backend", "frontend"],
      algoritmer: ["backend", "gaming"],
      puslespill: ["backend"],
    };

    for (const key in answers) {
      const answer = answers[key];
      if (answer === "Stemmer ikke") {
        mapping[key].forEach((key) => {
          scores[key] -= 1;
        });
      } else if (answer === "Stemmer delvis") {
        mapping[key].forEach((key) => {
          scores[key] += 1;
        });
      } else if (answer === "Stemmer") {
        mapping[key].forEach((key) => {
          scores[key] += 3;
        });
      }
    }

    const highestScore = Math.max(...Object.values(scores));
    return Object.keys(scores).find(
      (key) => scores[key] === highestScore
    );
  };

  const finishScreens = {
    backend: (
      <FinishScreen>
        <h2>Backend</h2>
        <p>
          Ut i fra vår quiz, så passer du best til å jobbe med
          backend. Husk å ta en kritisk vurdering på egenhand.
        </p>
      </FinishScreen>
    ),
    frontend: (
      <FinishScreen>
        <h2>Frontend</h2>
        <p>
          Ut i fra vår quiz, så passer du best til å jobbe med
          frontend. Husk å ta en kritisk vurdering på egenhand.
        </p>
      </FinishScreen>
    ),
    gaming: (
      <FinishScreen>
        <h2>Spillprogrammering</h2>
        <p>
          Ut i fra vår quiz, så passer du best til å jobbe med
          spillprogrammering. Husk å ta en kritisk vurdering på
          egenhand.
        </p>
      </FinishScreen>
    ),
  };

  return (
    <Quiz
      title="Finn ditt fagområde"
      onSubmit={(values) => {
        setScore(tabulate(values) as "backend");
      }}
      finishScreen={score ? finishScreens[score] : null}
    >
      <Quiz.Question
        question="Struktur og orden er viktig for deg"
        answers={answers}
        questionKey="strukturert"
      />
      <Quiz.Question
        question="Du er glad i design og estetikk"
        answers={answers}
        questionKey="design-estetikk"
      />
      <Quiz.Question
        question="Du liker idèen av å simulere den virkelige verden"
        answers={answers}
        questionKey="simulere-verden"
      />
      <Quiz.Question
        question="Effektivitet er viktig for deg"
        answers={answers}
        questionKey="effektivitet"
      />
      <Quiz.Question
        question="Du er flink på å legge merke til detaljer i omgivelsene dine"
        answers={answers}
        questionKey="detalje-orientert"
      />
      <Quiz.Question
        question="Brukeropplevelse er viktig for deg"
        answers={answers}
        questionKey="brukeropplevelse"
      />
      <Quiz.Question
        question="Du synes at algoritmer er spennende"
        answers={answers}
        questionKey="algoritmer"
      />
      <Quiz.Question
        question="Du er glad i puslespill og gåter"
        answers={answers}
        questionKey="puslespill"
      />
    </Quiz>
  );
};

const FinishScreen = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
