import { useLocalStorageState } from "@site/src/hooks/useLocalStorage";
import React, { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import styled from "styled-components";

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
    <StyledLabel title="Marker som gjort">
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
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  display: flex;
  gap: 0.25rem;
  cursor: pointer;
  font-size: 1.275rem;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: -0.25rem;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--ifm-color-primary);
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }
  &:hover::before {
    opacity: 0.5;
  }
  &:has(input:checked) {
    color: var(--ifm-color-primary);
    &::before {
      transition: all 0.2s ease-in-out;
      opacity: 0;
      left: 0;
      transform: translate(50%, -50%);
    }
  }
  &:active {
    &::before {
      opacity: 1;
    }
  }
`;
