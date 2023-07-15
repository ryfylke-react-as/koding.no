import React from "react";
import { CheckItem } from "../CheckItem/CheckItem";

export type Props = { items: CheckItem[] };

export const CheckItemList = ({ items }: Props) => {
  return (
    <ul style={{ listStyle: "none", padding: "0 0 0 1rem" }}>
      {items.map((item) => (
        <li key={item.id}>
          <CheckItem {...item} />
        </li>
      ))}
    </ul>
  );
};
