import React from "react";
import styles from "./Main.module.scss";
import { DriverIcon } from "./DriverIcon/DriverIcon";
import { HazardScanner } from "./HazardScanner/HazardScanner";
import { LoadingScreen } from "./LoadingScreen/LoadingScreen";
import { WazeMap } from "./WazeMap/WazeMap";
import { usePolling } from "~/hooks/usePolling";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const Main: React.FC = () => {
  const [position, setPosition] = React.useState<{ current: Coordinates; previous: Coordinates } | null>(null);

  usePolling({
    callback: () => {
      navigator.geolocation.getCurrentPosition(
        (positionResult) => {
          const { latitude, longitude } = positionResult.coords;
          setPosition((prev) => {
            return {
              current: { latitude, longitude },
              previous: prev?.current ?? { latitude, longitude },
            };
          });
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    },
    intervalMs: position == null ? 1000 : 10000,
  });

  if (position == null) return <LoadingScreen />;

  return (
    <div className={styles.container}>
      <HazardScanner />
      <DriverIcon />
      <WazeMap
        currentLat={position.current.latitude}
        currentLon={position.current.longitude}
        previousLat={position.previous.latitude}
        previousLon={position.previous.longitude}
      />
    </div>
  );
};
