"use client";

import {
  useState,
} from "react";

import {
  useTransactionStore,
} from "@/stores/useTransactionStore";

export default function AddTransactionModal({
  open,
  setOpen,
}) {
  const {
    addTransaction,
  } = useTransactionStore();

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [type, setType] =
    useState("expense");

  const [
    category,
    setCategory,
  ] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    addTransaction({
      title,

      amount: Number(amount),

      type,

      category,

      date:
        new Date()
          .toISOString()
          .split("T")[0],
    });

    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        z-50
        flex
        items-center
        justify-center
        p-5
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-lg
          rounded-[32px]
          bg-white
          p-6
          space-y-5
        "
      >
        <h2 className="text-3xl font-black">
          Tambah Transaksi
        </h2>

        <input
          type="text"
          placeholder="Nama transaksi"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="
            w-full
            h-14
            rounded-2xl
            border
            border-slate-200
            px-5
          "
        />

        <input
          type="number"
          placeholder="Nominal"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          className="
            w-full
            h-14
            rounded-2xl
            border
            border-slate-200
            px-5
          "
        />

        <input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="
            w-full
            h-14
            rounded-2xl
            border
            border-slate-200
            px-5
          "
        />

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value
            )
          }
          className="
            w-full
            h-14
            rounded-2xl
            border
            border-slate-200
            px-5
          "
        >
          <option value="expense">
            Pengeluaran
          </option>

          <option value="income">
            Pemasukan
          </option>
        </select>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() =>
              setOpen(false)
            }
            className="
              flex-1
              h-14
              rounded-2xl
              bg-slate-100
              font-semibold
            "
          >
            Batal
          </button>

          <button
            type="submit"
            className="
              flex-1
              h-14
              rounded-2xl
              bg-blue-100
              text-blue-600
              font-semibold
            "
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}