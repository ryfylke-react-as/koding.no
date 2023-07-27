import ConfettiExplosion from "react-confetti-explosion";
import React, { useState } from "react";
import styles from "./CheckItem.module.scss";

export type CheckItem = {
  id: string;
  label: string;
};

let timer: ReturnType<typeof setTimeout> = setTimeout(() => {},
0);

export const CheckItem = ({
  label,
  id,
  onToggle,
  checked,
}: CheckItem & {
  checked: boolean;
  onToggle: () => void;
}) => {
  const [isExploding, setIsExploding] = useState(false);

  return (
    <label className={styles.label} title="Marker som gjort">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => {
          onToggle();
          if (!checked) {
            setIsExploding(true);
            clearTimeout(timer);
            timer = setTimeout(() => {
              setIsExploding(false);
            }, 2000);
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
