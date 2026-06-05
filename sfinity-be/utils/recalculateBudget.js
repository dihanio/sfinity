import Budget
from "../models/BudgetModel.js";

import Transaction
from "../models/TransactionModel.js";

export async function
recalculateBudget({

  userId,

  categoryId,

  month,

  year,

}) {

  try {

    /*
    FIND BUDGET
    */
    const budget =
      await Budget.findOne({

        user:
          userId,

        category:
          categoryId,

        month,

        year,

      });

    /*
    NO BUDGET
    */
    if (!budget) {

      return;

    }

    /*
    TOTAL EXPENSE
    */
    const transactions =
      await Transaction.find({

        user:
          userId,

        type:
          "expense",

        category:
          categoryId,

        month,

        year,

      });

    /*
    TOTAL SPENT
    */
    const spent =
      transactions.reduce(

        (acc, item) =>

          acc + item.amount,

        0

      );

    /*
    UPDATE
    */
    budget.spent =
      spent;

    budget.remaining =
      budget.limit - spent;

    budget.percentage =

      budget.limit > 0

        ? Math.round(
            (spent / budget.limit) * 100
          )

        : 0;

    /*
    STATUS
    */
    if (
      budget.percentage >= 100
    ) {

      budget.status =
        "danger";

    }

    else if (
      budget.percentage >= 80
    ) {

      budget.status =
        "warning";

    }

    else {

      budget.status =
        "safe";

    }

    await budget.save();

  } catch (error) {

    console.log(
      "RECALCULATE ERROR:"
    );

    console.log(error);

  }

}