import React from "react";

export function H2(props: { children: string }) {
  const id = props.children.toLowerCase().split(" ").join("-");
  return (
    <h2
      className="anchor anchorWithHideOnScrollNavbar_WYt5"
      id={id}
    >
      {props.children}
      <a
        href={`#${id}`}
        className="hash-link"
        aria-label={`Direkte lenke til ${props.children}`}
        title={`Direkte lenke til ${props.children}`}
      >
        {" "}
      </a>
    </h2>
  );
}

export function H3(props: { children: string }) {
  const id = props.children.toLowerCase().split(" ").join("-");
  return (
    <h3
      className="anchor anchorWithHideOnScrollNavbar_WYt5"
      id={id}
    >
      {props.children}
      <a
        href={`#${id}`}
        className="hash-link"
        aria-label={`Direkte lenke til ${props.children}`}
        title={`Direkte lenke til ${props.children}`}
      >
        {" "}
      </a>
    </h3>
  );
}
