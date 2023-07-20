import React from "react";
import styles from "./DescriptiveLinkList.module.scss";

type DescriptiveLinkListProps = {
  items: {
    title: string;
    description: string;
    url: string;
  }[];
};

export const DescriptiveLinkList: React.FC<
  DescriptiveLinkListProps
> = ({ items }) => {
  return (
    <ul className={styles.container}>
      {items.map((item) => {
        const isExternal =
          !item.url.startsWith("/") &&
          !item.url.startsWith("#") &&
          !item.url.includes("koding.no");
        return (
          <li key={item.url}>
            <a href={item.url}>
              <h4>
                {isExternal ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                )}
                {item.title}
              </h4>
              <p>{item.description}</p>
            </a>
          </li>
        );
      })}
    </ul>
  );
};
