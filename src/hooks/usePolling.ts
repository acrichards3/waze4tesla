import React from "react";

interface UsePollingParams {
  callback: () => void;
  intervalMs: number;
}

export function usePolling({ callback, intervalMs }: UsePollingParams): void {
  const savedCallback = React.useRef<() => void>(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    savedCallback.current();

    const id = setInterval(() => {
      savedCallback.current();
    }, intervalMs);

    return () => clearInterval(id);
  }, [intervalMs]);
}
