import React from 'react';
import WazeMap from '../common/maps/WazeMap';
import styles from './Main.module.scss';

export default function Main() {
  return (
    <div className={styles.container}>
      <WazeMap />
    </div>
  );
}
