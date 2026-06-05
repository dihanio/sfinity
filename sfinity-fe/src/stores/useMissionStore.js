// src/stores/useMissionStore.js

"use client";

import { create }
from "zustand";

import { persist }
from "zustand/middleware";

import { safeStorage }
from "@/lib/safeStorage";

import {
  missionPool,
} from "@/data/missionPool";

/*
━━━━━━━━━━━━━━━━━━━
TODAY
━━━━━━━━━━━━━━━━━━━
*/
const getToday = () => {

  return new Date()
    .toISOString()
    .split("T")[0];

};

/*
━━━━━━━━━━━━━━━━━━━
FISHER YATES SHUFFLE
━━━━━━━━━━━━━━━━━━━
*/
const shuffleArray = (
  array = []
) => {

  const copied =
    [...array];

  for (
    let i =
      copied.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );

    [
      copied[i],
      copied[j],
    ] = [
      copied[j],
      copied[i],
    ];

  }

  return copied;

};

export const useMissionStore =
  create(

    persist(

      (set, get) => ({

        /*
        ━━━━━━━━━━━━━━━━━━━
        STATE
        ━━━━━━━━━━━━━━━━━━━
        */
        dailyMissions: [],

        completedMissions:
          [],

        lastGeneratedDate:
          null,

        /*
        ━━━━━━━━━━━━━━━━━━━
        GENERATE DAILY MISSIONS
        ━━━━━━━━━━━━━━━━━━━
        */
        generateDailyMissions:
          () => {

            const today =
              getToday();

            /*
            ALREADY GENERATED
            */
            if (

              get()
                .lastGeneratedDate ===
              today

            ) {
              return;
            }

            /*
            PICK BY CATEGORY
            */
            const selected = [

              /*
              CHECKIN
              */
              shuffleArray(
                missionPool.checkin
              )[0],

              /*
              TRANSACTION
              */
              shuffleArray(
                missionPool.transaction
              )[0],

              /*
              ARTICLE
              */
              shuffleArray(
                missionPool.article
              )[0],

              /*
              VIDEO
              */
              shuffleArray(
                missionPool.video
              )[0],

              /*
              RANDOM EXTRA
              */
              shuffleArray([

                ...missionPool.scan,

                ...missionPool.challenge,

              ])[0],

            ];

            /*
            SAVE
            */
            set({

              dailyMissions:
                selected,

              completedMissions:
                [],

              lastGeneratedDate:
                today,

            });

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        COMPLETE MISSION
        ━━━━━━━━━━━━━━━━━━━
        */
        completeMission:
          (id) => {

            const current =
              get()
                .completedMissions;

            /*
            AVOID DUPLICATE
            */
            if (
              current.includes(
                id
              )
            ) {
              return;
            }

            /*
            SAVE
            */
            set({

              completedMissions: [

                ...current,

                id,

              ],

            });

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        RESET MISSIONS
        ━━━━━━━━━━━━━━━━━━━
        */
        resetMissions:
          () => {

            set({

              dailyMissions:
                [],

              completedMissions:
                [],

              lastGeneratedDate:
                null,

            });

          },

      }),

      {
        name:
          "mission-storage",
        storage:
          safeStorage,
      }

    )

  );