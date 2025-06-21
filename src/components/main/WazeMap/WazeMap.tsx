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
  return (
    <div className={styles.container} style={{ transform: `rotate(${mapAngle}deg)` }}>
      <iframe
        id="wazeMap"
        src={`https://embed.waze.com/iframe?zoom=14&lat=${props.currentLat}&lon=${props.currentLon}`}
        width={"10000px"}
        height={"10000px"}
      ></iframe>
    </div>
  );
};
