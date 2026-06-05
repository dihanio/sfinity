import { create }
from "zustand";

import {
  getDashboard,
} from "@/services/dashboardService";

export const useDashboardStore =
  create((set, get) => ({

    summary: null,

    recentTransactions: [],

    categoryAnalytics: [],
    monthlyData: [],
    financialHealth: null,
    loading: false,
    lastFetchedAt: 0,
    fetchDashboard:
      async (options = {}) => {

        const {
          force = false,
        } = options;

        const state = get();
        const isFresh =
          Date.now() - state.lastFetchedAt <
          30_000;

        if (
          state.loading ||
          (!force &&
            state.summary &&
            isFresh)
        ) {

          return;

        }

        try {

          set({
            loading: true,
          });

          const data =
            await getDashboard();

          set({

            summary:
              data.summary,

            recentTransactions:
              data.recentTransactions,

            categoryAnalytics:
              data.categoryAnalytics,
              
              monthlyData:
  data.monthlyData,
  financialHealth:
  data.financialHealth,
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

  }));
