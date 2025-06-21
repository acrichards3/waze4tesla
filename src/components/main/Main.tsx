import React from "react";
import styles from "./Main.module.scss";
import { DriverIcon } from "./DriverIcon/DriverIcon";
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
            if (prev == null) {
              return {
                current: { latitude, longitude },
                previous: { latitude, longitude },
              };
            }
            return {
              current: { latitude, longitude },
              previous: prev.current,
            };
          });
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    },
    intervalMs: 8000,
  });

  if (position == null) return <LoadingScreen />;

  console.log(position);

  return (
    <div className={styles.container}>
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
