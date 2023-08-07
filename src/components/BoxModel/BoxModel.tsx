import React from "react";
import styles from "./BoxModel.module.scss";

export const BoxModel = () => (
  <div className={styles.box}>
    Margin
    <div>
      Border
      <div>
        Padding
        <div>Innhold</div>
      </div>
    </div>
  </div>
);
