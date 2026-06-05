"use client";

import {
  ArrowLeft,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  useGoalStore,
} from "@/stores/useGoalStore";

import GoalFormModal
from "./GoalFormModal";

import { useState } from "react";



export default function
GoalHeader() {

  const router =
    useRouter();

  const addGoal =
    useGoalStore(
      (state) =>
        state.addGoal
    );

    const [
  openCreateModal,
  setOpenCreateModal,
] = useState(false);

  const handleCreate =
    async () => {


    };

  return (

    <div
      className="
        flex
        items-center
        justify-between
      "
    >

      {/* LEFT */}
      <div>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <button
            onClick={() =>
              router.back()
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              transition
              hover:bg-slate-50
            "
          >

            <ArrowLeft
              size={18}
            />

          </button>

          <h1
            className="
              text-3xl
              font-black
            "
          >
            Goal Saya
          </h1>

        </div>

        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Kelola target
          tabungan dan
          impian Anda.
        </p>

      </div>

      {/* RIGHT */}
      <button
  onClick={() =>
    setOpenCreateModal(true)
  }
>
  + Goal
</button>
 {
      openCreateModal && (
        <GoalFormModal
          mode="create"
          onClose={() =>
            setOpenCreateModal(false)
          }
        />
      )
    }
    </div>

  );

}