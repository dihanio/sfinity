"use client";

import {
  useReportStore,
} from "@/stores/useReportStore";

export default function
TopExpenseList() {

  const {
    analytics,
  } =
    useReportStore();

  if (!analytics) {

  return (

    <div
      className="
        rounded-[28px]
        border
        border-slate-200
        bg-white
        p-6
      "
    >

      <p className="text-slate-500">

        Loading analytics...

      </p>

    </div>

  );

}

  return (

    <div
      className="
        rounded-[28px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      <h2
        className="
          text-2xl
          font-black
          text-slate-900
        "
      >

        Pengeluaran Terbesar

      </h2>

      <div className="mt-8 space-y-4">

        {
          analytics.topExpenses.map(
            (item) => (

              <div

                key={
                  item._id
                }

                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-slate-50
                  p-4
                "
              >

                <div>

                  <h3
                    className="
                      font-bold
                      text-slate-900
                    "
                  >

                    {item.title}

                  </h3>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >

                    {
                      item.category?.name
                    }

                  </p>

                </div>

                <p
                  className="
                    font-black
                    text-red-500
                  "
                >

                  Rp{" "}

                  {
                    item.amount.toLocaleString(
                      "id-ID"
                    )
                  }

                </p>

              </div>

            )
          )
        }

      </div>

    </div>

  );

}