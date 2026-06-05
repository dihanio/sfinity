export function calculateFinancialHealth({
  income,
  expense,
}) {
  if (income <= 0) return 0;

  const ratio =
    ((income - expense) /
      income) *
    100;

  if (ratio >= 50) return 95;

  if (ratio >= 30) return 80;

  if (ratio >= 10) return 65;

  return 40;
}

/*
  SAVING RATE
*/
export function calculateSavingRate({
  income,
  expense,
}) {
  if (income <= 0) return 0;

  return Math.max(
    ((income - expense) /
      income) *
      100,
    0
  );
}

/*
  TOP CATEGORY
*/
export function getTopExpenseCategory(
  transactions
) {
  const expenses =
    transactions.filter(
      (item) =>
        item.type ===
        "expense"
    );

  const grouped = {};

  expenses.forEach((item) => {
    grouped[item.category] =
      (grouped[
        item.category
      ] || 0) + item.amount;
  });

  const sorted =
    Object.entries(
      grouped
    ).sort(
      (a, b) => b[1] - a[1]
    );

  return sorted[0]?.[0] || "-";
}