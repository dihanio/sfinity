"use client";

import { create }
from "zustand";

import {
  getReportAnalytics,
} from "@/services/reportService";

export const useReportStore =
  create((set) => ({

    analytics:
      null,

    loading:
      false,

    fetchAnalytics:
      async () => {

        try {

          set({
            loading: true,
          });

          const analytics =
            await getReportAnalytics();

          set({
            analytics,
          });

        } catch (error) {

          console.log(error);

        } finally {

          set({
            loading: false,
          });

        }

      },

  }));