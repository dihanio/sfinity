// src/stores/useReceiptStore.js

"use client";

import { create }
from "zustand";

import { persist }
from "zustand/middleware";

import { safeStorage }
from "@/lib/safeStorage";

import {

  getReceipts,

  createReceipt,

  deleteReceipt as deleteReceiptAPI,

  updateReceipt as updateReceiptAPI,

} from "@/services/receiptService";

import {
  useActivityFeedStore,
} from "./useActivityFeedStore";

import {
  useUserStore,
} from "./useUserStore";


export const useReceiptStore =
  create(

    persist(

      (set, get) => ({

        /*
        ━━━━━━━━━━━━━━━━━━━
        STATES
        ━━━━━━━━━━━━━━━━━━━
        */
        image: null,

        result: null,

        scans: [],

        loading: false,

        /*
        ━━━━━━━━━━━━━━━━━━━
        IMAGE
        ━━━━━━━━━━━━━━━━━━━
        */
        setImage:
          (image) =>

            set({
              image,
            }),

        /*
        ━━━━━━━━━━━━━━━━━━━
        LOADING
        ━━━━━━━━━━━━━━━━━━━
        */
        setLoading:
          (loading) =>

            set({
              loading,
            }),

        /*
        ━━━━━━━━━━━━━━━━━━━
        RESULT
        ━━━━━━━━━━━━━━━━━━━
        */
        setResult:
          (receipt) =>

            set({
              result:
                receipt,
            }),

        /*
        ━━━━━━━━━━━━━━━━━━━
        FETCH RECEIPTS
        ━━━━━━━━━━━━━━━━━━━
        */
        fetchReceipts:
          async () => {

            try {

              set({
                loading: true,
              });

              const receipts =
                await getReceipts();

              set({

                scans:
                  receipts,

                loading: false,

              });

            } catch (error) {

              console.log(error);

              set({
                loading: false,
              });

            }

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        ADD SCAN
        ━━━━━━━━━━━━━━━━━━━
        */
        addScan:
          async (
            receipt,
            image
          ) => {
      
            try {

              /*
              ━━━━━━━━━━━━━━━━━━━
              SAVE RECEIPT API
              ━━━━━━━━━━━━━━━━━━━
              */
              const response =
                await createReceipt({

                  merchant:
                    receipt.merchant,

                  total:
                    receipt.total,

                  category:
                    receipt.category,

                  rawText:
                    receipt.rawText,

                  image,

                });
                const newReceipt =
  response.receipt;

  const user =
  response.user;

console.log(
  "UPDATED USER",
  user
);
if (user) {

  useUserStore
    .getState()
    .setUser(
      user
    );


}

              /*
              ━━━━━━━━━━━━━━━━━━━
              FEED
              ━━━━━━━━━━━━━━━━━━━
              */
              useActivityFeedStore
                .getState()
                .addActivity({

                  type:
                    "scan",

                  title:
                    "Receipt berhasil discan",

                  description:
                    `${receipt.merchant} • Rp${receipt.total}`,

                });

              /*
              ━━━━━━━━━━━━━━━━━━━
              SAVE LOCAL STATE
              ━━━━━━━━━━━━━━━━━━━
              */
              set((state) => ({

                scans: [

                  newReceipt,

                  ...state.scans,

                ].slice(0, 20),

              }));

              /*
              ━━━━━━━━━━━━━━━━━━━
              CROSS-STORE REFRESH
              ━━━━━━━━━━━━━━━━━━━
              */
              const { useTransactionStore } =
                await import(
                  "./useTransactionStore"
                );

              useTransactionStore
                .getState()
                .fetchTransactions({
                  force: true,
                });

              const { useDashboardStore } =
                await import(
                  "./useDashboardStore"
                );

              useDashboardStore
                .getState()
                .fetchDashboard({
                  force: true,
                });

              return newReceipt;
              

            } catch (error) {

              console.log(error);

              throw error;

            }

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        RESET
        ━━━━━━━━━━━━━━━━━━━
        */
        resetScan:
          () =>

            set({

              image: null,

              result: null,

            }),

        /*
        ━━━━━━━━━━━━━━━━━━━
        DELETE (API + CROSS-STORE)
        ━━━━━━━━━━━━━━━━━━━
        */
        deleteScan:
          async (id) => {

            /*
            ━━━━━━━━━━━━━━━━━━━
            OPTIMISTIC UPDATE
            ━━━━━━━━━━━━━━━━━━━
            */
            const previous =
              get().scans;

            set((state) => ({

              scans:

                state.scans.filter(
                  (item) =>
                    item._id !== id
                ),

            }));

            try {

              /*
              ━━━━━━━━━━━━━━━━━━━
              API CALL
              ━━━━━━━━━━━━━━━━━━━
              */
              const response =
                await deleteReceiptAPI(
                  id
                );

              /*
              ━━━━━━━━━━━━━━━━━━━
              UPDATE USER (XP)
              ━━━━━━━━━━━━━━━━━━━
              */
              if (response.user) {

                useUserStore
                  .getState()
                  .setUser(
                    response.user
                  );

              }

              /*
              ━━━━━━━━━━━━━━━━━━━
              CROSS-STORE REFRESH
              ━━━━━━━━━━━━━━━━━━━
              */
              const { useTransactionStore } =
                await import(
                  "./useTransactionStore"
                );

              useTransactionStore
                .getState()
                .fetchTransactions({
                  force: true,
                });

              const { useDashboardStore } =
                await import(
                  "./useDashboardStore"
                );

              useDashboardStore
                .getState()
                .fetchDashboard({
                  force: true,
                });

              await useActivityFeedStore
                .getState()
                .fetchActivities();

            } catch (error) {

              /*
              ━━━━━━━━━━━━━━━━━━━
              ROLLBACK
              ━━━━━━━━━━━━━━━━━━━
              */
              set({
                scans: previous,
              });

              console.log(error);

              throw error;

            }

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        UPDATE (API + CROSS-STORE)
        ━━━━━━━━━━━━━━━━━━━
        */
        updateScan:
          async (
            id,
            updated
          ) => {

            const previous =
              get().scans;

            // Optimistic update
            set((state) => ({

              scans:

                state.scans.map(
                  (item) =>

                    item._id === id

                      ? {

                          ...item,

                          ...updated,

                        }

                      : item
                ),

            }));

            try {

              const response =
                await updateReceiptAPI(
                  id,
                  updated
                );

              if (response.user) {

                useUserStore
                  .getState()
                  .setUser(
                    response.user
                  );

              }

              if (response.receipt) {
                set((state) => ({
                  scans: state.scans.map((item) =>
                    item._id === id ? response.receipt : item
                  ),
                }));
              }

              /*
              ━━━━━━━━━━━━━━━━━━━
              CROSS-STORE REFRESH
              ━━━━━━━━━━━━━━━━━━━
              */
              const { useTransactionStore } =
                await import(
                  "./useTransactionStore"
                );

              useTransactionStore
                .getState()
                .fetchTransactions({
                  force: true,
                });

              const { useDashboardStore } =
                await import(
                  "./useDashboardStore"
                );

              useDashboardStore
                .getState()
                .fetchDashboard({
                  force: true,
                });

              await useActivityFeedStore
                .getState()
                .fetchActivities();

            } catch (error) {

              // Rollback
              set({
                scans: previous,
              });

              console.log(error);

              throw error;

            }

          },

        /*
        ━━━━━━━━━━━━━━━━━━━
        CLEAR (API + ALL)
        ━━━━━━━━━━━━━━━━━━━
        */
        clearScans:
          async () => {

            const scans =
              get().scans;

            if (
              scans.length === 0
            ) {
              return;
            }

            /*
            ━━━━━━━━━━━━━━━━━━━
            OPTIMISTIC
            ━━━━━━━━━━━━━━━━━━━
            */
            set({
              scans: [],
            });

            try {

              /*
              ━━━━━━━━━━━━━━━━━━━
              DELETE ALL VIA API
              ━━━━━━━━━━━━━━━━━━━
              */
              await Promise.all(

                scans.map(
                  (item) =>
                    deleteReceiptAPI(
                      item._id
                    ).catch(
                      () => null
                    )
                )

              );

              /*
              ━━━━━━━━━━━━━━━━━━━
              CROSS-STORE REFRESH
              ━━━━━━━━━━━━━━━━━━━
              */
              const { useTransactionStore } =
                await import(
                  "./useTransactionStore"
                );

              useTransactionStore
                .getState()
                .fetchTransactions({
                  force: true,
                });

              const { useDashboardStore } =
                await import(
                  "./useDashboardStore"
                );

              useDashboardStore
                .getState()
                .fetchDashboard({
                  force: true,
                });

            } catch (error) {

              /*
              ━━━━━━━━━━━━━━━━━━━
              ROLLBACK
              ━━━━━━━━━━━━━━━━━━━
              */
              set({
                scans,
              });

              console.log(error);

              throw error;

            }

          },

      }),

      {
        name:
          "receipt-storage",
        storage:
          safeStorage,
      }

    )

  );