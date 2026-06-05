"use client";

import {
  useMemo, useState,
} from "react";

import {
  useBudgetStore,
} from "@/stores/useBudgetStore";

import BudgetCard
from "./BudgetCard";

import EditBudgetModal
from "./EditBudgetModal";

export default function BudgetList() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const {
    budgets,
    selectedBudget,
    removeBudget,
    setSelectedBudget,
  } = useBudgetStore();

  const [openEditModal,
  setOpenEditModal] =
  useState(false);
  /*
  ━━━━━━━━━━━━━━━━━━━
  DELETE
  ━━━━━━━━━━━━━━━━━━━
  */
  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Hapus budget ini?"
        )
      ) return;

      await removeBudget(id);

    };

  /*
  ━━━━━━━━━━━━━━━━━━━
  EDIT
  ━━━━━━━━━━━━━━━━━━━
  */
const handleEdit =
  (budget) => {

    setSelectedBudget(
      budget
    );

    setOpenEditModal(
      true
    );

  };


  const sortedBudgets =
    useMemo(() => {

      return [...budgets].sort(

        (a, b) =>

          b.percentage -
          a.percentage

      );

    }, [budgets]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  EMPTY STATE
  ━━━━━━━━━━━━━━━━━━━
  */
  if (
    sortedBudgets.length === 0
  ) {

    return (

      <div
        className="
          rounded-[28px]
          border
          border-dashed
          border-slate-300
          bg-white
          p-10
          text-center
        "
      >

        <h2
          className="
            text-xl
            font-black
            text-slate-800
          "
        >
          Belum Ada Budget
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          Tambahkan budget
          pertama kamu untuk
          mulai tracking
          pengeluaran.
        </p>

      </div>

    );

  }

 return (

  <>

    <div
      className="
        grid
        gap-5
        md:grid-cols-2
      "
    >

      {
        sortedBudgets.map(
          (budget) => (

            <BudgetCard
              key={budget._id}
              budget={budget}
              onEdit={() =>
                handleEdit(
                  budget
                )
              }
              onDelete={() =>
                handleDelete(
                  budget._id
                )
              }
            />

          )
        )
      }

    </div>

    {openEditModal && (

      <EditBudgetModal
        key={
          selectedBudget?._id ||
          "edit-budget"
        }
        open={openEditModal}
        setOpen={setOpenEditModal}
      />

    )}

  </>

);

}
