"use client";

import {
  motion,
} from "framer-motion";

import {
  Wallet,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  formatRupiah,
} from "@/lib/formatRupiah";

export default function BudgetCard({
  budget,
  onEdit,
  onDelete,
}) {

  /*
  CATEGORY
  */
  const categoryName =

    budget.category?.name ||

    "Unknown";


  /*
  STATUS
  */
  const isDanger =
    budget.status ===
    "danger";

  const isWarning =
    budget.status ===
    "warning";

  /*
  STATUS CONFIG
  */
  const statusConfig =
    isDanger

      ? {

          bg:
            "bg-red-100",

          text:
            "text-red-600",

          bar:
            "bg-red-500",

          icon:
            <AlertTriangle
              size={16}
            />,

          label:
            "Melebihi Budget",

        }

      : isWarning

      ? {

          bg:
            "bg-yellow-100",

          text:
            "text-yellow-600",

          bar:
            "bg-yellow-500",

          icon:
            <TrendingUp
              size={16}
            />,

          label:
            "Hampir Habis",

        }

      : {

          bg:
            "bg-emerald-100",

          text:
            "text-emerald-600",

          bar:
            "bg-emerald-500",

          icon:
            <ShieldCheck
              size={16}
            />,

          label:
            "Aman",

        };

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 15,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.3,
      }}

      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* BG BLUR */}
      <div
        className={`
          absolute
          right-0
          top-0
          h-32
          w-32
          rounded-full
          blur-3xl

          ${
            isDanger
              ? "bg-red-100/60"

              : isWarning
              ? "bg-yellow-100/60"

              : "bg-emerald-100/60"
          }
        `}
      />

      {/* HEADER */}
      <div
        className="
          relative
          flex
          items-start
          justify-between
          gap-4
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

          {/* INFO */}
          <div>

            <h2
              className="
                text-xl
                font-black
                text-slate-900
              "
            >
              {categoryName}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              {
                budget.transactionCount
              } transaksi
            </p>

          </div>

        </div>

        {/* BADGE */}
        <div
          className={`
            inline-flex
            items-center
            gap-2
            rounded-2xl
            px-4
            py-2
            text-sm
            font-bold

            ${statusConfig.bg}
            ${statusConfig.text}
          `}
        >

          {statusConfig.icon}

          {budget.percentage}%

        </div>

      </div>

      {/* CONTENT */}
      <div className="relative mt-6">

        {/* SPENT */}
        <div
          className="
            flex
            items-center
            justify-between
            text-sm
          "
        >

          <p className="text-slate-500">
            Terpakai
          </p>

          <p
            className="
              font-bold
              text-slate-700
            "
          >
            {formatRupiah(
              budget.spent
            )}
          </p>

        </div>

        {/* LIMIT */}
        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            text-sm
          "
        >

          <p className="text-slate-500">
            Limit Budget
          </p>

          <p
            className="
              font-bold
              text-slate-700
            "
          >
            {formatRupiah(
              budget.limit
            )}
          </p>

        </div>

        {/* REMAINING */}
        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            text-sm
          "
        >

          <p className="text-slate-500">
            Sisa Budget
          </p>

          <p
            className={`
              font-bold

              ${
                budget.remaining < 0

                  ? "text-red-500"

                  : "text-emerald-600"
              }
            `}
          >
            {formatRupiah(
              budget.remaining
            )}
          </p>

        </div>

        {/* BAR */}
        <div
          className="
            mt-6
            h-3
            overflow-hidden
            rounded-full
            bg-slate-100
          "
        >

          <motion.div

            initial={{
              width: 0,
            }}

            animate={{
              width:
                `${budget.percentage}%`,
            }}

            transition={{
              duration: 0.8,
            }}

            className={`
              h-full
              rounded-full

              ${statusConfig.bar}
            `}
          />

        </div>

        {/* FOOTER */}
        <div
          className="
            mt-4
            flex
            items-center
            justify-between
          "
        >

          <p
            className={`
              text-sm
              font-semibold

              ${statusConfig.text}
            `}
          >
            {statusConfig.label}
          </p>

          <div
  className="
    flex
    items-center
    gap-3
  "
>

  <button
    onClick={onEdit}
    className="
      rounded-xl
      p-2
      text-blue-600
      transition
      hover:bg-blue-50
      hover:text-blue-600
    "
  >
    Edit
  </button>

  <button
    onClick={onDelete}
    className="
      rounded-xl
      p-2
      text-red-600
      transition
      hover:bg-red-50
      hover:text-red-600
    "
  >
   Hapus
  </button>

</div>

        </div>

      </div>

    </motion.div>

  );

}