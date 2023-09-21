import React from "react";
import { Quiz } from "../Quiz/Quiz";
import ConfettiExplosion from "react-confetti-explosion";
import styles from "./KompetanseTest.module.scss";
import useIsBrowser from "@docusaurus/useIsBrowser";
import useGlobalData from "@docusaurus/useGlobalData";
import { useMutation } from "react-query";
import { useFetch } from "@site/src/utils/api";
import { queryClient } from "@site/src/theme/Root";
import { useCurrentDocID } from "@site/src/hooks/useCurrentDocID";
import { progressChannel } from "@site/src/lib/custom-events";
import { useAuth } from "@site/src/auth/useAuth";

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
  const auth = useAuth();
  const appFetch = useFetch();
  const updateProgress = useMutation({
    mutationFn: async (docId: string) => {
      const res = await appFetch(
        `/.netlify/functions/set-completed`,
        {
          method: "POST",
          body: JSON.stringify({
            id: docId,
          }),
        }
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["progress", { docId }]);
      if (!auth.isLoggedIn) {
        localStorage.setItem(`progress-${docId}`, "true");
        progressChannel.send({
          docId,
        });
      }
    },
  });

  const docId = useCurrentDocID();

  const onSubmit = (answers: Record<string, string>) => {
    let i = 0;
    let errors = 0;
    for (const key in answers) {
      const sporsmal = props.data.sporsmal[i];
      if (
        sporsmal.svar.indexOf(answers[key]) !== sporsmal.korrekt
      ) {
        errors++;
        // For debugging av feil svar
        /* console.log(
          "error:",
          answers[key],
          sporsmal.svar[sporsmal.korrekt]
        ) */
      }
      i++;
    }
    setSuccess(errors === 0);
    if (errors === 0) {
      updateProgress.mutate(docId);
    }
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
