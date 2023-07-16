import React, { useEffect } from "react";
import { styled } from "styled-components";

type Interface = Record<string, string>;

type QuestionProps<TInterface extends Interface> = {
  question: string;
  answers: string[];
  questionKey: keyof TInterface;
};

type Props<TInterface extends Interface> = {
  children: React.ReactElement<QuestionProps<TInterface>>[];
  onSubmit: (answers: Partial<TInterface>) => void;
  finishScreen: React.ReactNode;
  title: string;
};

const context = React.createContext<{
  answer: string;
  setAnswer: (answer: string, key: string) => void;
}>({
  answer: "",
  setAnswer: () => {},
});

export const Quiz = <TInterface extends Interface>(
  props: Props<TInterface>
) => {
  const [finished, setFinished] = React.useState(false);
  const [values, setValues] = React.useState<
    Partial<TInterface>
  >({});
  const [currentQuestion, setCurrentQuestion] =
    React.useState(0);

  return (
    <context.Provider
      value={{
        answer:
          values[
            props.children[currentQuestion].props.questionKey
          ],
        setAnswer: (answer, key) =>
          setValues((p) => ({ ...p, [key]: answer })),
      }}
    >
      <Container>
        <QuizTitle>
          {props.title}{" "}
          <span>
            ({currentQuestion + 1}/{props.children.length})
          </span>
        </QuizTitle>
        {finished && props.finishScreen}
        {finished && (
          <nav className="pagination-nav">
            <div className="pagination-nav__item pagination-nav__item--next">
              <button
                className="pagination-nav__link"
                disabled={
                  values[
                    props.children[currentQuestion].props
                      .questionKey
                  ] === undefined
                }
                onClick={() => {
                  setValues({});
                  setCurrentQuestion(0);
                  setFinished(false);
                }}
              >
                <div className="pagination-nav__sublabel">
                  Tilbake
                </div>
                <div className="pagination-nav__label">
                  Prøv igjen
                </div>
              </button>
            </div>
          </nav>
        )}
        {!finished && (
          <React.Fragment key={currentQuestion}>
            {props.children[currentQuestion]}
          </React.Fragment>
        )}
        {!finished && (
          <nav className="pagination-nav">
            <div className="pagination-nav__item">
              <button
                className="pagination-nav__link"
                disabled={currentQuestion === 0}
                onClick={() => {
                  if (currentQuestion === 0) {
                    return;
                  } else {
                    setCurrentQuestion(currentQuestion - 1);
                  }
                }}
              >
                <div className="pagination-nav__sublabel">
                  Forrige
                </div>
                <div className="pagination-nav__label">
                  Forrige spørsmål
                </div>
              </button>
            </div>
            <div className="pagination-nav__item pagination-nav__item--next">
              <button
                className="pagination-nav__link"
                disabled={
                  values[
                    props.children[currentQuestion].props
                      .questionKey
                  ] === undefined
                }
                onClick={() => {
                  if (
                    currentQuestion ===
                    props.children.length - 1
                  ) {
                    props.onSubmit(values);
                    setFinished(true);
                  } else {
                    setCurrentQuestion(currentQuestion + 1);
                  }
                }}
              >
                <div className="pagination-nav__sublabel">
                  Neste
                </div>
                <div className="pagination-nav__label">
                  {currentQuestion === props.children.length - 1
                    ? "Fullfør"
                    : "Neste spørsmål"}
                </div>
              </button>
            </div>
          </nav>
        )}
      </Container>
    </context.Provider>
  );
};

const Question = <TInterface extends Interface>(
  props: QuestionProps<TInterface>
) => {
  const { answer, setAnswer } = React.useContext(context);

  return (
    <QuestionContainer>
      <h3>{props.question}</h3>
      <AnswerContainer>
        {props.answers.map((currentAnswer, i) => (
          <label
            key={`${currentAnswer}-${
              props.questionKey as string
            }-${i}`}
          >
            <input
              type="radio"
              name={`quiz-answer-${props.questionKey as string}`}
              value={currentAnswer}
              checked={answer === currentAnswer}
              onChange={(e) => {
                setAnswer(
                  currentAnswer,
                  props.questionKey as string
                );
              }}
            />{" "}
            {currentAnswer}
          </label>
        ))}
      </AnswerContainer>
    </QuestionContainer>
  );
};

Quiz.Question = Question;

const Container = styled.div`
  background: var(--ifm-background-surface-color);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h2,
  h3 {
    margin: 0;
  }
  button.pagination-nav__link {
    width: 100%;
    text-align: left;
    cursor: pointer;
    background: transparent;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QuizTitle = styled.h2`
  font-size: 1rem;
  color: var(--ifm-color-primary);
  span {
    font-variant-numeric: normal;
    color: var(--ifm-color-secondary-contrast-foreground);
    font-weight: normal;
  }
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
