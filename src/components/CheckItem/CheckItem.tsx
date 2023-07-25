import ConfettiExplosion from "react-confetti-explosion";
import { useLocalStorageState } from "@site/src/hooks/useLocalStorage";
import React, { useState } from "react";
import styles from "./CheckItem.module.scss";
import { useAuth } from "@site/src/auth/useAuth";
import {
  useGetFunction,
  useLazyGetFunction,
} from "@site/src/hooks/useFunction";

export type CheckItem = {
  id: string;
  label: string;
};

let timer: ReturnType<typeof setTimeout> = setTimeout(() => {},
0);
export const CheckItem = ({ id, label }: CheckItem) => {
  const auth = useAuth();
  const [isExploding, setIsExploding] = useState(false);
  const [lsChecked, lsSetChecked] =
    useLocalStorageState<boolean>({
      id,
      defaultValue: false,
      serialize: (value) => value.toString(),
      deserialize: (value) => value === "true",
    });
  const serverState = useGetFunction<{ checked: string[] }>(
    "get-checked",
    { skip: !auth.isLoggedIn },
    [id, auth.isLoggedIn]
  );
  const [checkItem] = useLazyGetFunction("check-item", {
    params: new URLSearchParams({
      item: id,
    }),
  });
  const checked = auth.isLoggedIn
    ? serverState.data?.checked?.includes(id)
    : lsChecked;

  const toggleChecked = async () => {
    if (auth.isLoggedIn) {
      const oldChecked = checked;
      await checkItem();
      serverState.refetch();
      if (!oldChecked) {
        setIsExploding(true);
        clearTimeout(timer);
        timer = setTimeout(() => {
          setIsExploding(false);
        }, 2200);
      }
    } else {
      lsSetChecked(!lsChecked);
      if (!lsChecked) {
        setIsExploding(true);
        clearTimeout(timer);
        timer = setTimeout(() => {
          setIsExploding(false);
        }, 2200);
      }
    }
  };

  return (
    <label className={styles.label} title="Marker som gjort">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={toggleChecked}
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
