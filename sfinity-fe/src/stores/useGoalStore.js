"use client";

import { create }
from "zustand";

import {

  getGoals,

  createGoal,

  addGoalProgress,

  deleteGoal,

  updateGoal,

} from "@/services/goalService";

export const useGoalStore =
  create((set, get) => ({

    goals: [],

    loading: false,

    fetchGoals:
      async () => {

        try {

          set({
            loading: true,
          });

          const data =
            await getGoals();

          set({

            goals:
              data.goals || [],

          });

        } finally {

          set({
            loading: false,
          });

        }

      },

    addGoal:
      async (payload) => {

        await createGoal(
          payload
        );

        await get()
          .fetchGoals();

      },

    addProgress:
      async (
        id,
        amount
      ) => {

        await addGoalProgress(

          id,

          amount

        );

        await get()
          .fetchGoals();

      },

    removeGoal:
      async (id) => {

        await deleteGoal(
          id
        );

        await get()
          .fetchGoals();

      },

      editGoal:
  async (
    id,
    payload
  ) => {

    await updateGoal(

      id,

      payload

    );

    await get()
      .fetchGoals();

  },

  }));