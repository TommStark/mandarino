import { useEffect, useState } from 'react';

export default function useDebouncedValue<T>(
  value: T,
  delay = 400,
): [T, boolean] {
  const [debounced, setDebounced] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);
  useEffect(() => {
    setIsDebouncing(true);
    const t = setTimeout(() => {
      setDebounced(value);
      setIsDebouncing(false);
    }, delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return [debounced, isDebouncing];
}
