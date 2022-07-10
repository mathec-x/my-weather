import { LocalStorageValues } from "@typeroots/localstorage";
import React, { useState, useEffect } from "react";

function getStorageValue<Key extends keyof LocalStorageValues>(
  key: Key,
  defaultValue: LocalStorageValues[Key]
) {
  // getting stored value
  const saved = localStorage.getItem(key) as any;
  try {
    const initial = JSON.parse(saved);
    return initial || defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

const useLocalStorage = <Key extends keyof LocalStorageValues>(
    key: Key,
    defaultValue: LocalStorageValues[Key]
) => {
  const [value, setValue] = useState<any>(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [ LocalStorageValues[Key], React.Dispatch<LocalStorageValues[Key]> ];
};

export default useLocalStorage