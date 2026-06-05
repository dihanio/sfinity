export function calculateFinancialHealth({
  balance = 0,
  income = 0,
  expense = 0,
  streak = 0,
}) {

  let score = 0;

  /*
  ━━━━━━━━━━━━━━━━━━━
  SAVING RATIO
  ━━━━━━━━━━━━━━━━━━━
  */
  const savings =
    income - expense;

  const savingRatio =
    income > 0
      ? (savings / income) *
        100
      : 0;

  /*
  ━━━━━━━━━━━━━━━━━━━
  SAVING SCORE
  MAX 40
  ━━━━━━━━━━━━━━━━━━━
  */
  if (savingRatio >= 50) {

    score += 40;

  }

  else if (
    savingRatio >= 30
  ) {

    score += 30;

  }

  else if (
    savingRatio >= 15
  ) {

    score += 20;

  }

  else if (
    savingRatio >= 5
  ) {

    score += 10;

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  BALANCE HEALTH
  MAX 25
  ━━━━━━━━━━━━━━━━━━━
  */
  const balanceRatio =
    expense > 0
      ? balance / expense
      : 0;

  if (balanceRatio >= 6) {

    score += 25;

  }

  else if (
    balanceRatio >= 3
  ) {

    score += 18;

  }

  else if (
    balanceRatio >= 1
  ) {

    score += 10;

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  EXPENSE CONTROL
  MAX 20
  ━━━━━━━━━━━━━━━━━━━
  */
  const expenseRatio =
    income > 0
      ? (expense / income) *
        100
      : 100;

  if (expenseRatio < 50) {

    score += 20;

  }

  else if (
    expenseRatio < 75
  ) {

    score += 15;

  }

  else if (
    expenseRatio < 90
  ) {

    score += 8;

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  STREAK
  MAX 15
  ━━━━━━━━━━━━━━━━━━━
  */
  if (streak >= 30) {

    score += 15;

  }

  else if (
    streak >= 14
  ) {

    score += 10;

  }

  else if (
    streak >= 7
  ) {

    score += 5;

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  LIMIT SCORE
  ━━━━━━━━━━━━━━━━━━━
  */
  if (score > 100) {

    score = 100;

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  STATUS
  ━━━━━━━━━━━━━━━━━━━
  */
  let status =
    "Bahaya";

  let insight =
    "Pengeluaranmu masih terlalu tinggi dibanding pemasukan.";

  /*
  ━━━━━━━━━━━━━━━━━━━
  COLORS
  ━━━━━━━━━━━━━━━━━━━
  */
  let color =
    "#ef4444";

  let textColor =
    "text-red-500";

  /*
  ━━━━━━━━━━━━━━━━━━━
  VERY HEALTHY
  ━━━━━━━━━━━━━━━━━━━
  */
  if (score >= 80) {

    status =
      "Sangat Sehat";

    insight =
      "Keuanganmu sangat stabil dan terkontrol.";

    color =
      "#22c55e";

    textColor =
      "text-emerald-500";

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  STABLE
  ━━━━━━━━━━━━━━━━━━━
  */
  else if (
    score >= 60
  ) {

    status =
      "Stabil";

    insight =
      "Kondisi finansialmu cukup aman dan sehat.";

    color =
      "#3b82f6";

    textColor =
      "text-blue-500";

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  WARNING
  ━━━━━━━━━━━━━━━━━━━
  */
  else if (
    score >= 40
  ) {

    status =
      "Waspada";

    insight =
      "Coba tingkatkan saving dan kontrol pengeluaran.";

    color =
      "#facc15";

    textColor =
      "text-yellow-500";

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  RETURN
  ━━━━━━━━━━━━━━━━━━━
  */
  return {
    score,
    status,
    insight,
    color,
    textColor,
    savingRatio,
    expenseRatio,
    balanceRatio,
    savings,
  };
}