// src/stores/useAchievementStore.js

"use client";

import { create }
from "zustand";

import { persist }
from "zustand/middleware";

import { safeStorage }
from "@/lib/safeStorage";

import {
  achievementList,
} from "@/data/achievementData";

export const useAchievementStore =
  create(

    persist(

      (set, get) => ({

        /*
        ━━━━━━━━━━━━━━━━━━━
        UNLOCKED
        ━━━━━━━━━━━━━━━━━━━
        */
        unlocked: [],

        /*
        ━━━━━━━━━━━━━━━━━━━
        ACHIEVEMENT MODAL
        ━━━━━━━━━━━━━━━━━━━
        */
        showAchievement:
          false,

        achievementData:
          null,

        /*
        ━━━━━━━━━━━━━━━━━━━
        STATS
        ━━━━━━━━━━━━━━━━━━━
        */
        stats: {

          receiptsScanned: 0,

          transactions: 0,

          streak: 0,

          xp: 0,

          completedMissions: 0,

          budgetsCompleted: 0,

        },

        /*
        ━━━━━━━━━━━━━━━━━━━
        CLOSE MODAL
        ━━━━━━━━━━━━━━━━━━━
        */
        closeAchievement:
          () =>

            set({

              showAchievement:
                false,

              achievementData:
                null,

            }),

        /*
        ━━━━━━━━━━━━━━━━━━━
        UPDATE STATS
        ━━━━━━━━━━━━━━━━━━━
        */
        updateStats:
          (newStats) => {

            const updatedStats = {

              ...get().stats,

              ...newStats,

            };

            set({
              stats:
                updatedStats,
            });

            /*
            AUTO CHECK
            */
            get()
              .checkAchievements();

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        UNLOCK
        ━━━━━━━━━━━━━━━━━━━
        */
        unlockAchievement:
          (
            id,
            achievement
          ) => {

            const current =
              get()
                .unlocked;

            /*
            ALREADY
            */
            if (
              current.includes(
                id
              )
            ) {
              return;
            }

            set({

              unlocked: [

                ...current,

                id,

              ],

              /*
              SHOW POPUP
              */
              showAchievement:
                true,

              achievementData:
                achievement,

            });

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        CHECK
        ━━━━━━━━━━━━━━━━━━━
        */
        checkAchievements:
          () => {

            const {
              stats,
            } = get();

            achievementList.forEach(
              (
                achievement
              ) => {

                /*
                ALREADY
                */
                if (
                  get()
                    .unlocked.includes(
                      achievement.id
                    )
                ) {
                  return;
                }

                /*
                CURRENT VALUE
                */
                const currentValue =

                  stats[
                    achievement.type
                  ] || 0;

                /*
                COMPLETE
                */
                if (
                  currentValue >=
                  achievement.target
                ) {

                  get()
                    .unlockAchievement(

                      achievement.id,

                      achievement

                    );

                }

              }
            );

          },

      }),

      {
        name:
          "achievement-storage",
        storage:
          safeStorage,
      }

    )

  );