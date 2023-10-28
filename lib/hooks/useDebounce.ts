import { useEffect, useState } from "react";

export const useDebouce = <T>(value: T, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value]);

  return debouncedValue;
};
