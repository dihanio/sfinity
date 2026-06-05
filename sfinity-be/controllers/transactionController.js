import Transaction from "../models/TransactionModel.js";
import Category from "../models/CategoryModel.js";
import Receipt from "../models/ReceiptModel.js";

import {
  recalculateBudget,
} from "../utils/recalculateBudget.js";

import {
  updateGamification,
} from "../utils/updateGamification.js";

import {
  addActivity,
} from "../utils/addActivity.js";


/*
━━━━━━━━━━━━━━━━━━━
CREATE TRANSACTION
━━━━━━━━━━━━━━━━━━━
*/
export const createTransaction = async (req, res) => {
  try {
    console.log("========== CREATE TRANSACTION ==========");
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const {
      type,
      title,
      amount,
      category,
      note,
      date,
    } = req.body;

    if (
      !type ||
      !title ||
      !amount ||
      !category ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    console.log("STEP 1 - CHECK CATEGORY");

    const categoryData =
      await Category.findOne({
        _id: category,
        user: req.user._id,
      });

    console.log("CATEGORY:", categoryData);

    if (!categoryData) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (
      type !== "income" &&
      type !== "expense"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction type",
      });
    }

    if (
      categoryData.type !== type
    ) {
      return res.status(400).json({
        success: false,
        message: "Category type mismatch",
      });
    }

    const txDate =
      new Date(date);

    const month =
      txDate.getMonth() + 1;

    const year =
      txDate.getFullYear();

    console.log("STEP 2 - CREATE TRANSACTION");

    const transaction =
      await Transaction.create({
        user: req.user._id,
        type,
        title: title.trim(),
        amount,
        category,
        note,
        date,
        month,
        year,
      });

    console.log(
      "TRANSACTION CREATED:",
      transaction._id
    );

    await transaction.populate(
      "category"
    );

    console.log(
      "STEP 3 - RECALCULATE BUDGET"
    );

    try {
      await recalculateBudget({
        userId: req.user._id,
        categoryId: category,
        month,
        year,
      });

      console.log(
        "RECALCULATE SUCCESS"
      );
    } catch (err) {
      console.error(
        "RECALCULATE ERROR:",
        err
      );
      throw err;
    }

    console.log(
      "STEP 4 - UPDATE GAMIFICATION"
    );

    let user = null;

    try {
      user =
        await updateGamification(
          req.user._id,
          {
            xp: 15,
            transactions: 1,
          }
        );

      console.log(
        "GAMIFICATION SUCCESS:",
        user
      );
    } catch (err) {
      console.error(
        "GAMIFICATION ERROR:",
        err
      );
      throw err;
    }

    console.log(
      "STEP 5 - ADD ACTIVITY"
    );

    try {
      await addActivity({
        userId:
          req.user._id,

        type:
          "transaction",

        title:
          "Membuat Transaksi",

        description:
          `${title} • Rp ${Number(amount).toLocaleString("id-ID")}`,

        xp: 15,
      });

      console.log(
        "ACTIVITY SUCCESS"
      );
    } catch (err) {
      console.error(
        "ACTIVITY ERROR:",
        err
      );
      throw err;
    }

    console.log(
      "STEP 6 - SEND RESPONSE"
    );

    return res.status(201).json({
      success: true,
      transaction,

      user: user
        ? {
            xp: user.xp,
            level: user.level,
            achievements:
              user.achievements,
            stats:
              user.stats,
          }
        : null,
    });

  } catch (error) {

    console.error(
      "CREATE TRANSACTION ERROR"
    );

    console.error(error);

    console.error(
      error.stack
    );

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });

  }
};

