import React from "react";

type Link = {
  title: string;
  url: string;
};

type Props = {
  videos?: Link[];
  articles?: Link[];
  courses?: Link[];
  documentation?: Link[];
  float?: "left" | "right";
};

const keysToTitle = {
  videos: "Videoer",
  articles: "Artikler",
  courses: "Kurs",
  documentation: "Dokumentasjon",
};

const iconSize = 16;

const keysToIcon = {
  videos: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: iconSize, height: iconSize }}
    >
      <path
        strokeLinecap="round"
        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  ),
  articles: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: iconSize, height: iconSize }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  ),
  courses: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: iconSize, height: iconSize }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  ),
  documentation: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: iconSize, height: iconSize }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
      />
    </svg>
  ),
};

export const RelevantLinks = (props: Props) => {
  return (
    <div
      className="card "
      style={{
        background: "var(--ifm-color-info-contrast-background)",
        padding: "1rem",
        ...(props.float
          ? props.float === "left"
            ? {
                float: "left",
                maxWidth: "400px",
                marginRight: "1rem",
              }
            : {
                float: "right",
                maxWidth: "400px",
                marginLeft: "1rem",
              }
          : {
              marginBottom: "1rem",
              width: "max-content",
              maxWidth: "100%",
            }),
      }}
    >
      {Object.keys(props).map((key) =>
        Array.isArray(props[key]) ? (
          <div>
            <ul
              style={{
                padding: 0,
                listStyle: "none",
                margin: 0,
              }}
            >
              {props[key as "videos"].map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "75%",
                      color:
                        "var(--ifm-color-info-contrast-foreground)",
                    }}
                  >
                    {keysToIcon[key as keyof typeof keysToIcon]}
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null
      )}
    </div>
  );
};
