import React from "react";

type ColorBoxProps = {
  color: string;
  contrast?: string;
};

export const ColorBox: React.FC<ColorBoxProps> = ({
  color,
  contrast = "black",
}) => {
  return (
    <div
      style={{
        backgroundColor: color,
        color: `color-mix(in srgb, ${color} 20%, ${contrast})`,
        padding: "1rem",
        fontFamily: "var(--ifm-font-family-monospace)",
      }}
    >
      {color}
    </div>
  );
};
