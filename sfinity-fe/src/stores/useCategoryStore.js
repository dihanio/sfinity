"use client";

import { create }
from "zustand";

import {

  getCategories,

  createCategory,

  updateCategory,

  deleteCategory,

} from "@/services/categoryService";

export const useCategoryStore =
  create((set, get) => ({

    /*
    ━━━━━━━━━━━━━━━━━━━
    STATE
    ━━━━━━━━━━━━━━━━━━━
    */
    categories: [],

    loading: false,

    /*
    ━━━━━━━━━━━━━━━━━━━
    FETCH
    ━━━━━━━━━━━━━━━━━━━
    */
    fetchCategories:
      async () => {

        try {

          set({
            loading: true,
          });

          const categories =
            await getCategories();

          set({
            categories,
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
    addCategory:
      async (payload) => {

        try {

          const category =
            await createCategory(
              payload
            );

          set({

            categories: [

              category,

              ...get()
                .categories,

            ],

          });

          return category;

        } catch (error) {

          console.log(error);

          throw error;

        }

      },

    /*
    ━━━━━━━━━━━━━━━━━━━
    UPDATE
    ━━━━━━━━━━━━━━━━━━━
    */
    editCategory:
      async (
        id,
        payload
      ) => {

        try {

          const updated =
            await updateCategory(

              id,

              payload

            );

          set({

            categories:
              get()
                .categories
                .map(
                  (item) =>

                    item._id ===
                    id

                      ? updated

                      : item
                ),

          });

        } catch (error) {

          console.log(error);

          throw error;

        }

      },

    /*
    ━━━━━━━━━━━━━━━━━━━
    DELETE
    ━━━━━━━━━━━━━━━━━━━
    */
    removeCategory:
      async (id) => {

        try {

          await deleteCategory(
            id
          );

          set({

            categories:
              get()
                .categories
                .filter(
                  (item) =>

                    item._id !==
                    id
                ),

          });

        } catch (error) {

          console.log(error);

          throw error;

        }

      },

  }));