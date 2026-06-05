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

import {
  formatRupiah,
} from "@/lib/formatRupiah";

export default function ProgressModal({

  goal,

  onClose,

}) {

  const {
    addProgress,
  } =
    useGoalStore();

  const [
    amount,
    setAmount,
  ] =
    useState("");

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        Number(
          amount
        ) <= 0
      ) {

        toast.error(
          "Nominal harus lebih dari 0"
        );

        return;

      }

      try {

        setLoading(
          true
        );

        await addProgress(

          goal._id,

          Number(
            amount
          )

        );

        toast.success(
          "Progress berhasil ditambahkan"
        );

        onClose();

      } catch {

        toast.error(
          "Gagal menambah progress"
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
          Tambah Tabungan
        </h2>

        <div
          className="
            mt-4
            rounded-2xl
            bg-slate-50
            p-4
          "
        >

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            {goal.title}
          </p>

          <p
            className="
              mt-2
              font-bold
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

        </div>

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
                bg-emerald-500
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