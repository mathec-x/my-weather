import React from "react";
import { LocalStorageValues } from "@typeroots/localstorage";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

/**
 * there are no better hooks than usehooks-ts
 * 
 * @see https://usehooks-ts.com/react-hook/use-local-storage
 */

export default function useLocalstorage<Key extends keyof LocalStorageValues>(
  key: Key,
  defaultValue: LocalStorageValues[Key]
) {
  return useLocalStorage(key, defaultValue)
};

export function useReadstorage<Key extends keyof LocalStorageValues>(
  key: Key
) {
  return useReadLocalStorage<LocalStorageValues[Key]>(key)
};