/*
━━━━━━━━━━━━━━━━━━━
GET TRANSACTIONS
━━━━━━━━━━━━━━━━━━━
*/
export const getTransactions =
  async (req, res) => {

    try {

      const transactions =
        await Transaction.find({

          user:
            req.user._id,

        })
          .populate("category")
          .sort({
            createdAt: -1,
          });

      res.json({

        success: true,

        transactions,

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
GET SINGLE
━━━━━━━━━━━━━━━━━━━
*/
export const getTransactionById =
  async (req, res) => {

    try {

      const transaction =
        await Transaction.findById(

          req.params.id

        ).populate(

          "category",

          "name type"

        );

      /*
      ━━━━━━━━━━━━━━━━━━━
      NOT FOUND
      ━━━━━━━━━━━━━━━━━━━
      */
      if (!transaction) {

        return res.status(404).json({

          success: false,

          message:
            "Transaction not found",

        });

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      OWNER CHECK
      ━━━━━━━━━━━━━━━━━━━
      */
      if (

        transaction.user.toString() !==
        req.user._id.toString()

      ) {

        return res.status(401).json({

          success: false,

          message:
            "Not authorized",

        });

      }

      res.json({

        success: true,

        transaction,

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
UPDATE TRANSACTION
━━━━━━━━━━━━━━━━━━━
*/
export const updateTransaction =
  async (req, res) => {

    try {

      const transaction =
        await Transaction.findOne({

          _id:
            req.params.id,

          user:
            req.user._id,

        });

      if (!transaction) {

        return res.status(404).json({

          success: false,

          message:
            "Transaction not found",

        });

      }

      const oldCategory =
        transaction.category;

      const oldMonth =
        transaction.month;

      const oldYear =
        transaction.year;

      const categoryId =
        req.body.category ??
        transaction.category;

      const categoryData =
        await Category.findOne({

          _id:
            categoryId,

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

      const type =
        req.body.type ??
        transaction.type;
if (

  type !== "income" &&

  type !== "expense"

) {

  return res.status(400).json({

    success: false,

    message:
      "Invalid transaction type",

  });

}
      if (
        categoryData.type !== type
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Category type mismatch",

        });

      }

      if (

        req.body.amount !==
        undefined &&

        Number(
          req.body.amount
        ) <= 0

      ) {

        return res.status(400).json({

          success: false,

          message:
            "Amount must be greater than 0",

        });

      }

      let month =
        transaction.month;

      let year =
        transaction.year;

      if (req.body.date) {

        const newDate =
          new Date(
            req.body.date
          );

        month =
          newDate.getMonth() + 1;

        year =
          newDate.getFullYear();

      }

      transaction.title =
        req.body.title?.trim() ??
        transaction.title;

      transaction.amount =
        req.body.amount ??
        transaction.amount;

      transaction.type =
        req.body.type ??
        transaction.type;

      transaction.category =
        categoryId;

      transaction.note =
        req.body.note ??
        transaction.note;

      transaction.date =
        req.body.date ??
        transaction.date;

      transaction.month =
        month;

      transaction.year =
        year;

      await transaction.save();

      await transaction.populate(
        "category"
      );

      await recalculateBudget({

        userId:
          req.user._id,

        categoryId:
          oldCategory,

        month:
          oldMonth,

        year:
          oldYear,

      });

      await recalculateBudget({

        userId:
          req.user._id,

        categoryId:
          transaction.category._id,

        month:
          transaction.month,

        year:
          transaction.year,

      });

      await addActivity({

        userId:
          req.user._id,

        type:
          "transaction_update",

        title:
          "Update Transaksi",

        description:
`${transaction.title} • Rp ${transaction.amount.toLocaleString("id-ID")}`

      });

      res.json({

        success: true,

        transaction,

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
DELETE TRANSACTION
━━━━━━━━━━━━━━━━━━━
*/
export const deleteTransaction =
  async (req, res) => {

    try {

      const transaction =
        await Transaction.findOne({

          _id:
            req.params.id,

          user:
            req.user._id,

        })
        .populate(
          "category"
        );

      if (!transaction) {

        return res.status(404).json({

          success: false,

          message:
            "Transaction not found",

        });

      }

      const user =
        await updateGamification(
          req.user._id,
          {
            xp: -15,
            transactions: -1,
          }
        );

      /*
      ━━━━━━━━━━━━━━━━━━━
      DELETE LINKED RECEIPT
      ━━━━━━━━━━━━━━━━━━━
      */
      await Receipt.deleteOne({
        transaction: transaction._id,
        user: req.user._id,
      });

      await transaction.deleteOne();
      await recalculateBudget({

        userId:
          req.user._id,

        categoryId:
          transaction.category._id,

        month:
          transaction.month,

        year:
          transaction.year,

      });

      await addActivity({

        userId:
          req.user._id,

        type:
          "transaction_delete",

        title:
          "Menghapus Transaksi",

        description:
`${transaction.title} • Rp ${transaction.amount.toLocaleString("id-ID")}`

      });

      

      res.json({

        success: true,

        message:
          "Transaction deleted successfully",

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