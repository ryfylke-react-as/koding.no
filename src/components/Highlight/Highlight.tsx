import React from "react";

export function Highlight(props: { children: string }) {
  return (
    <span style={{ color: "var(--ifm-color-primary)" }}>
      {props.children}
    </span>
  );
}
