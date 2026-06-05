"use client";

import {

  Receipt,

  Trophy,

  Sparkles,

  ArrowDownRight,

  Flame,

  Target,

  Wallet,

} from "lucide-react";

/*
━━━━━━━━━━━━━━━━━━━
ICON MAP
━━━━━━━━━━━━━━━━━━━
*/
const iconMap = {

  scan:
    Receipt,

  xp:
    Sparkles,

  level:
    Trophy,

  transaction:
    ArrowDownRight,

  streak:
    Flame,

  mission:
    Target,

  budget:
    Wallet,

  "budget-complete":
    Trophy,

};

/*
━━━━━━━━━━━━━━━━━━━
COLOR MAP
━━━━━━━━━━━━━━━━━━━
*/
const colorMap = {

  scan:
    "bg-blue-100 text-blue-600",

  xp:
    "bg-violet-100 text-violet-600",

  level:
    "bg-yellow-100 text-yellow-600",

  transaction:
    "bg-emerald-100 text-emerald-600",

  streak:
    "bg-orange-100 text-orange-600",

  mission:
    "bg-pink-100 text-pink-600",

  budget:
    "bg-cyan-100 text-cyan-600",

  "budget-complete":
    "bg-green-100 text-green-600",

};

export default function ActivityCard({

  item,

}) {

  /*
  ━━━━━━━━━━━━━━━━━━━
  ICON
  ━━━━━━━━━━━━━━━━━━━
  */
  const Icon =

    iconMap[item?.type] ||

    Sparkles;

  /*
  ━━━━━━━━━━━━━━━━━━━
  COLOR
  ━━━━━━━━━━━━━━━━━━━
  */
  const iconColor =

    colorMap[item?.type] ||

    "bg-slate-100 text-slate-600";

  /*
  ━━━━━━━━━━━━━━━━━━━
  DATE
  ━━━━━━━━━━━━━━━━━━━
  */
  const formattedDate =

    item?.createdAt

      ? new Date(
          item.createdAt
        ).toLocaleDateString(
          "id-ID",
          {

            day: "numeric",

            month: "short",

          }
        )

      : "Baru saja";

  return (

    <div
      className="
        group
        rounded-[32px]
        border
        border-slate-100
        bg-slate-50
        p-5
        transition-all
        duration-300
        hover:border-slate-200
        hover:bg-white
        hover:shadow-sm
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-5
        "
      >

        {/* LEFT */}
        <div
          className="
            flex
            gap-4
          "
        >

          {/* ICON */}
          <div
            className={`
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              transition-transform
              duration-300
              group-hover:scale-110
              ${iconColor}
            `}
          >

            <Icon
              className="
                h-6
                w-6
              "
            />

          </div>

          {/* CONTENT */}
          <div>

            {/* TITLE */}
            <h3
              className="
                font-black
                text-slate-900
              "
            >

              {
                item?.title ||

                "Aktivitas Baru"
              }

            </h3>

            {/* DESCRIPTION */}
            <p
              className="
                mt-1
                text-sm
                leading-relaxed
                text-slate-500
              "
            >

              {
                item?.description ||

                "Tidak ada deskripsi"
              }

            </p>

          </div>

        </div>

        {/* DATE */}
        <div
          className="
            shrink-0
            rounded-xl
            bg-white
            px-3
            py-2
            text-xs
            font-semibold
            text-slate-500
            shadow-sm
          "
        >

          {formattedDate}

        </div>

      </div>

    </div>

  );

}