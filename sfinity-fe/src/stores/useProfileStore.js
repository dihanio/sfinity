"use client";

import { create }
from "zustand";

import { persist }
from "zustand/middleware";

import { safeStorage }
from "@/lib/safeStorage";

export const useProfileStore =
  create(

    persist(

      (set) => ({

        /*
          PROFILE
        */
        name:
          "Berkah User",

        username:
          "@berkah",

        bio:
          "Financial Enthusiast 🚀",

        avatar:
          "https://i.pravatar.cc/300",

        joinedAt:
          new Date()
            .toISOString(),

        /*
          UPDATE PROFILE
        */
        updateProfile:
          (data) =>
            set((state) => ({

              ...state,

              ...data,

            })),

      }),

      {
        name:
          "profile-storage",
        storage:
          safeStorage,
      }

    )

  );