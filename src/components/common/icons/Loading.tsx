import React from "react";
import styles from "./Icons.module.scss";
import { LineWave } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className={styles.loader}>
      Loading
      <LineWave
        width={100}
        height={100}
        color="#88bbfd"
        ariaLabel="line-wave"
      />
    </div>
  );
}
