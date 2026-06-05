"use client";

import { create }
from "zustand";

import { persist }
from "zustand/middleware";

import { safeStorage }
from "@/lib/safeStorage";

const getToday = () => {

  return new Date()
    .toISOString()
    .split("T")[0];

};

export const useActivityStore =
  create(

    persist(

      (set, get) => ({

        /*
        ━━━━━━━━━━━━━━━━━━━
        ACTIVITY FEED
        ━━━━━━━━━━━━━━━━━━━
        */
        activities: [],

        /*
        ━━━━━━━━━━━━━━━━━━━
        DAILY STATES
        ━━━━━━━━━━━━━━━━━━━
        */
        checkedIn:
          false,

        readArticles:
          [],

        articlesRead:
          0,

        videosWatched:
          0,

        transactionsAdded:
          0,

        receiptsScanned:
          0,

        challengesCompleted:
          0,

        /*
        ━━━━━━━━━━━━━━━━━━━
        RESET DATE
        ━━━━━━━━━━━━━━━━━━━
        */
        lastResetDate:
          null,

        /*
        ━━━━━━━━━━━━━━━━━━━
        ADD ACTIVITY
        ━━━━━━━━━━━━━━━━━━━
        */
        addActivity:
          (activity) =>

            set((state) => ({

              activities: [

                {

                  id:
                    crypto.randomUUID(),

                  createdAt:
                    new Date()
                      .toISOString(),

                  ...activity,

                },

                ...state.activities,

              ].slice(0, 300),

            })),

        /*
        ━━━━━━━━━━━━━━━━━━━
        DELETE ACTIVITY
        ━━━━━━━━━━━━━━━━━━━
        */
        deleteActivity:
          (id) =>

            set((state) => ({

              activities:

                state.activities.filter(
                  (item) =>
                    item.id !== id
                ),

            })),

        /*
        ━━━━━━━━━━━━━━━━━━━
        CLEAR ACTIVITIES
        ━━━━━━━━━━━━━━━━━━━
        */
        clearActivities:
          () =>

            set({

              activities: [],

            }),

        /*
        ━━━━━━━━━━━━━━━━━━━
        GET TODAY
        ━━━━━━━━━━━━━━━━━━━
        */
        getTodayActivities:
          () => {

            const today =
              new Date()
                .toDateString();

            return get()
              .activities.filter(
                (item) =>

                  new Date(
                    item.createdAt
                  ).toDateString() ===
                  today
              );

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        CHECK-IN
        ━━━━━━━━━━━━━━━━━━━
        */
        completeCheckin:
          () => {

            set({

              checkedIn:
                true,

            });

            get().addActivity({

              type:
                "checkin",

              title:
                "Daily Check-in",

              description:
                "Berhasil check-in hari ini",

              xp: 10,

            });

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        ARTICLE
        ━━━━━━━━━━━━━━━━━━━
        */
        markArticleAsRead:
          (articleId) => {

            const current =
              get()
                .readArticles;

            /*
            ALREADY READ
            */
            if (
              current.includes(
                articleId
              )
            ) {
              return;
            }

            set({

              readArticles: [

                ...current,

                articleId,

              ],

              articlesRead:

                get()
                  .articlesRead + 1,

            });

            get().addActivity({

              type:
                "article",

              title:
                "Membaca artikel",

              description:
                `Artikel ${articleId} selesai dibaca`,

              xp: 15,

            });

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        VIDEO
        ━━━━━━━━━━━━━━━━━━━
        */
        watchVideo:
          (title = "") => {

            set(
              (state) => ({

                videosWatched:

                  state.videosWatched + 1,

              })
            );

            get().addActivity({

              type:
                "video",

              title:
                "Menonton video",

              description:
                title ||

                "Video edukasi selesai ditonton",

              xp: 20,

            });

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        TRANSACTION
        ━━━━━━━━━━━━━━━━━━━
        */
        addTransactionActivity:
          (transaction) => {

            set(
              (state) => ({

                transactionsAdded:

                  state.transactionsAdded + 1,

              })
            );

            get().addActivity({

              type:
                "transaction",

              title:
                "Menambah transaksi",

              description:
                `${transaction.title} - Rp ${transaction.amount.toLocaleString("id-ID")}`,

              transactionType:
                transaction.type,

              xp: 10,

            });

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        RECEIPT
        ━━━━━━━━━━━━━━━━━━━
        */
        addReceiptScan:
          () => {

            set(
              (state) => ({

                receiptsScanned:

                  state.receiptsScanned + 1,

              })
            );

            get().addActivity({

              type:
                "scan",

              title:
                "Scan receipt",

              description:
                "AI OCR berhasil scan receipt",

              xp: 15,

            });

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        CHALLENGE
        ━━━━━━━━━━━━━━━━━━━
        */
        completeChallengeActivity:
          (challengeName) => {

            set(
              (state) => ({

                challengesCompleted:

                  state.challengesCompleted + 1,

              })
            );

            get().addActivity({

              type:
                "challenge",

              title:
                "Challenge selesai",

              description:
                challengeName ||

                "Challenge berhasil diselesaikan",

              xp: 50,

            });

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        RESET DAILY
        ━━━━━━━━━━━━━━━━━━━
        */
        resetDailyActivities:
          () => {

            const today =
              getToday();

            /*
            NEW DAY
            */
            if (

              get()
                .lastResetDate !==
              today

            ) {

              set({

                checkedIn:
                  false,

                readArticles:
                  [],

                articlesRead:
                  0,

                videosWatched:
                  0,

                transactionsAdded:
                  0,

                receiptsScanned:
                  0,

                challengesCompleted:
                  0,

                lastResetDate:
                  today,

              });
              

            }

          },

      }),

      {
        name:
          "activity-storage",
        storage:
          safeStorage,
      }

    )

  );