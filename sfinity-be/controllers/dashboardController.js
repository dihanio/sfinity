import Transaction
from "../models/TransactionModel.js";

/*
━━━━━━━━━━━━━━━━━━━
GET DASHBOARD
━━━━━━━━━━━━━━━━━━━
*/
export const getDashboard =
  async (req, res) => {

    try {

      /*
      ━━━━━━━━━━━━━━━━━━━
      USER TRANSACTIONS
      ━━━━━━━━━━━━━━━━━━━
      */
      const transactions =
  await Transaction.find({

    user: req.user._id,

  })

  .populate(
    "category",
    "name"
  )

  .sort({

    createdAt: -1,

  });

      /*
      ━━━━━━━━━━━━━━━━━━━
      TOTAL INCOME
      ━━━━━━━━━━━━━━━━━━━
      */
      const totalIncome =
        transactions

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

      /*
      ━━━━━━━━━━━━━━━━━━━
      TOTAL EXPENSE
      ━━━━━━━━━━━━━━━━━━━
      */
      const totalExpense =
        transactions

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

      /*
      ━━━━━━━━━━━━━━━━━━━
      BALANCE
      ━━━━━━━━━━━━━━━━━━━
      */
      const balance =
        totalIncome -
        totalExpense;

        const hasData =
  totalIncome > 0 ||
  totalExpense > 0;

      /*
      ━━━━━━━━━━━━━━━━━━━
      RECENT TRANSACTIONS
      ━━━━━━━━━━━━━━━━━━━
      */
      const recentTransactions =
        transactions.slice(0, 5);

        if (!hasData) {

  return res.json({

    success: true,

    summary: {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
    },

    recentTransactions: [],

    categoryAnalytics: [],

    monthlyData: [],

    topExpenses: [],

    financialHealth: {

      score: 0,

      status:
        "Belum Ada Data",

      savingRatio: 0,

      expenseRatio: 0,

      savings: 0,

      insight:
        "Tambahkan transaksi pertama untuk melihat kesehatan finansial.",

      foodRatio: 0,

      transportationRatio: 0,

      technologyRatio: 0,

      entertainmentRatio: 0,

      tuitionRatio: 0,

      housingRatio: 0,

      booksRatio: 0,

      healthRatio: 0,

      personalCareRatio: 0,

      miscellaneousRatio: 0,

    },

  });

}

      /*
      ━━━━━━━━━━━━━━━━━━━
      MONTHLY EXPENSE
      ━━━━━━━━━━━━━━━━━━━
      */
      const monthlyExpense =
        transactions.filter(
          (item) => {

            const date =
              new Date(
                item.date
              );

            const now =
              new Date();

            return (

              item.type ===
                "expense" &&

              date.getMonth() ===
                now.getMonth() &&

              date.getFullYear() ===
                now.getFullYear()

            );

          }
        
        );
const monthlyTotalExpense =
  monthlyExpense.reduce(

    (sum, item) =>

      sum + item.amount,

    0

  );
        
const tuitionExpense =
  monthlyExpense

    .filter(
      (item) =>
        item.category?.name ===
        "tuition"
    )

    .reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

const housingExpense =
  monthlyExpense

    .filter(
      (item) =>
        item.category?.name ===
        "housing"
    )

    .reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

const foodExpense =
  monthlyExpense

    .filter(
      (item) =>
        item.category?.name ===
        "food"
    )

    .reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

const transportationExpense =
  monthlyExpense

    .filter(
      (item) =>
        item.category?.name ===
        "transportation"
    )

    .reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

const booksExpense =
  monthlyExpense

    .filter(
      (item) =>
        item.category?.name ===
        "books & supplies"
    )

    .reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

const entertainmentExpense =
  monthlyExpense

    .filter(
      (item) =>
        item.category?.name ===
        "entertainment"
    )

    .reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

const personalCareExpense =
  monthlyExpense

    .filter(
      (item) =>
        item.category?.name ===
        "personal care"
    )

    .reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

const technologyExpense =
  monthlyExpense

    .filter(
      (item) =>
        item.category?.name ===
        "technology"
    )

    .reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

const healthExpense =
  monthlyExpense

    .filter(
      (item) =>
        item.category?.name ===
        "health & wellness"
    )

    .reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

const miscellaneousExpense =
  monthlyExpense

    .filter(
      (item) =>
        item.category?.name ===
        "miscellaneous"
    )

    .reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

       /*
━━━━━━━━━━━━━━━━━━━
CATEGORY RATIOS
━━━━━━━━━━━━━━━━━━━
*/

const tuitionRatio =
  monthlyTotalExpense > 0
    ? (tuitionExpense / monthlyTotalExpense) * 100
    : 0;

const housingRatio =
 monthlyTotalExpense > 0
    ? (housingExpense / monthlyTotalExpense) * 100
    : 0;

const foodRatio =
 monthlyTotalExpense > 0
    ? (foodExpense / monthlyTotalExpense) * 100
    : 0;

const transportationRatio =
  monthlyTotalExpense > 0
    ? (transportationExpense / monthlyTotalExpense) * 100
    : 0;

const booksRatio =
  monthlyTotalExpense > 0
    ? (booksExpense / monthlyTotalExpense) * 100
    : 0;

const entertainmentRatio =
 monthlyTotalExpense > 0
    ? (entertainmentExpense / monthlyTotalExpense) * 100
    : 0;

const personalCareRatio =
  monthlyTotalExpense > 0
    ? (personalCareExpense / monthlyTotalExpense) * 100
    : 0;

const technologyRatio =
  monthlyTotalExpense > 0
    ? (technologyExpense / monthlyTotalExpense) * 100
    : 0;

const healthRatio =
  monthlyTotalExpense > 0
    ? (healthExpense / monthlyTotalExpense) * 100
    : 0;

const miscellaneousRatio =
  monthlyTotalExpense > 0
    ? (miscellaneousExpense / monthlyTotalExpense) * 100
    : 0;


      /*
      ━━━━━━━━━━━━━━━━━━━
      CATEGORY ANALYTICS
      ━━━━━━━━━━━━━━━━━━━
      */
      const categoryMap = {};

monthlyExpense.forEach(
  (item) => {

    const categoryName =
      item.category?.name ||
      "Lainnya";

    if (
      categoryMap[
        categoryName
      ]
    ) {

      categoryMap[
        categoryName
      ] += item.amount;

    } else {

      categoryMap[
        categoryName
      ] = item.amount;

    }

  }
);

      const categoryAnalytics =
  Object.entries(categoryMap)
    .map(([name, amount]) => ({

      name,

      amount,

      ratio:
        totalExpense > 0

          ? Math.round(
              (amount /
                totalExpense) *
                100
            )

          : 0,

    }))
    .sort(
      (a, b) =>
        b.amount - a.amount
    );
      /*
      ━━━━━━━━━━━━━━━━━━━
      MONTHLY TREND
      ━━━━━━━━━━━━━━━━━━━
      */
      const monthlyData = [

        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",

      ].map((month, index) => {

        /*
        INCOME
        */
        const income =
          transactions

            .filter((item) => {

              const date =
                new Date(
                  item.date
                );

              return (

                item.type ===
                  "income" &&

                date.getMonth() ===
                  index

              );

            })

            .reduce(
              (acc, item) =>
                acc +
                item.amount,
              0
            );

        /*
        EXPENSE
        */
        const expense =
          transactions

            .filter((item) => {

              const date =
                new Date(
                  item.date
                );

              return (

                item.type ===
                  "expense" &&

                date.getMonth() ===
                  index

              );

            })

            .reduce(
              (acc, item) =>
                acc +
                item.amount,
              0
            );

        return {

          month,

          income,

          expense,

        };

      });

      /*
      ━━━━━━━━━━━━━━━━━━━
      FINANCIAL HEALTH
      ━━━━━━━━━━━━━━━━━━━
      */
      const savings =
        totalIncome -
        totalExpense;

      /*
      SAVING RATIO
      */
      const savingRatio =
        totalIncome > 0

          ? (
              savings /
              totalIncome
            ) * 100

          : 0;

      /*
      EXPENSE RATIO
      */
      const expenseRatio =
        totalIncome > 0

          ? (
              totalExpense /
              totalIncome
            ) * 100

          : 100;

      let financialScore = 0;

      /*
      ━━━━━━━━━━━━━━━━━━━
      SAVING SCORE
      MAX 40
      ━━━━━━━━━━━━━━━━━━━
      */
      if (
        savingRatio >= 50
      ) {

        financialScore += 40;

      }

      else if (
        savingRatio >= 30
      ) {

        financialScore += 30;

      }

      else if (
        savingRatio >= 15
      ) {

        financialScore += 20;

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      EXPENSE CONTROL
      MAX 30
      ━━━━━━━━━━━━━━━━━━━
      */
      if (
        expenseRatio < 50
      ) {

        financialScore += 30;

      }

      else if (
        expenseRatio < 75
      ) {

        financialScore += 20;

      }

      else if (
        expenseRatio < 90
      ) {

        financialScore += 10;

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      BALANCE HEALTH
      MAX 30
      ━━━━━━━━━━━━━━━━━━━
      */
      if (

        balance >=
        totalExpense * 3

      ) {

        financialScore += 30;

      }

      else if (

        balance >=
        totalExpense

      ) {

        financialScore += 15;

      }
      /*
━━━━━━━━━━━━━━━━━━━
CATEGORY HEALTH
MAX 20
━━━━━━━━━━━━━━━━━━━
*/

if (foodRatio <= 35) {
  financialScore += 5;
}

if (entertainmentRatio <= 15) {
  financialScore += 5;
}

if (transportationRatio <= 20) {
  financialScore += 5;
}

if (technologyRatio <= 15) {
  financialScore += 5;
}

      /*
      LIMIT SCORE
      */
      if (
        financialScore > 100
      ) {

        financialScore = 100;

      }

      /*
━━━━━━━━━━━━━━━━━━━
STATUS
━━━━━━━━━━━━━━━━━━━
*/
let status =
  "Belum Ada Data";

if (
  financialScore >= 80
) {

  status =
    "Sangat Sehat";

}

else if (
  financialScore >= 60
) {

  status =
    "Stabil";

}

else if (
  financialScore >= 40
) {

  status =
    "Waspada";

}

else if (
  financialScore > 0
) {

  status =
    "Bahaya";

}
const topExpenses =
  transactions

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
━━━━━━━━━━━━━━━━━━━
AI INSIGHT
━━━━━━━━━━━━━━━━━━━
*/

let insight =
  "Keuangan kamu berada dalam kondisi sehat.";

if (foodRatio > 40) {

  insight =
    "Pengeluaran Food terlalu tinggi dibanding total pengeluaran.";

}

if (entertainmentRatio > 20) {

  insight =
    "Pengeluaran Entertainment cukup tinggi. Pertimbangkan mengurangi hiburan untuk meningkatkan tabungan.";

}

if (savingRatio < 15) {

  insight =
    "Saving Ratio masih rendah. Cobalah mengurangi pengeluaran yang tidak terlalu penting.";

}
      /*
      ━━━━━━━━━━━━━━━━━━━
      RESPONSE
      ━━━━━━━━━━━━━━━━━━━
      */
      res.json({

        success: true,

        /*
        SUMMARY
        */
        summary: {

          totalIncome,

          totalExpense,

          balance,

        },
        topExpenses,
        /*
        RECENT
        */
        recentTransactions,

        /*
        MONTHLY
        */
        monthlyExpense,

        /*
        CATEGORY
        */
        categoryAnalytics,

        /*
        TREND
        */
        monthlyData,

        /*
        FINANCIAL HEALTH
        */
        financialHealth: {

  score:
    Math.round(
      financialScore
    ),

  status, // <-- TAMBAHKAN INI

  savingRatio:
    Math.round(
      savingRatio
    ),

  expenseRatio:
    Math.round(
      expenseRatio
    ),

  savings,

  tuitionRatio:
    Math.round(
      tuitionRatio
    ),

  housingRatio:
    Math.round(
      housingRatio
    ),

  foodRatio:
    Math.round(
      foodRatio
    ),

  transportationRatio:
    Math.round(
      transportationRatio
    ),

  booksRatio:
    Math.round(
      booksRatio
    ),

  entertainmentRatio:
    Math.round(
      entertainmentRatio
    ),

  personalCareRatio:
    Math.round(
      personalCareRatio
    ),

  technologyRatio:
    Math.round(
      technologyRatio
    ),

  healthRatio:
    Math.round(
      healthRatio
    ),

  miscellaneousRatio:
    Math.round(
      miscellaneousRatio
    ),

  insight,

},
});
    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };
  