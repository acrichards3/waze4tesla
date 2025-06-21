import React from "react";

interface UsePollingParams {
  callback: () => void | Promise<void>;
  intervalMs: number;
}

export function usePolling({ callback, intervalMs }: UsePollingParams): void {
  const savedCallback = React.useRef<() => void | Promise<void>>(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    void savedCallback.current();

    const id = setInterval(() => {
      void savedCallback.current();
    }, intervalMs);

    return () => clearInterval(id);
  }, [intervalMs]);
}
