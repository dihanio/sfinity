"use client";

import { create }
from "zustand";

import {

  getBudgets,

  createBudget,

  updateBudget,

  deleteBudget,

} from "@/services/budgetService";
import {
  useUserStore,
} from "@/stores/useUserStore";

export const useBudgetStore =
  create((set, get) => ({

    /*
    ━━━━━━━━━━━━━━━━━━━
    STATE
    ━━━━━━━━━━━━━━━━━━━
    */
    budgets: [],

    summary: {

      totalBudget: 0,

      totalSpent: 0,

      totalRemaining: 0,

    },

    selectedBudget:
      null,

    loading:
      false,

    /*
    ━━━━━━━━━━━━━━━━━━━
    FETCH
    ━━━━━━━━━━━━━━━━━━━
    */
    fetchBudgets:
      async () => {

        try {

          set({
            loading: true,
          });

          const data =
            await getBudgets();

          set({

            budgets:
              data.budgets || [],

            summary:
              data.summary || {

                totalBudget: 0,

                totalSpent: 0,

                totalRemaining: 0,

              },

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
    CREATE
    ━━━━━━━━━━━━━━━━━━━
    */
    addBudget:
  async (payload) => {

    const budget =
      await createBudget(
        payload
      );

    await get()
      .fetchBudgets();

    await useUserStore
      .getState()
      .fetchProfile();

    return budget;

  },

    /*
    ━━━━━━━━━━━━━━━━━━━
    UPDATE
    ━━━━━━━━━━━━━━━━━━━
    */
    editBudget:
      async (
        id,
        payload
      ) => {

        await updateBudget(

          id,

          payload

        );

        /*
        AUTO REFRESH
        */
        await get()
          .fetchBudgets();

      },

    /*
    ━━━━━━━━━━━━━━━━━━━
    DELETE
    ━━━━━━━━━━━━━━━━━━━
    */
    removeBudget:
  async (id) => {

    await deleteBudget(id);

    await get()
      .fetchBudgets();

    await useUserStore
      .getState()
      .fetchProfile();

  },

    /*
    ━━━━━━━━━━━━━━━━━━━
    SELECT
    ━━━━━━━━━━━━━━━━━━━
    */
    setSelectedBudget:
      (budget) => {

        set({

          selectedBudget:
            budget,

        });

      },

  }));