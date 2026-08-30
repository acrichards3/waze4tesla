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
        src={`/waze-embed/iframe?zoom=13&lat=${props.currentLat}&lon=${props.currentLon}`}
        width={"2000px"}
        height={"2000px"}
      ></iframe>
    </div>
  );
};
