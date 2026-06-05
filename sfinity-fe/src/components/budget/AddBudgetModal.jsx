"use client";

import {
  useState,
  useEffect,
} from "react";

import { toast }
from "sonner";

import {
  Wallet,
} from "lucide-react";

import {
  useBudgetStore,
} from "@/stores/useBudgetStore";

import {
  useActivityStore,
} from "@/stores/useActivityStore";

import {
  useCategoryStore,
} from "@/stores/useCategoryStore";

export default function AddBudgetModal({
  open,
  setOpen,
}) {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORES
  ━━━━━━━━━━━━━━━━━━━
  */
  const {

    addBudget,

    budgets,

  } =
    useBudgetStore();

  const {

    categories,

    fetchCategories,

  } =
    useCategoryStore();

  const addActivity =
    useActivityStore(
      (state) =>
        state.addActivity
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  STATE
  ━━━━━━━━━━━━━━━━━━━
  */
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      category: "",

      limit: "",

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
  RESET ON CLOSE
  ━━━━━━━━━━━━━━━━━━━
  */
  useEffect(() => {

    if (!open) {

      resetForm();

    }

  }, [open]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  EXPENSE CATEGORY
  ━━━━━━━━━━━━━━━━━━━
  */
  const expenseCategories =
  categories.filter(

    (item) =>

      item.type ===
      "expense"

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

    }));

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  RESET
  ━━━━━━━━━━━━━━━━━━━
  */
  function resetForm() {

    setForm({

      category: "",

      limit: "",

    });

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

      !form.category ||

      !form.limit

    ) {

      toast.error(
        "Semua field wajib diisi"
      );

      return;

    }

    /*
    LIMIT VALIDATION
    */
    if (
      Number(form.limit) <= 0
    ) {

      toast.error(
        "Limit budget tidak valid"
      );

      return;

    }

    /*
    DATE
    */
    const month =
      new Date()
        .getMonth() + 1;

    const year =
      new Date()
        .getFullYear();

    /*
    DUPLICATE CHECK
    */
    const exists =
      budgets.find(

        (item) =>

          String(

            item.category?._id ||

            item.category

          ) ===
          String(form.category)

          &&

          Number(item.month) ===
          Number(month)

          &&

          Number(item.year) ===
          Number(year)

      );

    if (exists) {

      toast.error(
        "Budget kategori ini sudah ada bulan ini"
      );

      return;

    }

    try {

      setLoading(true);

      /*
      CREATE
      */
      const createdBudget =
        await addBudget({

          category:
            form.category,

          limit:
            Number(form.limit),

          month,

          year,

        });

      /*
      CATEGORY
      */
      const selectedCategory =
        categories.find(

          (item) =>

            item._id ===
            form.category

        );

      /*
      ACTIVITY
      */
      addActivity({

        type:
          "budget",

        title:
          "Budget baru dibuat",

        description:
          `${selectedCategory?.name || "Kategori"} • Rp ${Number(
            form.limit
          ).toLocaleString(
            "id-ID"
          )}`,

        createdAt:
          new Date()
            .toISOString(),

        budgetId:
          createdBudget?._id,

      });

      /*
      SUCCESS
      */
      toast.success(
        "Budget berhasil dibuat"
      );

      /*
      CLOSE
      */
      setOpen(false);

    } catch (error) {

      toast.error(

        error?.response?.data?.message ||

        error?.message ||

        "Gagal membuat budget"

      );

    } finally {

      setLoading(false);

    }

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  CLOSE
  ━━━━━━━━━━━━━━━━━━━
  */
  if (!open) {
    return null;
  }

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

        onSubmit={
          handleSubmit
        }

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
        <div className="space-y-2">

          <div>

            <h2
              className="
                text-3xl
                font-black
                text-slate-800
              "
            >
              Tambah Budget
            </h2>

            <p
              className="
                mt-1
                text-slate-500
              "
            >
              Buat anggaran baru
            </p>

          </div>

        </div>

        {/* CATEGORY */}
        <div className="space-y-2">

          <label className="text-sm font-semibold text-slate-600">
            Kategori
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-5
              outline-none
            "
          >

            <option value="">
              Pilih kategori
            </option>

            {
              expenseCategories.length === 0 && (

                <option disabled>
                  Belum ada kategori
                </option>

              )
            }

            {
              expenseCategories.map(
                (category) => (

                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>

                )
              )
            }

          </select>

        </div>

        {/* LIMIT */}
        <div className="space-y-2">

          <label className="text-sm font-semibold text-slate-600">
            Limit Budget
          </label>

          <input
            type="number"
            name="limit"
            value={form.limit}
            onChange={handleChange}
            placeholder="Contoh: 1000000"
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-slate-200
              px-5
              outline-none
            "
          />

        </div>

        {/* BUTTON */}
        <div className="flex gap-4 pt-2">

          <button
            type="button"
            onClick={() => {

              resetForm();

              setOpen(false);

            }}
            className="
              h-14
              flex-1
              rounded-2xl
              bg-slate-100
              font-semibold
              text-slate-700
            "
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              h-14
              flex-1
              rounded-2xl
              bg-blue-100
              font-semibold
              text-blue-600
              disabled:opacity-50
            "
          >

            {
              loading
                ? "Menyimpan..."
                : "Simpan"
            }

          </button>

        </div>

      </form>

    </div>

  );

}