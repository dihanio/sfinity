"use client";

import {
  useState,
} from "react";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  useGoalStore,
} from "@/stores/useGoalStore";

import {
  formatRupiah,
} from "@/lib/formatRupiah";

import GoalFormModal
from "./GoalFormModal";

import ProgressModal
from "./ProgressModal";

export default function GoalCard({
  goal,
}) {

  const {
    removeGoal,
  } =
    useGoalStore();

  const [
    openEdit,
    setOpenEdit,
  ] =
    useState(false);

  const [
    openProgress,
    setOpenProgress,
  ] =
    useState(false);

  const handleDelete =
    async () => {

      const confirmDelete =
        window.confirm(
          "Hapus goal ini?"
        );

      if (
        !confirmDelete
      ) return;

      try {

        await removeGoal(
          goal._id
        );

        toast.success(
          "Goal berhasil dihapus"
        );

      } catch {

        toast.error(
          "Gagal menghapus goal"
        );

      }

    };

  return (

    <>

      <div
        className="
          rounded-[28px]
          border
          border-slate-200
          bg-white
          p-6
        "
      >

        <h2
          className="
            text-xl
            font-black
          "
        >
          🎯 {goal.title}
        </h2>

        <div
          className="
            mt-4
            h-3
            overflow-hidden
            rounded-full
            bg-slate-200
          "
        >

          <div
            style={{
              width:
                `${goal.progress}%`,
            }}
            className="
              h-full
              bg-emerald-500
            "
          />

        </div>

        <p
          className="
            mt-3
            font-semibold
          "
        >

          {
            formatRupiah(
              goal.currentAmount
            )
          }

          {" / "}

          {
            formatRupiah(
              goal.targetAmount
            )
          }

        </p>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          {goal.progress}%
        </p>

        <div
          className="
            mt-5
            flex
            gap-2
          "
        >

          <button
            onClick={() =>
              setOpenProgress(
                true
              )
            }
            className="
              rounded-xl
              bg-emerald-500
              px-4
              py-2
              text-white
            "
          >
            Tambah
          </button>

          <button
            onClick={() =>
              setOpenEdit(
                true
              )
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-blue-500
              px-4
              py-2
              text-white
            "
          >

            <Pencil
              size={16}
            />

            Edit

          </button>

          <button
            onClick={
              handleDelete
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-red-500
              px-4
              py-2
              text-white
            "
          >

            <Trash2
              size={16}
            />

            Hapus

          </button>

        </div>

      </div>

      {
        openEdit && (

          <GoalFormModal
            mode="edit"
            goal={goal}
            onClose={() =>
              setOpenEdit(
                false
              )
            }
          />

        )
      }

      {
        openProgress && (

          <ProgressModal
            goal={goal}
            onClose={() =>
              setOpenProgress(
                false
              )
            }
          />

        )
      }

    </>

  );

}