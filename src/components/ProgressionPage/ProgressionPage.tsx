import React, { useMemo } from "react";
import { CheckItemList } from "../CheckItemList/CheckItemList";
import { progressionMap } from "@site/src/constants/progression";

export const ProgressionPage = (props: {
  /** `frontend`, `backend`, `spillprogrammering`, etc... */
  id: string;
}) => {
  const progression = progressionMap[props.id];

  return (
    <>
      <h2>Mål</h2>
      <h3>Konsepter</h3>
      <CheckItemList
        items={Object.entries(progression.konsepter).map(
          ([key, value]) => ({
            id: key,
            label: value,
          })
        )}
      />
      <h3>Kodespråk</h3>
      <CheckItemList
        items={Object.entries(progression.kodesprak).map(
          ([key, value]) => ({
            id: key,
            label: value,
          })
        )}
      />
      <h3>Ferdigheter</h3>
      <CheckItemList
        items={Object.entries(progression.ferdigheter).map(
          ([key, value]) => ({
            id: key,
            label: value,
          })
        )}
      />
    </>
  );
};
