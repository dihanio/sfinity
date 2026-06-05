"use client";

import { create }
from "zustand";

import { persist }
from "zustand/middleware";

import { safeStorage }
from "@/lib/safeStorage";

import api
from "@/lib/api";

export const useUserStore =
  create(

    persist(

      (set, get) => ({

        /*
        ━━━━━━━━━━━━━━━━━━━
        USER
        ━━━━━━━━━━━━━━━━━━━
        */
        user: null,
        loading: false,
        lastFetchedAt: 0,

        /*
        ━━━━━━━━━━━━━━━━━━━
        SET USER
        ━━━━━━━━━━━━━━━━━━━
        */
        setUser:
          (user) =>

            set({
              user,
            }),

        /*
        ━━━━━━━━━━━━━━━━━━━
        FETCH PROFILE
        ━━━━━━━━━━━━━━━━━━━
        */
        fetchProfile:
          async () => {

            const state = get();

            if (state.loading) {

              return;

            }

            try {

              set({
                loading: true,
              });

              const response =
                await api.get(
                  "/users/profile"
                );

              set({

                user:
                  response.data.user,
                lastFetchedAt:
                  Date.now(),

              });

            } catch (error) {

              console.log(error);

            } finally {

              set({
                loading: false,
              });

            }

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        UPDATE PROFILE
        ━━━━━━━━━━━━━━━━━━━
        */
        updateProfile:
          async (form) => {

            try {

              const response =
                await api.put(

                  "/users/profile",

                  form

                );

              /*
              UPDATE REALTIME
              */
              set({

                user:
                  response.data.user,
                lastFetchedAt:
                  Date.now(),

              });

              return {

                success: true,

              };

            } catch (error) {

              console.log(error);

              return {

                success: false,

              };

            }

          },

      }),

      {
        name:
          "user-storage",
        storage:
          safeStorage,
        partialize:
          (state) => ({
            user:
              state.user,
            lastFetchedAt:
              state.lastFetchedAt,
          }),
      }

    )

  );
