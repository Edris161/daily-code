'use client';

import { useState, useEffect, useCallback } from 'react';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@/utils/helpers';

/**
 * Hook for managing local storage
 */
export const useLocalStorage = <T,>(key: string, initialValue?: T) => {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    return getLocalStorage<T>(key, initialValue);
  });

  const setValue = useCallback(
    (value: T | ((val: T | null) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        setLocalStorage(key, valueToStore);
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      removeLocalStorage(key);
      setStoredValue(null);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue, removeValue] as const;
};
