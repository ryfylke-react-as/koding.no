import ConfettiExplosion from "react-confetti-explosion";
import { useLocalStorageState } from "@site/src/hooks/useLocalStorage";
import React, { useState } from "react";
import styles from "./CheckItem.module.scss";

export type CheckItem = {
  id: string;
  label: string;
};

let timer: ReturnType<typeof setTimeout> = setTimeout(() => {},
0);
export const CheckItem = ({ id, label }: CheckItem) => {
  const [isExploding, setIsExploding] = useState(false);
  const [checked, setChecked] = useLocalStorageState<boolean>({
    id,
    defaultValue: false,
    serialize: (value) => value.toString(),
    deserialize: (value) => value === "true",
  });

  return (
    <label className={styles.label} title="Marker som gjort">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          if (!checked) {
            setIsExploding(true);
            clearTimeout(timer);
            timer = setTimeout(() => {
              setIsExploding(false);
            }, 2200);
          } else {
            setIsExploding(false);
          }
        }}
      />
      {isExploding && (
        <ConfettiExplosion
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          force={0.4}
          duration={2200}
          particleCount={30}
          width={400}
        />
      )}
      {label}
    </label>
  );
};
