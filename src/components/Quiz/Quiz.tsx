import React, { useEffect } from "react";
import styles from "./Quiz.module.scss";
// @ts-ignore
import ReactMarkdown from "react-markdown";

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
  onVerifyStep?: (step: number, answer: string) => true | string;
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
  const [error, setError] = React.useState<string | null>(null);
  const [values, setValues] = React.useState<
    Partial<TInterface>
  >({});
  const [currentQuestion, setCurrentQuestion] =
    React.useState(0);

  const answer =
    values[props.children[currentQuestion].props.questionKey];

  const setAnswer = (answer: string, key: string) =>
    setValues((p) => ({ ...p, [key]: answer }));

  useEffect(() => {
    if (error !== null) {
      setError(null);
    }
  }, [answer]);

  return (
    <context.Provider
      value={{
        answer,
        setAnswer,
      }}
    >
      <div className={styles.container}>
        <div className={styles.quizTitle}>
          {props.title}{" "}
          <span>
            ({currentQuestion + 1}/{props.children.length})
          </span>
        </div>
        {finished && props.finishScreen}
        {finished && (
          <nav className="pagination-nav">
            <div className="pagination-nav__item pagination-nav__item--next">
              <button
                className={
                  "pagination-nav__link " + styles.navLink
                }
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
        {error !== null && (
          <div className={styles.error}>{error}</div>
        )}
        {!finished && (
          <nav className="pagination-nav">
            <div className="pagination-nav__item">
              <button
                className={
                  "pagination-nav__link " + styles.navLink
                }
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
                className={
                  "pagination-nav__link " + styles.navLink
                }
                disabled={
                  values[
                    props.children[currentQuestion].props
                      .questionKey
                  ] === undefined
                }
                onClick={() => {
                  if (
                    props.onVerifyStep &&
                    props.onVerifyStep(
                      currentQuestion,
                      answer
                    ) !== true
                  ) {
                    setError(
                      props.onVerifyStep(
                        currentQuestion,
                        answer
                      ) as string
                    );
                    return;
                  }
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
      </div>
    </context.Provider>
  );
};

const Question = <TInterface extends Interface>(
  props: QuestionProps<TInterface>
) => {
  const { answer, setAnswer } = React.useContext(context);

  return (
    <div className={styles.questionContainer}>
      <h3>
        <ReactMarkdown children={props.question} />
      </h3>
      <div className={styles.answerContainer}>
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
            <ReactMarkdown children={currentAnswer} />
          </label>
        ))}
      </div>
    </div>
  );
};

Quiz.Question = Question;
