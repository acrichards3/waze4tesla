import React from "react";
import styles from "./WazeMap.module.scss";

interface WazeMapProps {
  currentLat: number;
  currentLon: number;
  previousLat: number;
  previousLon: number;
}

export const WazeMap: React.FC<WazeMapProps> = (props) => {
  const { currentLat, currentLon, previousLat, previousLon } = props;
  const angle = Math.atan2(currentLat - previousLat, currentLon - previousLon) * (180 / Math.PI);
  const mapAngle = angle < 0 ? angle + 360 : angle;
  const adjustedAngle = (mapAngle - 90) % 360;
  return (
    <div className={styles.container} style={{ transform: `rotate(${adjustedAngle}deg)` }}>
      <iframe
        id="wazeMap"
        src={`https://embed.waze.com/iframe?zoom=14&lat=${props.currentLat}&lon=${props.currentLon}`}
        width={"5000px"}
        height={"5000px"}
      ></iframe>
    </div>
  );
};
