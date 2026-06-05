"use client";

import {
  useEffect,
  useState,
} from "react";

import { toast }
from "sonner";

import {
  useBudgetStore,
} from "@/stores/useBudgetStore";

import {
  useCategoryStore,
} from "@/stores/useCategoryStore";

function getBudgetForm(selectedBudget) {

  return {

    category:

      selectedBudget
        ?.category?._id ||

      selectedBudget
        ?.category ||

      "",

    limit:
      selectedBudget?.limit || "",

  };

}

export default function EditBudgetModal({
  open,
  setOpen,
}) {

  /*
  ━━━━━━━━━━━━━━━━━━━
  BUDGET STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const {

    budgets,

    selectedBudget,

    editBudget,

  } =
    useBudgetStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  CATEGORY STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const {

    categories,

    fetchCategories,

  } =
    useCategoryStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  STATE
  ━━━━━━━━━━━━━━━━━━━
  */
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState(() =>
      getBudgetForm(
        selectedBudget
      )
    );

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
  FILL FORM
  ━━━━━━━━━━━━━━━━━━━
  */
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

    if (
      Number(form.limit) <= 0
    ) {

      toast.error(
        "Limit budget tidak valid"
      );

      return;

    }

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

          item._id !==
          selectedBudget._id

      );

    if (exists) {

      toast.error(
        "Budget kategori ini sudah ada"
      );

      return;

    }

    try {

      setLoading(true);

      /*
      UPDATE
      */
      await editBudget(

        selectedBudget._id,

        {

          category:
            form.category,

          limit:
            Number(form.limit),

        }

      );

      /*
      SUCCESS
      */
      toast.success(
        "Budget berhasil diupdate"
      );

      /*
      RESET
      */
      resetForm();

      /*
      CLOSE
      */
      setOpen(false);

    } catch (error) {

      toast.error(

        error.message ||

        "Gagal update budget"

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
  if (

    !open ||

    !selectedBudget

  ) {

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
              text-slate-900
            "
          >
            Edit Budget
          </h2>

          <p
            className="
              mt-1
              text-slate-500
            "
          >
            Update anggaranmu
          </p>

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

          <select

            name="category"

            value={
              form.category
            }

            onChange={
              handleChange
            }

            className="
              h-14
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-5
              outline-none
              transition-all
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          >

            <option value="">
              Pilih kategori
            </option>

            {
              expenseCategories.length ===
              0 && (

                <option disabled>
                  Belum ada kategori expense
                </option>

              )
            }

            {
              expenseCategories.map(
                (category) => (

                  <option

                    key={
                      category._id
                    }

                    value={
                      category._id
                    }

                  >

                    {
                      category.name
                    }

                  </option>

                )
              )
            }

          </select>

        </div>

        {/* LIMIT */}
        <div className="space-y-2">

          <label
            className="
              text-sm
              font-semibold
              text-slate-600
            "
          >
            Limit Budget
          </label>

          <input

            type="number"

            name="limit"

            value={
              form.limit
            }

            onChange={
              handleChange
            }

            placeholder="Masukkan limit"

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
              transition-all
              hover:bg-slate-200
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
              transition-all
              hover:bg-blue-700
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

