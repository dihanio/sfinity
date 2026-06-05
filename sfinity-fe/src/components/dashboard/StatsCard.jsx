import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

export default function StatsCard({
  title,
  amount,
  percentage,
  type,
  hasComparison = true,
}) {

  /*
    COLORS
  */
  const isDanger =
    type === "danger";

  const isIncome =
    type === "income";

  return (
    <div
      className="
        rounded-[28px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
      "
    >
      {/* TOP */}
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-sm
              font-medium
              text-slate-500
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-3
              text-3xl
              font-black
              tracking-tight
              text-slate-900
            "
          >
            {amount}
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
            ${
              isDanger
                ? "bg-red-100"
                : isIncome
                ? "bg-blue-100"
                : "bg-emerald-100"
            }
          `}
        >
          {isDanger ? (
            <ArrowDownRight
              className="
                h-6
                w-6
                text-red-600
              "
            />
          ) : (
            <ArrowUpRight
              className={`
                h-6
                w-6
                ${
                  isIncome
                    ? "text-blue-600"
                    : "text-emerald-600"
                }
              `}
            />
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="
          mt-5
          flex
          items-center
          gap-2
        "
      >
        {hasComparison ? (
          <>
            <div
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${
                  isDanger
                    ? "bg-red-100 text-red-600"
                    : "bg-emerald-100 text-emerald-600"
                }
              `}
            >
              {percentage}
            </div>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              dari bulan lalu
            </p>
          </>
        ) : (
          <p
            className="
              text-sm
              text-slate-400
            "
          >
            Belum ada data
            pembanding
          </p>
        )}
      </div>
    </div>
  );
}