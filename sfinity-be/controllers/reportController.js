import Transaction
from "../models/TransactionModel.js";

import Budget
from "../models/BudgetModel.js";

/*
━━━━━━━━━━━━━━━━━━━
GET REPORT ANALYTICS
━━━━━━━━━━━━━━━━━━━
*/
export const getReportAnalytics =
  async (req, res) => {

    try {

      /*
      CURRENT DATE
      */
      const now =
        new Date();

      const month =
        now.getMonth() + 1;

      const year =
        now.getFullYear();

      /*
      TRANSACTIONS (current year)
      */
      const transactions =
        await Transaction.find({

          user:
            req.user._id,

          year,

        }).populate(

          "category",

          "name type"

        );

      /*
      CURRENT MONTH TRANSACTIONS
      */
      const currentMonthTransactions = transactions.filter(
        (t) => t.month === month && t.year === year
      );

      /*
      BUDGETS
      */
      const budgets =
        await Budget.find({

          user:
            req.user._id,

          month,

          year,

        }).populate(

          "category",

          "name type"

        );

      /*
      ENRICH BUDGETS
      */
      const enrichedBudgets = budgets.map((budget) => {
        const spent = transactions
          .filter(
            (t) =>
              t.type === "expense" &&
              t.category?._id?.toString() === budget.category?._id?.toString() &&
              t.month === budget.month &&
              t.year === budget.year
          )
          .reduce((sum, t) => sum + t.amount, 0);

        const limit = budget.limit;
        const remaining = limit - spent;
        const percentage = limit > 0 ? Math.min(Math.round((spent / limit) * 100), 100) : 0;
        let status = "safe";
        if (percentage >= 100) {
          status = "danger";
        } else if (percentage >= 80) {
          status = "warning";
        }

        return {
          ...budget.toObject(),
          spent,
          remaining,
          percentage,
          status,
        };
      });

      /*
      TOTALS
      */
      const totalIncome =
        currentMonthTransactions

          .filter(
            (item) =>
              item.type ===
              "income"
          )

          .reduce(
            (acc, item) =>
              acc + item.amount,
            0
          );

      const totalExpense =
        currentMonthTransactions

          .filter(
            (item) =>
              item.type ===
              "expense"
          )

          .reduce(
            (acc, item) =>
              acc + item.amount,
            0
          );

      const balance =
        totalIncome -
        totalExpense;

      /*
      SAVING RATE
      */
      const savingRate =
        totalIncome > 0

          ? Math.round(
              (balance /
                totalIncome) *
                100
            )

          : 0;

      /*
      TOP EXPENSES
      */
      const topExpenses =
        [...currentMonthTransactions]

          .filter(
            (item) =>
              item.type ===
              "expense"
          )

          .sort(
            (a, b) =>
              b.amount -
              a.amount
          )

          .slice(0, 5);

      /*
      CATEGORY BREAKDOWN
      */
      const categoryMap =
        {};

      currentMonthTransactions

        .filter(
          (item) =>
            item.type ===
            "expense"
        )

        .forEach((item) => {

          const categoryName =

            item.category?.name ||

            "Unknown";

          if (
            !categoryMap[
              categoryName
            ]
          ) {

            categoryMap[
              categoryName
            ] = 0;

          }

          categoryMap[
            categoryName
          ] += item.amount;

        });

      const categoryBreakdown =

        Object.entries(
          categoryMap
        ).map(

          ([name, value]) => ({

            name,

            value,

          })

        );

      /*
      CASHFLOW
      */
      const monthlyCashflow =
        Array.from({

          length: 12,

        }).map((_, index) => {

          const monthNumber =
            index + 1;

          const monthTransactions =

            transactions.filter(

              (item) =>

                item.month ===
                monthNumber

            );

          return {

            month:
              new Date(

                year,

                index

              ).toLocaleDateString(

                "id-ID",

                {

                  month:
                    "short",

                }

              ),

            income:

              monthTransactions

                .filter(
                  (item) =>
                    item.type ===
                    "income"
                )

                .reduce(
                  (acc, item) =>
                    acc +
                    item.amount,
                  0
                ),

            expense:

              monthTransactions

                .filter(
                  (item) =>
                    item.type ===
                    "expense"
                )

                .reduce(
                  (acc, item) =>
                    acc +
                    item.amount,
                  0
                ),

          };

        });

      /*
      AI INSIGHT
      */
      let insight =
        "Keuangan cukup stabil.";

      if (
        savingRate < 20
      ) {

        insight =
          "Saving rate rendah. Kurangi pengeluaran tidak penting.";

      }

      if (
        totalExpense >
        totalIncome
      ) {

        insight =
          "Pengeluaran melebihi pemasukan bulan ini.";

      }

      /*
      RESPONSE
      */
      res.json({

        success: true,

        analytics: {

          balance,

          totalIncome,

          totalExpense,

          savingRate,

          insight,

          topExpenses,

          categoryBreakdown,

          monthlyCashflow,

          budgets: enrichedBudgets,

          transactions: currentMonthTransactions,

        },

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };