/*
━━━━━━━━━━━━━━━━━━━
SAFE STORAGE
━━━━━━━━━━━━━━━━━━━
A localStorage wrapper that
handles QuotaExceededError
gracefully for Zustand persist.
*/

import {
  createJSONStorage,
} from "zustand/middleware";

const safeLocalStorage = {

  getItem: (name) => {

    try {

      return (
        localStorage.getItem(name)
      );

    } catch {

      return null;

    }

  },

  setItem: (name, value) => {

    try {

      localStorage.setItem(
        name,
        value
      );

    } catch {

      /*
      QUOTA EXCEEDED:
      Clear non-essential data
      and retry once.
      */
      try {

        const keysToKeep = [
          "auth-storage",
        ];

        const allKeys = [];

        for (
          let i = 0;
          i < localStorage.length;
          i++
        ) {
          allKeys.push(
            localStorage.key(i)
          );
        }

        allKeys.forEach((key) => {
          if (
            !keysToKeep.includes(key)
          ) {
            localStorage.removeItem(
              key
            );
          }
        });

        localStorage.setItem(
          name,
          value
        );

      } catch {
        // silently fail
      }

    }

  },

  removeItem: (name) => {

    try {

      localStorage.removeItem(name);

    } catch {
      // silently fail
    }

  },

};

export const safeStorage =
  createJSONStorage(
    () => safeLocalStorage
  );
