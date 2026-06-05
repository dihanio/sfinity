"use client";

import { create }
from "zustand";

import { persist }
from "zustand/middleware";

import { safeStorage }
from "@/lib/safeStorage";

import {
  getDynamicArticles,
} from "@/lib/articleEngine";

const getToday = () => {

  return new Date()
    .toISOString()
    .split("T")[0];

};

export const useArticleStore =

  create(

    persist(

      (set, get) => ({

        /*
        ━━━━━━━━━━━━━━━━━━━
        STATE
        ━━━━━━━━━━━━━━━━━━━
        */
        articles: [],

        generatedDate:
          null,

        /*
        ━━━━━━━━━━━━━━━━━━━
        GENERATE ARTICLES
        ━━━━━━━━━━━━━━━━━━━
        */
        generateArticles:
          (
            financialHealth
          ) => {

            const today =
              getToday();

            /*
            ALREADY GENERATED
            */
            if (

              get()
                .generatedDate ===
              today &&

              get()
                .articles
                .length > 0

            ) {

              return;

            }

            /*
            SCORE
            */
            const score =
              financialHealth
                ?.score || 0;

            /*
            GENERATE
            */
            const generated =

              getDynamicArticles(
                score
              );

            /*
            SAVE
            */
            set({

              articles:
                generated,

              generatedDate:
                today,

            });

          },

      }),

      {
        name:
          "article-storage",
        storage:
          safeStorage,
      }

    )

  );