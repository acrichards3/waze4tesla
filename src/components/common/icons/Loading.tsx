import React from 'react';
import { LineWave } from 'react-loader-spinner';
import styles from './Icons.module.scss';

export default function Loading() {
  return (
    <div className={styles.loader}>
      Loading
      <LineWave
        height="100"
        width="100"
        color="#88bbfd"
        ariaLabel="line-wave"
      />
    </div>
  );
}
