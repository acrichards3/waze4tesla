import React from 'react';
import Driver from '~/components/common/icons/Driver';
import HazardDetector from '~/components/common/hazardDetector/HazardDetector';
import useComponentCoordinates from '~/functions/useComponentCoordinates';
import styles from './DriverWatching.module.scss';

interface DriverWatchingProps {
  currLat: number;
  currLon: number;
  prevLat: number | undefined;
  prevLon: number | undefined;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}

export default function DriverWatching(props: DriverWatchingProps) {
  const [driverAngle, setDriverAngle] = React.useState<number>(0);
  const { componentRef, getCoordinates } = useComponentCoordinates();

  React.useEffect(() => {
    const coordinates = getCoordinates();
    if (coordinates) {
      console.log('triangle coordinates', coordinates);
      props.setPosition(coordinates);
    }
  }, [props.currLat, props.currLon]);

  return (
    <div
      className={styles.container}
      style={{ transform: `rotate(${driverAngle}deg)` }}
    >
      <div ref={componentRef}>
        <HazardDetector />
      </div>
      <Driver
        currLat={props.currLat}
        currLon={props.currLon}
        prevLat={props.prevLat}
        prevLon={props.prevLon}
      />
    </div>
  );
}
