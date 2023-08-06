import React from "react";
import { Quiz } from "../Quiz/Quiz";
import ConfettiExplosion from "react-confetti-explosion";
import styles from "./KompetanseTest.module.scss";

export type KompetanseTestData = {
  tittel: string;
  sporsmal: Array<{
    sporsmal: string;
    svar: Array<string>;
    /** Index for rett svar */
    korrekt: number;
  }>;
  suksess?: string;
  feil?: string;
};

type Props = {
  data: KompetanseTestData;
};

export const KompetanseTest = (props: Props) => {
  const [success, setSuccess] = React.useState<boolean | null>(
    null
  );

  const onSubmit = (answers: Record<string, string>) => {
    let i = 0;
    let errors = 0;
    for (const key in answers) {
      const sporsmal = props.data.sporsmal[i];
      if (
        sporsmal.svar.indexOf(answers[key]) !== sporsmal.korrekt
      ) {
        errors++;
      }
      i++;
    }
    setSuccess(errors === 0);
  };

  return (
    <Quiz
      title={props.data.tittel}
      finishScreen={
        success ? (
          <div className={styles.success}>
            <AfterMs ms={600}>
              <ConfettiExplosion
                force={0.4}
                duration={2200}
                particleCount={30}
                width={400}
              />
            </AfterMs>
            {props.data.suksess ||
              "Du bestod! 🎉 Du kan nå gå videre til neste steg 🥳"}
          </div>
        ) : (
          props.data.feil ||
          "Du har ikke bestått testen 😵. Ta en kikk på ressursene og prøv igjen!"
        )
      }
      onSubmit={onSubmit}
    >
      {props.data.sporsmal.map((sporsmal) => (
        <Quiz.Question
          key={sporsmal.sporsmal}
          question={sporsmal.sporsmal}
          answers={sporsmal.svar}
          questionKey={sporsmal.sporsmal}
        />
      ))}
    </Quiz>
  );
};

const AfterMs = (props: {
  ms: number;
  children: React.ReactNode;
}) => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => setShow(true), props.ms);
    return () => clearTimeout(timeout);
  }, [props.ms]);
  return show ? props.children : null;
};
