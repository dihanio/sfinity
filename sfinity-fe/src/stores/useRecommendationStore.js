// src/stores/useRecommendationStore.js

"use client";

import { create }
from "zustand";

import { persist }
from "zustand/middleware";

import { safeStorage }
from "@/lib/safeStorage";

export const useRecommendationStore =
  create(

    persist(

      (set) => ({

        /*
        ━━━━━━━━━━━━━━━━━━━
        STATE
        ━━━━━━━━━━━━━━━━━━━
        */
        recommendations:
          [],

        watchedVideos:
          [],

        viewedTips:
          [],

        activeChallenges:
          [],

        completedChallenges:
          [],

        /*
        ━━━━━━━━━━━━━━━━━━━
        SET RECOMMENDATIONS
        ━━━━━━━━━━━━━━━━━━━
        */
        setRecommendations:
          (data) => {

            set({

              recommendations:
                data,

            });

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        WATCH VIDEO
        ━━━━━━━━━━━━━━━━━━━
        */
        addWatchedVideo:
          (id) =>

            set((state) => ({

              watchedVideos:

                state.watchedVideos.includes(
                  id
                )

                  ? state.watchedVideos

                  : [

                      ...state.watchedVideos,

                      id,

                    ],

            })),

        /*
        ━━━━━━━━━━━━━━━━━━━
        VIEW TIP
        ━━━━━━━━━━━━━━━━━━━
        */
        markTipAsViewed:
          (id) =>

            set((state) => ({

              viewedTips:

                state.viewedTips.includes(
                  id
                )

                  ? state.viewedTips

                  : [

                      ...state.viewedTips,

                      id,

                    ],

            })),

        /*
        ━━━━━━━━━━━━━━━━━━━
        START CHALLENGE
        ━━━━━━━━━━━━━━━━━━━
        */
        startChallenge:
          (id) =>

            set((state) => ({

              activeChallenges:

                state.activeChallenges.includes(
                  id
                )

                  ? state.activeChallenges

                  : [

                      ...state.activeChallenges,

                      id,

                    ],

            })),

        /*
        ━━━━━━━━━━━━━━━━━━━
        COMPLETE CHALLENGE
        ━━━━━━━━━━━━━━━━━━━
        */
        completeChallenge:
          (id) =>

            set((state) => ({

              activeChallenges:

                state.activeChallenges.filter(
                  (item) =>
                    item !== id
                ),

              completedChallenges:

                state.completedChallenges.includes(
                  id
                )

                  ? state.completedChallenges

                  : [

                      ...state.completedChallenges,

                      id,

                    ],

            })),

      }),

      {
        name:
          "sfinity-recommendation",
        storage:
          safeStorage,
      }

    )

  );