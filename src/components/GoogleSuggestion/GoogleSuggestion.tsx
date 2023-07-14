import React from "react";

type Props = {
  value: string;
};

export function GoogleSuggestion(props: Props) {
  return (
    <a
      href={`https://google.com/search?q=${encodeURIComponent(
        props.value
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: "0.5rem 1rem",
        background: "var(--ifm-background-surface-color)",
        color: "var(--ifm-color-emphasis-900)",
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        style={{
          width: "1rem",
          height: "1rem",
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      {props.value}

      <span
        style={{
          color: "var(--ifm-font-color-secondary)",
          opacity: 0.6,
        }}
      >
        Google søk
      </span>
    </a>
  );
}
