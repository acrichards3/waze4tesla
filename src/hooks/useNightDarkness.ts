import React from "react";
import SunCalc from "suncalc";
import { usePolling } from "~/hooks/usePolling";

const TRANSITION_DURATION_MS = 45 * 60 * 1000;
const UPDATE_INTERVAL_MS = 60 * 1000;
const COORDS_KEY = "w4t-coords";
const NIGHT_KEY = "w4t-night";

export function computeNightDarkness(now: Date, lat: number, lon: number): number {
  const { sunrise, sunset } = SunCalc.getTimes(now, lat, lon);

  if (now >= sunrise && now <= sunset) return 0;

  if (now > sunset) {
    const elapsed = now.getTime() - sunset.getTime();
    return elapsed < TRANSITION_DURATION_MS ? elapsed / TRANSITION_DURATION_MS : 1;
  }

  const remaining = sunrise.getTime() - now.getTime();
  return remaining < TRANSITION_DURATION_MS ? remaining / TRANSITION_DURATION_MS : 1;
}

function storedCoords(): { lat: number; lon: number } | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(COORDS_KEY) || "null");
  } catch {
    return null;
  }
}

export function useNightDarkness(lat?: number, lon?: number): number {
  const [now, setNow] = React.useState(() => new Date());

  usePolling({
    callback: React.useCallback(() => setNow(new Date()), []),
    intervalMs: UPDATE_INTERVAL_MS,
  });

  if (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("dark")) {
    return 1;
  }

  const saved = lat == null || lon == null ? storedCoords() : null;
  const useLat = lat ?? saved?.lat;
  const useLon = lon ?? saved?.lon;
  if (useLat == null || useLon == null) return 0;

  return computeNightDarkness(now, useLat, useLon);
}

export function persistNightState(darkness: number, lat?: number, lon?: number) {
  if (typeof window === "undefined") return;
  document.documentElement.classList.toggle("night", darkness > 0);
  localStorage.setItem(NIGHT_KEY, darkness > 0 ? "1" : "0");
  if (lat != null && lon != null) {
    localStorage.setItem(COORDS_KEY, JSON.stringify({ lat, lon }));
  }
}
