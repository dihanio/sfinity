import Receipt
from "../models/ReceiptModel.js";

import Transaction
from "../models/TransactionModel.js";

import Category
from "../models/CategoryModel.js";

import {
  recalculateBudget,
} from "../utils/recalculateBudget.js";

import {
  updateGamification,
} from "../utils/updateGamification.js";
import {
  addActivity,
} from "../utils/addActivity.js";

import User
from "../models/UserModel.js";

/*
━━━━━━━━━━━━━━━━━━━
GET RECEIPTS
━━━━━━━━━━━━━━━━━━━
*/
export const getReceipts =
  async (req, res) => {

    try {

      const receipts =
        await Receipt.find({

          user:
            req.user._id,

        })

        .populate(

          "category",

          "name type"

        )

        .sort({

          createdAt: -1,

        });

      res.json({

        success: true,

        receipts,

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
CREATE RECEIPT
━━━━━━━━━━━━━━━━━━━
*/
export const createReceipt =
  async (req, res) => {

    try {

      const {

        merchant,

        total,

        category,

        image,

        date,

      } = req.body;

      /*
      ━━━━━━━━━━━━━━━━━━━
      VALIDATION
      ━━━━━━━━━━━━━━━━━━━
      */
      if (

        !merchant ||
        !total ||
        !category

      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please fill all fields",

        });

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      VALID AMOUNT
      ━━━━━━━━━━━━━━━━━━━
      */
      if (total <= 0) {

        return res.status(400).json({

          success: false,

          message:
            "Total must be greater than 0",

        });

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      CHECK CATEGORY
      ━━━━━━━━━━━━━━━━━━━
      */
      const categoryExists =
        await Category.findOne({

          _id:
            category,

          user:
            req.user._id,

        });

      if (!categoryExists) {

        return res.status(404).json({

          success: false,

          message:
            "Category not found",

        });

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      RECEIPT DATE
      ━━━━━━━━━━━━━━━━━━━
      */
      const receiptDate =
        date
          ? new Date(date)
          : new Date();

      const month =
        receiptDate.getMonth() + 1;

      const year =
        receiptDate.getFullYear();

      /*
      ━━━━━━━━━━━━━━━━━━━
      CREATE RECEIPT
      ━━━━━━━━━━━━━━━━━━━
      */
      /*
      ━━━━━━━━━━━━━━━━━━━
      AUTO CREATE TRANSACTION
      ━━━━━━━━━━━━━━━━━━━
      */
      const transaction =
        await Transaction.create({

          user:
            req.user._id,

          type:
            "expense",

          title:
            merchant.trim(),

          amount:
            total,

          category,

          note:
            "Auto generated from receipt scan",

          date:
            receiptDate,

          month,

          year,

        });

      /*
      ━━━━━━━━━━━━━━━━━━━
      CREATE RECEIPT
      ━━━━━━━━━━━━━━━━━━━
      */
      const receipt =
        await Receipt.create({

          user:
            req.user._id,

          merchant:
            merchant.trim(),

          total,

          category,

          image,

          date:
            receiptDate,

          transaction:
            transaction._id,

        });

      /*
      ━━━━━━━━━━━━━━━━━━━
      POPULATE
      ━━━━━━━━━━━━━━━━━━━
      */
      await receipt.populate(

        "category",

        "name type"

      );

      await transaction.populate(

        "category",

        "name type"

      );

      /*
      ━━━━━━━━━━━━━━━━━━━
      RECALCULATE BUDGET
      ━━━━━━━━━━━━━━━━━━━
      */
      await recalculateBudget({

        userId:
          req.user._id,

        categoryId:
          category,

        month,

        year,

      });
      const user = await updateGamification(
        req.user._id,
        {
          xp: 20,
          scans: 1,
        }
      );

      /*
      ━━━━━━━━━━━━━━━━━━━
      ACTIVITY
      ━━━━━━━━━━━━━━━━━━━
      */
      await addActivity({
        userId: req.user._id,
        type: "scan",
        title: "Receipt berhasil discan",
        description: `${merchant} • Rp ${Number(total).toLocaleString("id-ID")}`,
        xp: 20,
      });

      /*
      ━━━━━━━━━━━━━━━━━━━
      RESPONSE
      ━━━━━━━━━━━━━━━━━━━
      */
      res.status(201).json({
        success: true,
        receipt,
        transaction,
        user,
      });

    } catch (error) {

      console.log(
        "CREATE RECEIPT ERROR:"
      );

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
DELETE RECEIPT
━━━━━━━━━━━━━━━━━━━
*/
export const deleteReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found",
      });
    }

    if (receipt.transaction) {
      const transaction = await Transaction.findOne({
        _id: receipt.transaction,
        user: req.user._id,
      });

      if (transaction) {
        await transaction.deleteOne();
        await recalculateBudget({
          userId: req.user._id,
          categoryId: transaction.category,
          month: transaction.month,
          year: transaction.year,
        });
      }
    }

    const user = await updateGamification(req.user._id, {
      xp: -20,
      scans: -1,
    });

    await addActivity({
      userId: req.user._id,
      type: "scan_delete",
      title: "Menghapus Scan Struk",
      description: `${receipt.merchant} • Rp ${Number(receipt.total).toLocaleString("id-ID")}`,
    });

    await receipt.deleteOne();

    res.json({
      success: true,
      message: "Receipt and linked transaction deleted successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
━━━━━━━━━━━━━━━━━━━
UPDATE RECEIPT
━━━━━━━━━━━━━━━━━━━
*/
export const updateReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found",
      });
    }

    const { merchant, total, category } = req.body;

    if (merchant) receipt.merchant = merchant.trim();

    let oldCategory = null;
    let oldMonth = null;
    let oldYear = null;
    let transaction = null;

    if (receipt.transaction) {
      transaction = await Transaction.findOne({
        _id: receipt.transaction,
        user: req.user._id,
      });
      if (transaction) {
        oldCategory = transaction.category;
        oldMonth = transaction.month;
        oldYear = transaction.year;
      }
    }

    if (total !== undefined) {
      if (Number(total) <= 0) {
        return res.status(400).json({
          success: false,
          message: "Total must be greater than 0",
        });
      }
      receipt.total = Number(total);
      if (transaction) {
        transaction.amount = Number(total);
      }
    }

    if (category) {
      const categoryData = await Category.findOne({
        _id: category,
        user: req.user._id,
      });

      if (!categoryData) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      receipt.category = category;
      if (transaction) {
        transaction.category = category;
      }
    }

    if (merchant && transaction) {
      transaction.title = merchant.trim();
    }

    await receipt.save();
    await receipt.populate("category", "name type");

    if (transaction) {
      await transaction.save();
      await transaction.populate("category", "name type");

      // Recalculate budgets
      await recalculateBudget({
        userId: req.user._id,
        categoryId: oldCategory,
        month: oldMonth,
        year: oldYear,
      });

      await recalculateBudget({
        userId: req.user._id,
        categoryId: transaction.category._id,
        month: transaction.month,
        year: transaction.year,
      });
    }

    await addActivity({
      userId: req.user._id,
      type: "scan_update",
      title: "Update Scan Struk",
      description: `${receipt.merchant} • Rp ${Number(receipt.total).toLocaleString("id-ID")}`,
    });

    res.json({
      success: true,
      receipt,
      transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};