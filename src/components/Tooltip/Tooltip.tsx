import React from "react";
import styles from "./Tooltip.module.scss";

export const Tooltip = ({children, hint}) => {
    return (<span className={styles.tooltip}>
        {children}
        <span className={styles.hint}>{hint}</span>
    </span>);
};
