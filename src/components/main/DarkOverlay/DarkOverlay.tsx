import React from "react";
import SunCalc from "suncalc";
import styles from "./DarkOverlay.module.scss";
import { usePolling } from "~/hooks/usePolling";

interface DarkOverlayProps {
  currentLat: number;
  currentLon: number;
}

const TRANSITION_DURATION_MS = 45 * 60 * 1000; // 45 minutes
const MAX_OPACITY = 0.8;
const UPDATE_INTERVAL_MS = 60 * 1000; // Update every minute

export const DarkOverlay: React.FC<DarkOverlayProps> = (props) => {
  const [now, setNow] = React.useState(() => new Date());

  usePolling({
    callback: React.useCallback(() => setNow(new Date()), []),
    intervalMs: UPDATE_INTERVAL_MS,
  });

  const { sunrise, sunset } = SunCalc.getTimes(now, props.currentLat, props.currentLon);

  if (now >= sunrise && now <= sunset) {
    return null;
  }

  let opacity = 0;

  if (now > sunset) {
    const timeSinceSunset = now.getTime() - sunset.getTime();
    if (timeSinceSunset < TRANSITION_DURATION_MS) {
      opacity = (timeSinceSunset / TRANSITION_DURATION_MS) * MAX_OPACITY;
    } else {
      opacity = MAX_OPACITY;
    }
  } else {
    const timeUntilSunrise = sunrise.getTime() - now.getTime();
    if (timeUntilSunrise < TRANSITION_DURATION_MS) {
      opacity = (timeUntilSunrise / TRANSITION_DURATION_MS) * MAX_OPACITY;
    } else {
      opacity = MAX_OPACITY;
    }
  }

  if (opacity === 0) return null;

  return <div className={styles.overlay} style={{ opacity }} />;
};
