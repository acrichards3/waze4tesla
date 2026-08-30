import React from "react";
import SunCalc from "suncalc";
import { usePolling } from "~/hooks/usePolling";

const TRANSITION_DURATION_MS = 45 * 60 * 1000;
const UPDATE_INTERVAL_MS = 60 * 1000;

export function useNightDarkness(lat: number, lon: number): number {
  const [now, setNow] = React.useState(() => new Date());

  usePolling({
    callback: React.useCallback(() => setNow(new Date()), []),
    intervalMs: UPDATE_INTERVAL_MS,
  });

  // ponytail: ?dark=1 forces full night theme for daytime preview
  if (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("dark")) {
    return 1;
  }

  const { sunrise, sunset } = SunCalc.getTimes(now, lat, lon);

  if (now >= sunrise && now <= sunset) return 0;

  if (now > sunset) {
    const elapsed = now.getTime() - sunset.getTime();
    return elapsed < TRANSITION_DURATION_MS ? elapsed / TRANSITION_DURATION_MS : 1;
  }

  const remaining = sunrise.getTime() - now.getTime();
  return remaining < TRANSITION_DURATION_MS ? remaining / TRANSITION_DURATION_MS : 1;
}
