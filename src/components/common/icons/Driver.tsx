import React from 'react';
import styles from './Driver.module.scss';

interface DriverProps {
  currLat: number;
  currLon: number;
  prevLat: number | undefined;
  prevLon: number | undefined;
}

export default function Driver(props: DriverProps) {
  const { currLat, currLon, prevLat, prevLon } = props;
  const [driverAngle, setDriverAngle] = React.useState<number>(0);

  React.useEffect(() => {
    if (prevLat && prevLon) {
      const angle =
        (Math.atan2(currLat - prevLat, currLon - prevLon) * 180) / Math.PI;
      if (angle !== driverAngle) {
        setDriverAngle(angle);
      }
    } else {
      setDriverAngle(0);
    }
  }, [currLat, currLon]);

  return (
    <div
      className={styles.driver}
      style={{ transform: `rotate(${driverAngle}deg)` }}
    ></div>
  );
}
