import React from "react";
import Search from "@theme-original/Navbar/Search";
import { useAuth } from "@site/src/auth/useAuth";
import useIsBrowser from "@docusaurus/useIsBrowser";

export default function SearchWrapper(props) {
  return (
    <>
      <Search {...props} />
    </>
  );
}
