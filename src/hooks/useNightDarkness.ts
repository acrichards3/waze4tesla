import React from "react";
import SunCalc from "suncalc";
import { usePolling } from "~/hooks/usePolling";

const UPDATE_INTERVAL_MS = 60 * 1000;
const COORDS_KEY = "w4t-coords";
const NIGHT_KEY = "w4t-night";

export function computeNightDarkness(now: Date, lat: number, lon: number): number {
  const { sunrise, sunset } = SunCalc.getTimes(now, lat, lon);
  return now >= sunrise && now <= sunset ? 0 : 1;
}

interface StoredCoords {
  lat: number;
  lon: number;
}

function isStoredCoords(value: unknown): value is StoredCoords {
  if (typeof value !== "object" || value === null) return false;
  if (!("lat" in value) || !("lon" in value)) return false;
  return typeof value.lat === "number" && typeof value.lon === "number";
}

function storedCoords(): StoredCoords | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(COORDS_KEY);
  if (raw === null) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isStoredCoords(parsed) ? parsed : null;
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

export function persistNightState(darkness: number, lat?: number, lon?: number): void {
  if (typeof window === "undefined") return;
  document.documentElement.classList.toggle("night", darkness > 0);
  localStorage.setItem(NIGHT_KEY, darkness > 0 ? "1" : "0");
  if (lat != null && lon != null) {
    localStorage.setItem(COORDS_KEY, JSON.stringify({ lat, lon }));
  }
}
