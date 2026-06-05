"use client";

import { create }
from "zustand";

import { persist }
from "zustand/middleware";

import { safeStorage }
from "@/lib/safeStorage";

import {
  getLevelInfo,
} from "@/lib/getLevelInfo";

import {
  useAchievementStore,
} from "./useAchievementStore";

import {
  useActivityFeedStore,
} from "./useActivityFeedStore";

export const useGamificationStore =
  create(

    persist(

      (set, get) => ({

        /*
        ━━━━━━━━━━━━━━━━━━━
        XP
        ━━━━━━━━━━━━━━━━━━━
        */
        xp: 0,

        /*
        ━━━━━━━━━━━━━━━━━━━
        SET XP
        ━━━━━━━━━━━━━━━━━━━
        */
        setXP:
          (xp) =>

            set({
              xp,
            }),

        /*
        ━━━━━━━━━━━━━━━━━━━
        LEVEL MODAL
        ━━━━━━━━━━━━━━━━━━━
        */
        showLevelUp:
          false,

        levelUpData:
          null,

        /*
        ━━━━━━━━━━━━━━━━━━━
        ADD XP
        ━━━━━━━━━━━━━━━━━━━
        */
        addXP:
          (amount) => {

            const oldXP =
              get().xp;

            const newXP =
              oldXP + amount;

            const oldLevel =
              getLevelInfo(
                oldXP
              );

            const newLevel =
              getLevelInfo(
                newXP
              );

            /*
            UPDATE XP
            */
            set({
              xp: newXP,
            });

            /*
            ACHIEVEMENT
            */
            useAchievementStore
              .getState()
              .updateStats({

                xp: newXP,

              });

            /*
            XP FEED
            */
            useActivityFeedStore
              .getState()
              .addActivity({

                type: "xp",

                title:
                  `+${amount} XP Didapatkan`,

                description:
                  "Progress meningkat",

              });

            /*
            LEVEL UP
            */
            if (
              newLevel.level >
              oldLevel.level
            ) {

              /*
              SHOW MODAL
              */
              set({

                showLevelUp:
                  true,

                levelUpData:
                  newLevel,

              });

              /*
              LEVEL FEED
              */
              useActivityFeedStore
                .getState()
                .addActivity({

                  type: "level",

                  title:
                    `Naik ke Level ${newLevel.level}`,

                  description:
                    `${newLevel.title} berhasil dibuka`,

                });

            }

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        CLOSE MODAL
        ━━━━━━━━━━━━━━━━━━━
        */
        closeLevelUp:
          () =>

            set({

              showLevelUp:
                false,

              levelUpData:
                null,

            }),

      }),

      {
        name:
          "gamification-storage",
        storage:
          safeStorage,
      }

    )

  );