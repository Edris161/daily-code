/**
 * Simple className merger utility (replaces clsx)
 */
export const clsx = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes
    .filter((c) => typeof c === 'string' && c.length > 0)
    .join(' ');
};

/**
 * Check if running on client side
 */
export const isClient = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Check if running on server side
 */
export const isServer = (): boolean => {
  return typeof window === 'undefined';
};

/**
 * Get local storage item safely
 */
export const getLocalStorage = <T,>(key: string, defaultValue?: T): T | null => {
  if (!isClient()) return defaultValue ?? null;

  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue ?? null;
  } catch {
    return defaultValue ?? null;
  }
};

/**
 * Set local storage item safely
 */
export const setLocalStorage = <T,>(key: string, value: T): void => {
  if (!isClient()) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error(`Failed to set localStorage key "${key}"`);
  }
};

/**
 * Remove local storage item
 */
export const removeLocalStorage = (key: string): void => {
  if (!isClient()) return;
  localStorage.removeItem(key);
};

/**
 * Clear all local storage
 */
export const clearLocalStorage = (): void => {
  if (!isClient()) return;
  localStorage.clear();
};

/**
 * Get session storage item safely
 */
export const getSessionStorage = <T,>(key: string, defaultValue?: T): T | null => {
  if (!isClient()) return defaultValue ?? null;

  try {
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue ?? null;
  } catch {
    return defaultValue ?? null;
  }
};

/**
 * Set session storage item safely
 */
export const setSessionStorage = <T,>(key: string, value: T): void => {
  if (!isClient()) return;

  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error(`Failed to set sessionStorage key "${key}"`);
  }
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Deep clone object
 */
export const deepClone = <T,>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as unknown as T;
  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
};

/**
 * Merge objects
 */
export const mergeObjects = <T extends Record<string, unknown>>(
  ...objects: Partial<T>[]
): T => {
  return objects.reduce((acc, obj) => ({ ...acc, ...obj }), {} as T);
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj: unknown): boolean => {
  if (typeof obj !== 'object' || obj === null) return true;
  return Object.keys(obj).length === 0;
};

/**
 * Retry promise with exponential backoff
 */
export const retry = async <T,>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    delay?: number;
    backoff?: boolean;
  } = {}
): Promise<T> => {
  const { maxAttempts = 3, delay = 1000, backoff = true } = options;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;

      const wait = backoff ? delay * Math.pow(2, attempt - 1) : delay;
      await new Promise((resolve) => setTimeout(resolve, wait));
    }
  }

  throw new Error('Retry failed');
};

/**
 * Generate random string
 */
export const generateRandomString = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate UUID
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Check if array has duplicates
 */
export const hasDuplicates = <T,>(arr: T[]): boolean => {
  return new Set(arr).size !== arr.length;
};

/**
 * Remove duplicates from array
 */
export const removeDuplicates = <T,>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

/**
 * Flatten nested array
 */
export const flattenArray = <T,>(arr: (T | T[])[]): T[] => {
  return arr.reduce((acc: T[], val) => {
    if (Array.isArray(val)) {
      return acc.concat(flattenArray(val));
    } else {
      return acc.concat(val);
    }
  }, []);
};

/**
 * Chunk array
 */
export const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

/**
 * Wait for condition to be true
 */
export const waitFor = async (
  condition: () => boolean,
  options: { timeout?: number; interval?: number } = {}
): Promise<void> => {
  const { timeout = 10000, interval = 100 } = options;
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for condition'));
      } else {
        setTimeout(check, interval);
      }
    };

    check();
  });
};
