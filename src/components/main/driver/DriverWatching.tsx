import React from 'react';
import Driver from '~/components/common/icons/Driver';
import HazardDetector from '~/components/common/hazardDetector/HazardDetector';
import styles from './DriverWatching.module.scss';

interface DriverWatchingProps {
  currLat: number;
  currLon: number;
  prevLat: number | undefined;
  prevLon: number | undefined;
}

export default function DriverWatching(props: DriverWatchingProps) {
  const [driverAngle, setDriverAngle] = React.useState<number>(0);

  return (
    <div
      className={styles.container}
      style={{ transform: `rotate(${driverAngle}deg)` }}
    >
      <HazardDetector />
      <Driver
        currLat={props.currLat}
        currLon={props.currLon}
        prevLat={props.prevLat}
        prevLon={props.prevLon}
      />
    </div>
  );
}
