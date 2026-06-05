import mongoose
from "mongoose";

const receiptSchema =
  new mongoose.Schema(

    {

      /*
      ━━━━━━━━━━━━━━━━━━━
      USER
      ━━━━━━━━━━━━━━━━━━━
      */
      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "User",

        required:
          true,

      },

      /*
      ━━━━━━━━━━━━━━━━━━━
      MERCHANT
      ━━━━━━━━━━━━━━━━━━━
      */
      merchant: {

        type:
          String,

        required:
          true,

        trim:
          true,

      },

      /*
      ━━━━━━━━━━━━━━━━━━━
      TOTAL
      ━━━━━━━━━━━━━━━━━━━
      */
      total: {

        type:
          Number,

        required:
          true,

      },

      /*
      ━━━━━━━━━━━━━━━━━━━
      CATEGORY
      ━━━━━━━━━━━━━━━━━━━
      */
      category: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Category",

        required:
          true,

      },

      /*
      ━━━━━━━━━━━━━━━━━━━
      RAW TEXT
      ━━━━━━━━━━━━━━━━━━━
      */
      rawText: {

        type:
          String,

        default:
          "",

      },

      /*
      ━━━━━━━━━━━━━━━━━━━
      IMAGE
      ━━━━━━━━━━━━━━━━━━━
      */
      image: {

        type:
          String,

        default:
          "",

      },

      transaction: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Transaction",

      },

    },

    {

      timestamps: true,

    }

  );

const Receipt =
  mongoose.model(

    "Receipt",

    receiptSchema

  );

export default Receipt;