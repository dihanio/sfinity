"use client";

import {
  ArrowDown,
  ArrowUp,
} from "lucide-react";

import {
  useState,
} from "react";

import { toast }
from "sonner";

import {
  useTransactionStore,
} from "@/stores/useTransactionStore";

import {
  formatRupiah,
} from "@/lib/formatRupiah";

import EditTransactionModal
from "./EditTransactionModal";

export default function TransactionCard({
  transaction,
}) {

  /*
  ━━━━━━━━━━━━━━━━━━━
  MODAL
  ━━━━━━━━━━━━━━━━━━━
  */
  const [open, setOpen] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const {

    deleteTransaction,

    setSelectedTransaction,

  } =
    useTransactionStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  TYPE
  ━━━━━━━━━━━━━━━━━━━
  */
  const isIncome =

    transaction.type ===
    "income";

  /*
  ━━━━━━━━━━━━━━━━━━━
  EDIT
  ━━━━━━━━━━━━━━━━━━━
  */
  function handleEdit() {

    setSelectedTransaction(
      transaction
    );

    setOpen(true);

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  DELETE
  ━━━━━━━━━━━━━━━━━━━
  */
  async function handleDelete() {

    try {

      setDeleting(true);

      await deleteTransaction(
        transaction._id
      );

      toast.success(
        "Transaksi berhasil dihapus"
      );

    } catch (error) {

      toast.error(
        "Gagal menghapus transaksi"
      );

      console.log(error);

    } finally {

      setDeleting(false);

    }

  }

  return (

    <>

      <div
        className="
          group
          rounded-[28px]
          border
          border-slate-200
          bg-white
          p-5
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-lg
        "
      >

        <div
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          {/* LEFT */}
          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            {/* ICON */}
            <div
              className={`
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                sm:h-14
                sm:w-14
                ${
                  isIncome

                    ? "bg-emerald-100"

                    : "bg-red-100"
                }
              `}
            >

              {
                isIncome ? (

                  <ArrowUp
                    className="
                      h-5
                      w-5
                      text-emerald-600
                      sm:h-6
                      sm:w-6
                    "
                  />

                ) : (

                  <ArrowDown
                    className="
                      h-5
                      w-5
                      text-red-600
                      sm:h-6
                      sm:w-6
                    "
                  />

                )
              }

            </div>

            {/* CONTENT */}
            <div className="min-w-0">

              <h3
                className="
                  truncate
                  text-base
                  font-black
                  text-slate-900
                  sm:text-lg
                "
              >
                {transaction.title}
              </h3>

              {/* CATEGORY */}
              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >

                {
                  transaction
                    .category?.name ||

                  transaction
                    .category
                }

              </p>

              {/* DATE */}
              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >

                {
                  new Date(
                    transaction.date
                  ).toLocaleDateString(

                    "id-ID",

                    {

                      day:
                        "numeric",

                      month:
                        "long",

                      year:
                        "numeric",

                    }

                  )
                }

              </p>

            </div>

          </div>

          {/* RIGHT */}
          <div
            className="
              w-full
              text-left
              sm:w-auto
              sm:text-right
            "
          >

            {/* AMOUNT */}
            <h2
              className={`
                text-xl
                font-black
                tracking-tight
                sm:text-2xl
                ${
                  isIncome

                    ? "text-emerald-600"

                    : "text-red-600"
                }
              `}
            >

              {
                isIncome
                  ? "+"
                  : "-"
              }

              {
                formatRupiah(
                  transaction.amount
                )
              }

            </h2>

            {/* ACTION */}
            <div
              className="
                mt-4
                flex
                flex-wrap
                gap-2
                sm:justify-end
              "
            >

              {/* EDIT */}
              <button
                onClick={
                  handleEdit
                }
                className="
                  flex
                  h-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  px-4
                  text-sm
                  font-semibold
                  text-blue-600
                  transition-all
                  hover:scale-105
                "
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                onClick={
                  handleDelete
                }
                disabled={
                  deleting
                }
                className="
                  flex
                  h-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-100
                  px-4
                  text-sm
                  font-semibold
                  text-red-500
                  transition-all
                  hover:scale-105
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {
                  deleting
                    ? "Menghapus..."
                    : "Hapus"
                }
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* MODAL */}
      {open && (

        <EditTransactionModal
          key={
            transaction._id
          }
          open={open}
          setOpen={setOpen}
        />

      )}

    </>

  );

}
