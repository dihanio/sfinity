"use client";

import {

  ScanSearch,

  Receipt,

  TrendingUp,

  Wallet,

} from "lucide-react";

import {
  useReceiptStore,
} from "@/stores/useReceiptStore";

export default function ScanStats() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const scans =
    useReceiptStore(
      (state) =>
        state.scans || []
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  TOTAL SCAN
  ━━━━━━━━━━━━━━━━━━━
  */
  const totalScan =
    scans.length;

  /*
  ━━━━━━━━━━━━━━━━━━━
  TOTAL AMOUNT
  ━━━━━━━━━━━━━━━━━━━
  */
  const totalAmount =
    scans.reduce(

      (
        total,
        item
      ) =>

        total +
        Number(
          item.total || 0
        ),

      0

    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  LAST SCAN
  ━━━━━━━━━━━━━━━━━━━
  */
  const lastScan =
    scans[0];

  /*
  ━━━━━━━━━━━━━━━━━━━
  LAST CATEGORY
  ━━━━━━━━━━━━━━━━━━━
  */
  const lastCategory =

    lastScan?.category

      ? typeof lastScan.category ===
        "object"

        ? lastScan.category.name

        : lastScan.category

      : "-";

  /*
  ━━━━━━━━━━━━━━━━━━━
  AVG
  ━━━━━━━━━━━━━━━━━━━
  */
  const averageScan =

    totalScan > 0

      ? totalAmount /
        totalScan

      : 0;

  /*
  ━━━━━━━━━━━━━━━━━━━
  CARDS
  ━━━━━━━━━━━━━━━━━━━
  */
  const cards = [

    {

      title:
        "Total Scan",

      value:
        totalScan,

      prefix:
        "",

      icon:
        ScanSearch,

      bg:
        "bg-blue-100",

      color:
        "text-blue-600",

    },

    {

      title:
        "Total OCR Amount",

      value:
        totalAmount.toLocaleString(
          "id-ID"
        ),

      prefix:
        "Rp ",

      icon:
        Wallet,

      bg:
        "bg-emerald-100",

      color:
        "text-emerald-600",

    },

    {

      title:
        "Average Scan",

      value:
        averageScan.toLocaleString(
          "id-ID",
          {

            maximumFractionDigits: 0,

          }
        ),

      prefix:
        "Rp ",

      icon:
        TrendingUp,

      bg:
        "bg-orange-100",

      color:
        "text-orange-500",

    },

    {

      title:
        "Last Category",

      value:
        lastCategory,

      prefix:
        "",

      icon:
        Receipt,

      bg:
        "bg-purple-100",

      color:
        "text-purple-600",

    },

  ];

  return (

    <div
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
      "
    >

      {
        cards.map(
          (
            item
          ) => {

            const Icon =
              item.icon;

            return (

              <div

                key={
                  item.title
                }

                className="
                  rounded-[32px]
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  {/* LEFT */}
                  <div>

                    <p
                      className="
                        text-sm
                        text-slate-500
                      "
                    >
                      {
                        item.title
                      }
                    </p>

                    <h2
                      className={`
                        mt-2
                        text-3xl
                        font-black
                        ${item.color}
                      `}
                    >

                      {
                        item.prefix
                      }

                      {
                        item.value
                      }

                    </h2>

                  </div>

                  {/* ICON */}
                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      ${item.bg}
                    `}
                  >

                    <Icon
                      className={`
                        h-7
                        w-7
                        ${item.color}
                      `}
                    />

                  </div>

                </div>

              </div>

            );

          }
        )
      }

    </div>

  );

}
