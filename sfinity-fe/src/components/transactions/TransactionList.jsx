"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  useTransactionStore,
} from "@/stores/useTransactionStore";

import TransactionCard
from "./TransactionCard";

import EmptyTransaction
from "./EmptyTransaction";

export default function TransactionList() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const {
    getFilteredTransactions,
  } =
    useTransactionStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  DATA
  ━━━━━━━━━━━━━━━━━━━
  */
  const transactions =
    getFilteredTransactions();

  /*
  ━━━━━━━━━━━━━━━━━━━
  PAGINATION
  ━━━━━━━━━━━━━━━━━━━
  */
  const [
    currentPage,
    setCurrentPage,
  ] =
    useState(1);

  const ITEMS_PER_PAGE =
    5;

  const totalPages =
    Math.ceil(
      transactions.length /
      ITEMS_PER_PAGE
    );

  const paginatedTransactions =
    useMemo(() => {

      const start =
        (
          currentPage - 1
        ) *
        ITEMS_PER_PAGE;

      const end =
        start +
        ITEMS_PER_PAGE;

      return transactions.slice(
        start,
        end
      );

    }, [

      transactions,

      currentPage,

    ]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  EMPTY
  ━━━━━━━━━━━━━━━━━━━
  */
  if (
    transactions.length === 0
  ) {

    return (
      <EmptyTransaction />
    );

  }

  return (

    <div className="space-y-5">

      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          gap-2
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-black
              text-slate-900
            "
          >
            Transaction List
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >

            Showing{" "}

            {
              (
                currentPage - 1
              ) *
              ITEMS_PER_PAGE + 1
            }

            {" - "}

            {
              Math.min(

                currentPage *
                ITEMS_PER_PAGE,

                transactions.length

              )
            }

            {" of "}

            {
              transactions.length
            }

            {" transactions"}

          </p>

        </div>

      </div>

      {/* LIST */}
      <div
        className="
          space-y-5
        "
      >

        {
          paginatedTransactions.map(

            (
              transaction,
              index
            ) => (

              <div

                key={
                  transaction._id
                }

                className="
                  animate-in
                  fade-in
                  slide-in-from-bottom-4
                  duration-300
                "

                style={{

                  animationDelay:
                    `${index * 40}ms`,

                }}

              >

                <TransactionCard
                  transaction={
                    transaction
                  }
                />

              </div>

            )

          )
        }

      </div>

      {/* PAGINATION */}
      {
        totalPages > 1 && (

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
              pt-4
            "
          >

            {/* PREV */}
            <button

              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    prev - 1
                )
              }

              disabled={
                currentPage === 1
              }

              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              ← Prev

            </button>

            {/* PAGE NUMBERS */}
            {
              Array.from({

                length:
                  totalPages,

              }).map(

                (_, index) => {

                  const page =
                    index + 1;

                  return (

                    <button

                      key={page}

                      onClick={() =>
                        setCurrentPage(
                          page
                        )
                      }

                      className={`

                        h-10
                        w-10
                        rounded-xl
                        text-sm
                        font-bold
                        transition

                        ${
                          currentPage ===
                          page

                            ? `
                              bg-slate-900
                              text-white
                            `

                            : `
                              border
                              border-slate-200
                              bg-white
                              hover:bg-slate-50
                            `
                        }

                      `}
                    >

                      {page}

                    </button>

                  );

                }

              )
            }

            {/* NEXT */}
            <button

              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    prev + 1
                )
              }

              disabled={
                currentPage ===
                totalPages
              }

              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              Next →

            </button>

          </div>

        )
      }

    </div>

  );

}