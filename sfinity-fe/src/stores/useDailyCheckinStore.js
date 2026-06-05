"use client";

import { create }
from "zustand";

export const useDailyCheckinStore =
  create((set) => ({

    streak: 0,

    lastCheckinDate:
      null,

    checkedDays: [],

    setCheckinData:
      ({
        streak,
        lastCheckinDate,
      }) => {

        let checkedDays = [];
        if (lastCheckinDate && streak > 0) {
          try {
            const parts = lastCheckinDate.split("-");
            const lastCheckinLocalDate = new Date(
              parseInt(parts[0]),
              parseInt(parts[1]) - 1,
              parseInt(parts[2])
            );
            const lastCheckinDayIndex = lastCheckinLocalDate.getDay(); // 0-6
            for (let i = 0; i < Math.min(streak, 7); i++) {
              const dayIndex = (lastCheckinDayIndex - i + 7) % 7;
              checkedDays.push(dayIndex);
            }
          } catch (e) {
            console.error("Error calculating checked days:", e);
          }
        }

        set({
          streak,
          lastCheckinDate,
          checkedDays,
        });

      },

    resetCheckin:
      () => {

        set({

          streak: 0,

          checkedDays: [],

          lastCheckinDate:
            null,

        });

      },

  }));