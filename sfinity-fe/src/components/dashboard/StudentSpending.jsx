"use client";

import {
  useDashboardStore,
} from "@/stores/useDashboardStore";

export default function
StudentSpending() {

  const categoryAnalytics =
    useDashboardStore(
      (state) =>
        state.categoryAnalytics
    );

  function getStatus(
    ratio
  ) {

    if (ratio > 25)
      return "🔴 Tinggi";

    if (ratio > 15)
      return "🟡 Sedang";

    return "🟢 Normal";

  }

  return (

    <div
      className="
        rounded-[32px]
        border
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
        Student Spending
      </h2>

      <div
        className="
          mt-6
          space-y-4
        "
      >

        {
          categoryAnalytics.map(
            (
              item
            ) => (

              <div
                key={
                  item.name
                }
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <p
                    className="
                      font-semibold
                    "
                  >
                    {item.name}
                  </p>

                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    {item.ratio}%
                  </p>

                </div>

                <div>

                  {
                    getStatus(
                      item.ratio
                    )
                  }

                </div>

              </div>

            )
          )
        }

      </div>

    </div>

  );

}