"use client";

import {
  useState,
  useEffect,
} from "react";

import { toast }
from "sonner";

import {
  useTransactionStore,
} from "@/stores/useTransactionStore";

import {
  useCategoryStore,
} from "@/stores/useCategoryStore";

export default function AddTransactionModal({
  open,
  setOpen,
}) {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORES
  ━━━━━━━━━━━━━━━━━━━
  */
  const {

    addTransaction,

  } =
    useTransactionStore();

  const {

    categories,

    fetchCategories,

  } =
    useCategoryStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  FORM
  ━━━━━━━━━━━━━━━━━━━
  */
  const [form, setForm] =
    useState({

      title: "",

      amount: "",

      type: "expense",

      category: "",

    });

  /*
  ━━━━━━━━━━━━━━━━━━━
  FETCH CATEGORY
  ━━━━━━━━━━━━━━━━━━━
  */
  useEffect(() => {

    fetchCategories();

  }, [fetchCategories]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  FILTER CATEGORY
  ━━━━━━━━━━━━━━━━━━━
  */
  const filteredCategories =
    categories.filter(

      (item) =>

        item.type ===
        form.type

    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  CHANGE
  ━━━━━━━━━━━━━━━━━━━
  */
  function handleChange(e) {

    const {

      name,

      value,

    } = e.target;

    setForm((prev) => ({

      ...prev,

      [name]: value,

      /*
      RESET CATEGORY
      */
      ...(name === "type" && {

        category: "",

      }),

    }));

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  SUBMIT
  ━━━━━━━━━━━━━━━━━━━
  */
  async function handleSubmit(e) {

    e.preventDefault();

    /*
    VALIDATION
    */
    if (

      !form.title ||

      !form.amount ||

      !form.category

    ) {

      toast.error(
        "Semua field wajib diisi"
      );

      return;

    }

    if (
      Number(form.amount) <= 0
    ) {

      toast.error(
        "Nominal tidak valid"
      );

      return;

    }

    try {

      /*
      ADD TRANSACTION
      */
      await addTransaction({

        title:
          form.title.trim(),

        amount:
          Number(form.amount),

        type:
          form.type,

        category:
          form.category,

        date:
          new Date()
            .toISOString()
            .split("T")[0],

      });

      /*
      SUCCESS
      */
      toast.success(

        "Transaksi berhasil ditambahkan",

        {

          description:
            "Data transaksi berhasil disimpan.",

        }

      );

      /*
      RESET FORM
      */
      setForm({

        title: "",

        amount: "",

        type: "expense",

        category: "",

      });

      /*
      CLOSE MODAL
      */
      setOpen(false);

    } catch (error) {

      toast.error(

        error.message ||

        "Gagal menambahkan transaksi"

      );

    }

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  CLOSE
  ━━━━━━━━━━━━━━━━━━━
  */
  if (!open)
    return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-5
        backdrop-blur-sm
      "
    >

      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-lg
          space-y-5
          rounded-[32px]
          border
          border-white/20
          bg-white
          p-6
          shadow-2xl
        "
      >

        {/* HEADER */}
        <div>

          <h2
            className="
              text-3xl
              font-black
              text-slate-800
            "
          >
            Tambah Transaksi
          </h2>

          <p
            className="
              mt-1
              text-slate-500
            "
          >
            Catat pemasukan dan
            pengeluaranmu
          </p>

        </div>

        {/* TITLE */}
        <div className="space-y-2">

          <label
            className="
              text-sm
              font-semibold
              text-slate-600
            "
          >
            Nama Transaksi
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nama transaksi"
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-slate-200
              px-5
              outline-none
              transition-all
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />

        </div>

        {/* AMOUNT */}
        <div className="space-y-2">

          <label
            className="
              text-sm
              font-semibold
              text-slate-600
            "
          >
            Nominal
          </label>

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Nominal"
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-slate-200
              px-5
              outline-none
              transition-all
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />

        </div>

        {/* TYPE */}
        <div className="space-y-2">

          <label
            className="
              text-sm
              font-semibold
              text-slate-600
            "
          >
            Jenis Transaksi
          </label>

          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              transition-all
              focus-within:border-blue-500
              focus-within:ring-4
              focus-within:ring-blue-100
            "
          >

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="
                h-14
                w-full
                appearance-none
                bg-transparent
                px-5
                pr-12
                font-semibold
                text-slate-700
                outline-none
              "
            >

              <option value="expense">
                Pengeluaran
              </option>

              <option value="income">
                Pemasukan
              </option>

            </select>

            {/* ARROW */}
            <div
              className="
                pointer-events-none
                absolute
                right-5
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />

              </svg>

            </div>

          </div>

        </div>

        {/* CATEGORY */}
        <div className="space-y-2">

          <label
            className="
              text-sm
              font-semibold
              text-slate-600
            "
          >
            Kategori
          </label>

          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              transition-all
              duration-200
              focus-within:border-blue-500
              focus-within:bg-white
              focus-within:ring-4
              focus-within:ring-blue-100
              hover:border-blue-300
            "
          >

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="
                h-14
                w-full
                appearance-none
                bg-transparent
                px-5
                pr-14
                text-sm
                font-semibold
                text-slate-700
                outline-none
              "
            >

              <option value="">
                Pilih kategori
              </option>

              {
                filteredCategories.length ===
                0 && (

                  <option disabled>
                    Belum ada kategori
                  </option>

                )
              }

              {
                filteredCategories.map(
                  (item) => (

                    <option
                      key={item._id}
                      value={item._id}
                    >
                      {item.name}
                    </option>

                  )
                )
              }

            </select>

            {/* ARROW */}
            <div
              className="
                pointer-events-none
                absolute
                right-5
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />

              </svg>

            </div>

          </div>

        </div>

        {/* BUTTON */}
        <div className="flex gap-4 pt-2">

          <button
            type="button"
            onClick={() =>
              setOpen(false)
            }
            className="
              h-14
              flex-1
              rounded-2xl
              bg-slate-100
              font-semibold
              text-slate-700
              transition-all
              hover:bg-slate-200
            "
          >
            Batal
          </button>

          <button
            type="submit"
            className="
              h-14
              flex-1
              rounded-2xl
              bg-blue-100
              font-semibold
              text-blue-600
              transition-all
              hover:bg-blue-700
            "
          >
            Simpan
          </button>

        </div>

      </form>

    </div>

  );

}

