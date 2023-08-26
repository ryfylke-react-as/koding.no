import { useAllDocsData } from "@docusaurus/plugin-content-docs/lib/client/index.js";
import useGlobalData, {
  usePluginData,
} from "@docusaurus/useGlobalData";
import React from "react";
import styles from "./ReferenceLink.module.scss";

/**
 * DRAFT COMPONENT, NOT IN USE
 */

export const ReferenceLink = (props: { href: string }) => {
  const allDocsData = useAllDocsData();
  const ressurserData = usePluginData("ressurser");

  const allDocKeys = Object.keys(allDocsData).filter(
    (key) => key !== "default"
  );
  const allPaths = allDocKeys.reduce((acc, item) => {
    const docs = allDocsData[item].versions[0].docs.map(
      (doc) => doc.path
    );
    return [...acc, ...docs];
  }, [] as string[]);

  console.log(useGlobalData());

  return (
    <div className={styles.container}>
      <a href={props.href}>Google</a>
    </div>
  );
};
