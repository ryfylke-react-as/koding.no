import React from "react";
import DocSidebarItem from "@theme-original/DocSidebarItem";

export default function DocSidebarItemWrapper(props: {
  item: {
    docId: string;
    href: string;
    label: string;
    type: string;
  };
  activePath: string;
  index: number;
}) {
  return (
    <>
      <DocSidebarItem {...props} />
    </>
  );
}
