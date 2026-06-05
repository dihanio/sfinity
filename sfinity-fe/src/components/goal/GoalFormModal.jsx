"use client";

import {
  useState,
} from "react";

import {
  toast,
} from "sonner";

import {
  useGoalStore,
} from "@/stores/useGoalStore";

export default function GoalFormModal({

  mode = "create",

  goal = null,

  onClose,

}) {

  const {
    addGoal,
    editGoal,
  } =
    useGoalStore();

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    title,
    setTitle,
  ] =
    useState(
      goal?.title || ""
    );

  const [
    targetAmount,
    setTargetAmount,
  ] =
    useState(
      goal?.targetAmount || ""
    );

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !title.trim()
      ) {

        toast.error(
          "Nama goal wajib diisi"
        );

        return;

      }

      if (
        Number(
          targetAmount
        ) <= 0
      ) {

        toast.error(
          "Target harus lebih dari 0"
        );

        return;

      }

      try {

        setLoading(
          true
        );

        const payload = {

          title,

          targetAmount:
            Number(
              targetAmount
            ),

        };

        if (
          mode === "create"
        ) {

          await addGoal(
            payload
          );

          toast.success(
            "Goal berhasil dibuat"
          );

        } else {

          await editGoal(

            goal._id,

            payload

          );

          toast.success(
            "Goal berhasil diperbarui"
          );

        }

        onClose();

      } catch {

        toast.error(
          "Terjadi kesalahan"
        );

      } finally {

        setLoading(
          false
        );

      }

    };

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
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-6
        "
      >

        <h2
          className="
            text-2xl
            font-black
          "
        >

          {
            mode === "create"

              ? "Tambah Goal"

              : "Edit Goal"
          }

        </h2>

        <form
          onSubmit={
            handleSubmit
          }
          className="
            mt-5
            space-y-4
          "
        >

          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            placeholder="Nama Goal"
            className="
              w-full
              rounded-xl
              border
              p-3
            "
          />

          <input
            type="number"
            value={targetAmount}
            onChange={(e) =>
              setTargetAmount(
                e.target.value
              )
            }
            placeholder="Target Nominal"
            className="
              w-full
              rounded-xl
              border
              p-3
            "
          />

          <div
            className="
              flex
              justify-end
              gap-2
            "
          >

            <button
              type="button"
              onClick={
                onClose
              }
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={
                loading
              }
              className="
                rounded-xl
                bg-slate-900
                px-4
                py-2
                text-white
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

    </div>

  );

}