"use client";

import { create }
from "zustand";

import {

  getTransactions,

  createTransaction,

  updateTransaction,

  deleteTransaction,

} from "@/services/transactionService";

import {
  useActivityFeedStore,
} from "@/stores/useActivityFeedStore";

import {
  useDashboardStore,
} from "@/stores/useDashboardStore";

export const useTransactionStore =
  create((set, get) => ({

    /*
    ━━━━━━━━━━━━━━━━━━━
    STATE
    ━━━━━━━━━━━━━━━━━━━
    */
    transactions: [],

    selectedTransaction:
      null,

    loading: false,
    lastFetchedAt: 0,

    search: "",

    filterType: "all",

    /*
    ━━━━━━━━━━━━━━━━━━━
    FETCH
    ━━━━━━━━━━━━━━━━━━━
    */
    fetchTransactions:
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
            state.transactions.length > 0 &&
            isFresh)
        ) {

          return;

        }

        try {

          set({
            loading: true,
          });

          const transactions =
            await getTransactions();

          set({
            transactions,
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

    /*
    ━━━━━━━━━━━━━━━━━━━
    CREATE
    ━━━━━━━━━━━━━━━━━━━
    */
    addTransaction:
      async (payload) => {

        try {

          const transaction =
            await createTransaction(
              payload
            );

          /*
          ━━━━━━━━━━━━━━━━━━━
          UPDATE LOCAL
          ━━━━━━━━━━━━━━━━━━━
          */
          set({

            transactions: [

              transaction,

              ...get()
                .transactions,

            ],
            lastFetchedAt:
              Date.now(),

          });

          /*
          ━━━━━━━━━━━━━━━━━━━
          REFRESH ACTIVITY
          ━━━━━━━━━━━━━━━━━━━
          */
          await useActivityFeedStore
            .getState()
            .fetchActivities();

          useDashboardStore
            .getState()
            .fetchDashboard({
              force: true,
            });

          return transaction;

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
    editTransaction:
      async (
        id,
        payload
      ) => {

        try {

          const updated =
            await updateTransaction(

              id,

              payload

            );

          set({

            transactions:
              get()
                .transactions
                .map(
                  (item) =>

                    item._id ===
                    id

                      ? updated

                      : item
                ),
            lastFetchedAt:
              Date.now(),

          });

          /*
          ━━━━━━━━━━━━━━━━━━━
          REFRESH ACTIVITY
          ━━━━━━━━━━━━━━━━━━━
          */
          await useActivityFeedStore
            .getState()
            .fetchActivities();

          useDashboardStore
            .getState()
            .fetchDashboard({
              force: true,
            });

          /*
          ━━━━━━━━━━━━━━━━━━━
          REFRESH RECEIPTS (CROSS-STORE)
          ━━━━━━━━━━━━━━━━━━━
          */
          try {
            const { useReceiptStore } = await import("./useReceiptStore");
            useReceiptStore.getState().fetchReceipts();
          } catch (e) {
            console.log(e);
          }

          return updated;

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
    deleteTransaction:
      async (id) => {

        const previousTransactions =
          get().transactions;

        try {

          set({

            transactions:
              previousTransactions
                .filter(
                  (item) =>

                    item._id !==
                    id
                ),
            lastFetchedAt:
              Date.now(),

          });

          await deleteTransaction(
            id
          );

          /*
          ━━━━━━━━━━━━━━━━━━━
          REFRESH ACTIVITY
          ━━━━━━━━━━━━━━━━━━━
          */
          await useActivityFeedStore
            .getState()
            .fetchActivities();

          useDashboardStore
            .getState()
            .fetchDashboard({
              force: true,
            });

          /*
          ━━━━━━━━━━━━━━━━━━━
          REFRESH RECEIPTS (CROSS-STORE)
          ━━━━━━━━━━━━━━━━━━━
          */
          try {
            const { useReceiptStore } = await import("./useReceiptStore");
            useReceiptStore.getState().fetchReceipts();
          } catch (e) {
            console.log(e);
          }

        } catch (error) {

          set({
            transactions:
              previousTransactions,
            lastFetchedAt:
              0,
          });

          console.log(error);

          throw error;

        }

      },

    /*
    ━━━━━━━━━━━━━━━━━━━
    SELECTED
    ━━━━━━━━━━━━━━━━━━━
    */
    setSelectedTransaction:
      (transaction) =>

        set({

          selectedTransaction:
            transaction,

        }),

    /*
    ━━━━━━━━━━━━━━━━━━━
    FILTER
    ━━━━━━━━━━━━━━━━━━━
    */
    setSearch:
      (search) =>
        set({ search }),

    setFilterType:
      (filterType) =>
        set({ filterType }),

    /*
    ━━━━━━━━━━━━━━━━━━━
    FILTERED
    ━━━━━━━━━━━━━━━━━━━
    */
    getFilteredTransactions:
      () => {

        const {

          transactions,

          search,

          filterType,

        } = get();

        return transactions.filter(
          (item) => {

            const matchSearch =

              item.title
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const matchType =

              filterType ===
                "all" ||

              item.type ===
                filterType;

            return (

              matchSearch &&
              matchType

            );

          }
        );

      },

    /*
    ━━━━━━━━━━━━━━━━━━━
    TOTAL INCOME
    ━━━━━━━━━━━━━━━━━━━
    */
    getTotalIncome:
      () => {

        return get()
          .transactions

          .filter(
            (item) =>
              item.type ===
              "income"
          )

          .reduce(
            (acc, item) =>
              acc +
              item.amount,
            0
          );

      },

    /*
    ━━━━━━━━━━━━━━━━━━━
    TOTAL EXPENSE
    ━━━━━━━━━━━━━━━━━━━
    */
    getTotalExpense:
      () => {

        return get()
          .transactions

          .filter(
            (item) =>
              item.type ===
              "expense"
          )

          .reduce(
            (acc, item) =>
              acc +
              item.amount,
            0
          );

      },

    /*
    ━━━━━━━━━━━━━━━━━━━
    BALANCE
    ━━━━━━━━━━━━━━━━━━━
    */
    getBalance:
      () => {

        return (

          get()
            .getTotalIncome()

          -

          get()
            .getTotalExpense()

        );

      },

  }));
