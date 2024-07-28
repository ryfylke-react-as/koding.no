import React from "react";
import styles from "./Tooltip.module.scss";

export const Tooltip = ({children, hint}) => {
    return (<span className={`${styles.tooltip} margin--0`}>
        {children}
        <span className={`${styles.hint} padding--md`}>{hint}</span>
    </span>);
};
