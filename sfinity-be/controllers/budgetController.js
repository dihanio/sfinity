import Budget from "../models/BudgetModel.js";
import Transaction from "../models/TransactionModel.js";
import Category from "../models/CategoryModel.js";
import mongoose from "mongoose";
import { addActivity }
from "../utils/addActivity.js";

import {
  updateGamification,
} from "../utils/updateGamification.js";

/*
━━━━━━━━━━━━━━━━━━━
CALCULATE STATS
━━━━━━━━━━━━━━━━━━━
*/
const calculateBudgetStats =
  async (
    userId,
    categoryId,
    month,
    year,
    limit
  ) => {

    const result =
  await Transaction.aggregate([
    {
      $match: {
  user:
    new mongoose.Types.ObjectId(
      userId
    ),

  category:
    new mongoose.Types.ObjectId(
      categoryId
    ),

  type: "expense",

  month:
    Number(month),

  year:
    Number(year),
}
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

const spent =
  result[0]?.total || 0;

    const remaining =
      limit - spent;

    const percentage =

      limit > 0

        ? Math.min(

            Math.round(
              (spent / limit) * 100
            ),

            100

          )

        : 0;

    let status = "safe";

    if (
      percentage >= 100
    ) {

      status = "danger";

    } else if (
      percentage >= 80
    ) {

      status = "warning";

    }

    return {

      spent,

      remaining,

      percentage,

      status,

    };

  };

  

/*
━━━━━━━━━━━━━━━━━━━
CREATE BUDGET
━━━━━━━━━━━━━━━━━━━
*/
export const createBudget =
  async (req, res) => {

    try {

      const {

        category,

        limit,

        month,

        year,

      } = req.body;

      if (

        !category ||

        !limit ||

        !month ||

        !year

      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please fill all fields",

        });

      }
if (
  Number(limit) <= 0
) {

  return res.status(400).json({

    success: false,

    message:
      "Limit must be greater than 0",

  });

}
      const categoryData =
        await Category.findOne({

          _id: category,

          user:
            req.user._id,

        });

      if (!categoryData) {

        return res.status(404).json({

          success: false,

          message:
            "Category not found",

        });

      }

      if (
        categoryData.type !==
        "expense"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Budget hanya untuk expense category",

        });

      }

      const existing =
        await Budget.findOne({

          user:
            req.user._id,

          category,

          month,

          year,

        });

      if (existing) {

        return res.status(400).json({

          success: false,

          message:
            "Budget already exists",

        });

      }

      const budget =
        await Budget.create({

          user:
            req.user._id,

          category,

          limit,

          month,

          year,

        });

      await budget.populate(
        "category"
      );

      /*
      XP + LEVEL + ACHIEVEMENT
      */
      const user =
        await updateGamification(
  req.user._id,
  {
    xp: 25,

    budgets: 1,
  }
);

      /*
      ACTIVITY
      */
      await addActivity({

        userId:
          req.user._id,

        type:
          "budget",

        title:
          "Membuat Budget",

        description:
          `${categoryData.name} • Rp ${Number(limit).toLocaleString("id-ID")}`,

        xp: 25,

      });

      res.status(201).json({

        success: true,

        budget,

        user: {

          xp:
            user.xp,

          level:
            user.level,

          achievements:
            user.achievements,

          stats:
            user.stats,

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

/*
━━━━━━━━━━━━━━━━━━━
GET BUDGETS
━━━━━━━━━━━━━━━━━━━
*/
export const getBudgets =
  async (req, res) => {

    try {

      const budgets =
        await Budget.find({

          user:
            req.user._id,

        })

          .populate(
            "category"
          )

          .sort({

            createdAt: -1,

          });

      const enriched =
        await Promise.all(

          budgets.map(

            async (budget) => {

              const stats =
                await calculateBudgetStats(

                  req.user._id,

                  budget.category._id,

                  budget.month,

                  budget.year,

                  budget.limit

                );

              return {

                ...budget.toObject(),

                ...stats,

              };

            }

          )

        );

        const summary = {

  totalBudget:
    enriched.reduce(
      (acc, item) =>
        acc + item.limit,
      0
    ),

  totalSpent:
    enriched.reduce(
      (acc, item) =>
        acc + item.spent,
      0
    ),

  totalRemaining:
    enriched.reduce(
      (acc, item) =>
        acc + item.remaining,
      0
    ),

};

      res.json({

        success: true,

        budgets:
          enriched,
          summary,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

/*
━━━━━━━━━━━━━━━━━━━
UPDATE BUDGET
━━━━━━━━━━━━━━━━━━━
*/
export const updateBudget =
  async (req, res) => {

    try {

      const budget =
        await Budget.findOne({

          _id:
            req.params.id,

          user:
            req.user._id,

        });

      if (!budget) {

        return res.status(404).json({

          success: false,

          message:
            "Budget not found",

        });

      }
      if (

  req.body.limit !==
  undefined &&

  Number(
    req.body.limit
  ) <= 0

) {

  return res.status(400).json({

    success: false,

    message:
      "Limit must be greater than 0",

  });

}

      const categoryId =
  req.body.category;

if (categoryId) {

  const category =
    await Category.findOne({

      _id:
        categoryId,

      user:
        req.user._id,

    });

  if (!category) {

    return res.status(404).json({

      success: false,

      message:
        "Category not found",

    });

  }

  budget.category =
    categoryId;

}
budget.limit =
  req.body.limit ??
  budget.limit;
  console.log(
  "UPDATE BUDGET BODY:",
  req.body
);

      await budget.save();

      await budget.populate(
        "category"
      );

      const stats =
        await calculateBudgetStats(

          req.user._id,

          budget.category._id,

          budget.month,

          budget.year,

          budget.limit

        );

      await addActivity({

        userId:
          req.user._id,

        type:
          "budget_update",

        title:
          "Update Budget",

        description:
  `${budget.category.name} • Rp ${budget.limit.toLocaleString("id-ID")}`

      });

      res.json({

        success: true,

        budget: {

          ...budget.toObject(),

          ...stats,

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

/*
━━━━━━━━━━━━━━━━━━━
DELETE BUDGET
━━━━━━━━━━━━━━━━━━━
*/
export const deleteBudget =
  async (req, res) => {

    try {

      const budget =
        await Budget.findOne({

          _id:
            req.params.id,

          user:
            req.user._id,

        })

        .populate(
          "category"
        );

      if (!budget) {

        return res.status(404).json({

          success: false,

          message:
            "Budget not found",

        });

      }

      const user =
  await updateGamification(
    req.user._id,
    {
      xp: -25,
      budgets: -1,
    }
  );

await addActivity({

  userId:
    req.user._id,

  type:
    "budget_delete",

  title:
    "Menghapus Budget",

  description:
    budget.category?.name,

});

await budget.deleteOne();

res.json({

  success: true,

  message:
    "Budget deleted successfully",

  user: {

    xp:
      user.xp,

    level:
      user.level,

    achievements:
      user.achievements,

    stats:
      user.stats,

  },

});

    } catch (error) {

      console.log(
        "DELETE BUDGET ERROR:"
      );

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };
