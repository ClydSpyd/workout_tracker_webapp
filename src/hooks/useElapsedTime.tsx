import { useEffect, useState } from 'react';

// Format seconds as HH:MM:SS
function formatElapsed(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [hrs, mins, secs].map((v) => v.toString().padStart(2, '0')).join(':');
}

/**
 *
 * @param {Date|null} from - The timestamp (Date object) to count from. Pass null to keep timer at zero.
 * @param {Date|null} [until] - The timestamp (Date object) to count until. Pass null to use the current time.
 * @param {boolean} [formatted=false] - If true, returns elapsed time as a formatted string (HH:MM:SS); otherwise returns seconds as a number
 * @returns - elapsed {number|string}: The number of seconds elapsed from the given timestamp or a formatted string if `formatted` is true
 */
export const useElapsedTime = ({
  from,
  until,
  formatted,
}: {
  from: Date | null;
  until?: Date | null;
  formatted?: boolean;
}) => {
  const fromMs = from ? from.getTime() : null;
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (fromMs === null) return;

    const intervalId = setInterval(() => {
      const now = until ? until.getTime() : Date.now();
      const elapsedSeconds = Math.floor((now - fromMs) / 1000);
      setElapsed(Math.max(0, elapsedSeconds));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [fromMs, until]);

  const value = fromMs === null ? 0 : elapsed;

  return formatted ? formatElapsed(value) : value;
};
