"use client";

import { create }
from "zustand";

import { persist }
from "zustand/middleware";

import { safeStorage }
from "@/lib/safeStorage";

export const useAuthStore =
  create(

    persist(

      (set) => ({

        token: null,

        user: null,

        /*
          LOGIN
        */
        login: (
          token,
          user
        ) =>

          set({

            token,

            user,

          }),

        /*
          LOGOUT
        */
        logout: () =>

          set({

            token: null,

            user: null,

          }),

        /*
          SET USER
        */
        setUser: (
          user
        ) =>

          set({
            user,
          }),

        /*
          UPDATE USER
        */
        updateUser: (
          updatedData
        ) =>

          set((state) => ({

            user: {

              ...state.user,

              ...updatedData,

            },

          })),

      }),

      {
        name:
          "auth-storage",
        storage:
          safeStorage,
      }

    )

  );