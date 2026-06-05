import Category
from "../models/CategoryModel.js";

import Transaction
from "../models/TransactionModel.js";

import Budget
from "../models/BudgetModel.js";

/*
━━━━━━━━━━━━━━━━━━━
GET CATEGORIES
━━━━━━━━━━━━━━━━━━━
*/
export const getCategories =
  async (req, res) => {

    try {

      const categories =
        await Category.find({

          user:
            req.user._id,

        }).sort({

          createdAt: -1,

        });

      res.json({

        success: true,

        categories,

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
CREATE CATEGORY
━━━━━━━━━━━━━━━━━━━
*/
export const createCategory =
  async (req, res) => {

    try {

      let {

        name,

        type,

      } = req.body;

      /*
      VALIDATION
      */
      if (
        !name ||
        !type
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Name and type required",

        });

      }

      /*
      VALID TYPE
      */
      if (

        type !== "income" &&

        type !== "expense"

      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid category type",

        });

      }

      /*
      NORMALIZE
      */
      name =
        name.trim();

      /*
      CHECK DUPLICATE
      */
      const exists =
        await Category.findOne({

          user:
            req.user._id,

          type,

          name: {

            $regex:
              new RegExp(
                `^${name}$`,
                "i"
              ),

          },

        });

      if (exists) {

        return res.status(400).json({

          success: false,

          message:
            "Category already exists",

        });

      }

      /*
      CREATE
      */
      const category =
        await Category.create({

          user:
            req.user._id,

          name,

          type,

        });

      res.status(201).json({

        success: true,

        category,

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
UPDATE CATEGORY
━━━━━━━━━━━━━━━━━━━
*/
export const updateCategory =
  async (req, res) => {

    try {

      let {

        name,

        type,

      } = req.body;

      /*
      VALIDATION
      */
      if (
        !name ||
        !type
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Name and type required",

        });

      }

      /*
      FIND
      */
      const category =
        await Category.findById(
          req.params.id
        );

      if (!category) {

        return res.status(404).json({

          success: false,

          message:
            "Category not found",

        });

      }

      /*
      OWNER
      */
      if (

        category.user.toString() !==
        req.user._id.toString()

      ) {

        return res.status(401).json({

          success: false,

          message:
            "Not authorized",

        });

      }

      /*
      NORMALIZE
      */
      name =
        name.trim();

      /*
      DUPLICATE
      */
      const exists =
        await Category.findOne({

          _id: {
            $ne:
              category._id,
          },

          user:
            req.user._id,

          type,

          name: {

            $regex:
              new RegExp(
                `^${name}$`,
                "i"
              ),

          },

        });

      if (exists) {

        return res.status(400).json({

          success: false,

          message:
            "Category already exists",

        });

      }

      /*
      UPDATE
      */
      category.name =
        name;

      category.type =
        type;

      const updated =
        await category.save();

      res.json({

        success: true,

        category:
          updated,

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
DELETE CATEGORY
━━━━━━━━━━━━━━━━━━━
*/
export const deleteCategory =
  async (req, res) => {

    try {

      /*
      FIND
      */
      const category =
        await Category.findById(
          req.params.id
        );

      if (!category) {

        return res.status(404).json({

          success: false,

          message:
            "Category not found",

        });

      }

      /*
      OWNER
      */
      if (

        category.user.toString() !==
        req.user._id.toString()

      ) {

        return res.status(401).json({

          success: false,

          message:
            "Not authorized",

        });

      }

      /*
      CHECK TRANSACTIONS
      */
      const transactions =
        await Transaction.find({

          user:
            req.user._id,

          category:
            category._id,

        });

      if (
        transactions.length > 0
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Category masih digunakan transaksi",

        });

      }

      /*
      DELETE BUDGETS
      */
      await Budget.deleteMany({

        user:
          req.user._id,

        category:
          category._id,

      });

      /*
      DELETE CATEGORY
      */
      await category.deleteOne();

      res.json({

        success: true,

        message:
          "Category deleted",

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