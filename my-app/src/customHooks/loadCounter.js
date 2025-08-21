import { useEffect, useState } from "react";

export function useCounter(duration = 45000, steps = 100) {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const intervalTime = duration / steps;

    const interval = setInterval(() => {
      setNumber((prev) => {
        if (prev >= steps) {
          clearInterval(interval);
          return steps;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [duration, steps]);

  return number;
}
