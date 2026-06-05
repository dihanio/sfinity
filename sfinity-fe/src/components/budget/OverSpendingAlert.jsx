"use client";

import {
  AlertTriangle,
} from "lucide-react";

import {
  useBudgetStore,
} from "@/stores/useBudgetStore";

export default function OverSpendingAlert() {

  const { budgets } =
    useBudgetStore();

  const alerts =
    budgets.filter(

      (item) =>

        item.status ===
        "warning" ||

        item.status ===
        "danger"

    );

  if (
    alerts.length === 0
  ) {
    return null;
  }

  return (

    <div
      className="
        rounded-[28px]
        border
        border-red-200
        bg-red-50
        p-6
      "
    >

      <div className="flex gap-4">

        <AlertTriangle
          className="
            h-6
            w-6
            text-red-500
          "
        />

        <div>

          <h2
            className="
              text-xl
              font-black
              text-red-600
            "
          >
            Overspending Alert
          </h2>

          <div className="mt-4 space-y-3">

            {alerts.map(
              (item) => (

                <p
                  key={item._id}
                  className="
                    text-red-500
                  "
                >

                  Budget{" "}
                  <span className="font-bold">
                    {item.category}
                  </span>
                  {" "}
                  sudah mencapai{" "}
                  {item.percentage}%

                </p>

              )
            )}

          </div>

        </div>

      </div>

    </div>

  );

}