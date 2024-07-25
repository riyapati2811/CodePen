import { useEffect, useState } from 'react';

const PREFIX = 'mycodepen-';

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) {
      console.log(`Retrieved ${prefixedKey} from localStorage:`, JSON.parse(jsonValue));
      return JSON.parse(jsonValue);
    }

    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    console.log(`Setting ${prefixedKey} to localStorage:`, value);
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
