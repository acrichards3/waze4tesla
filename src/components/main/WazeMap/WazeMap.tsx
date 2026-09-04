import React from "react";
import styles from "./WazeMap.module.scss";

interface WazeMapProps {
  currentLat: number;
  currentLon: number;
  previousLat: number;
  previousLon: number;
  darkness: number;
}

const SCALE = 0.65;
const IFRAME_SIZE = Math.round(2000 / SCALE);

export const WazeMap: React.FC<WazeMapProps> = (props) => {
  const { currentLat, currentLon, previousLat, previousLon, darkness } = props;
  const angle = Math.atan2(currentLat - previousLat, currentLon - previousLon) * (180 / Math.PI);
  const mapAngle = angle < 0 ? angle + 360 : angle;
  const adjustedAngle = (mapAngle - 90) % 360;
  const filter = darkness > 0 ? `invert(${darkness}) hue-rotate(${darkness * 180}deg)` : undefined;

  return (
    <div className={styles.container} style={{ transform: `rotate(${adjustedAngle}deg) scale(${SCALE})` }}>
      <iframe
        id="wazeMap"
        className={styles.map}
        style={{ filter }}
        src={`https://embed.waze.com/iframe?zoom=14&lat=${props.currentLat}&lon=${props.currentLon}`}
        width={`${IFRAME_SIZE}px`}
        height={`${IFRAME_SIZE}px`}
      ></iframe>
    </div>
  );
};
