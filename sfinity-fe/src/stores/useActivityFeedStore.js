"use client";

import { create }
from "zustand";

import api
from "@/lib/api";

export const useActivityFeedStore =
  create((set, get) => ({

    /*
    ━━━━━━━━━━━━━━━━━━━
    STATE
    ━━━━━━━━━━━━━━━━━━━
    */
    activities: [],

    loading: false,

    /*
    ━━━━━━━━━━━━━━━━━━━
    FETCH
    ━━━━━━━━━━━━━━━━━━━
    */
   fetchActivities:
  async () => {

    try {

      console.log(
        "FETCHING ACTIVITIES..."
      );

      set({
        loading: true,
      });

      const response =
        await api.get(
          "/activities"
        );

      console.log(
        "ACTIVITY RESPONSE:",
        response.data
      );

      set({

        activities:
          response.data.activities || [],

        loading: false,

      });

    } catch (error) {

      console.log(
        "FETCH ACTIVITY ERROR:"
      );

      console.log(error);

      set({
        loading: false,
      });

    }

  },

    /*
    ━━━━━━━━━━━━━━━━━━━
    ADD LOCAL REALTIME
    ━━━━━━━━━━━━━━━━━━━
    */
    addActivity:
      (activity) =>

        set((state) => ({

          activities: [

            activity,

            ...state.activities,

          ],

        })),

    /*
    ━━━━━━━━━━━━━━━━━━━
    CLEAR
    ━━━━━━━━━━━━━━━━━━━
    */
    clearActivities:
      () =>

        set({

          activities: [],

        }),

  }));