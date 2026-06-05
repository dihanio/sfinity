"use client";

export default function BudgetProgress({
  limit,
  spent,
  color,
}) {
  const percent = Math.min(
    (spent / limit) * 100,
    100
  );

  return (
    <div
      className="
        h-3
        overflow-hidden
        rounded-full
        bg-slate-100
      "
    >
      <div
        style={{
          width: `${percent}%`,
        }}
        className={`
          h-full
          rounded-full
          bg-gradient-to-r
          ${color}
        `}
      />
    </div>
  );
}