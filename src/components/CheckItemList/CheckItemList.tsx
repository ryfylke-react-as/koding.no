import React from "react";
import { CheckItem } from "../CheckItem/CheckItem";
import BrowserOnly from "@docusaurus/BrowserOnly";

export type Props = { items: CheckItem[] };

export const CheckItemList = ({ items }: Props) => {
  return (
    <div className="card shadow-lg" style={{ padding: "1rem" }}>
      <BrowserOnly>
        {() => (
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              margin: 0,
              display: "grid",
              gap: "0.5rem",
            }}
          >
            {items.map((item) => (
              <li key={item.id}>
                <CheckItem {...item} />
              </li>
            ))}
          </ul>
        )}
      </BrowserOnly>
    </div>
  );
};
