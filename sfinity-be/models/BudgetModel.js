import mongoose
from "mongoose";

const budgetSchema =
  new mongoose.Schema(

    {

      /*
      USER
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
      CATEGORY
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
      LIMIT
      */
      limit: {

        type:
          Number,

        required:
          true,

        min:
          0,

      },

      /*
      MONTH
      */
      month: {

        type:
          Number,

        required:
          true,

      },

      /*
      YEAR
      */
      year: {

        type:
          Number,

        required:
          true,

      },

      /*
      ━━━━━━━━━━━━━━━━━━━
      AUTO ANALYTICS
      ━━━━━━━━━━━━━━━━━━━
      */

      spent: {

        type:
          Number,

        default:
          0,

      },

      remaining: {

        type:
          Number,

        default:
          0,

      },

      percentage: {

        type:
          Number,

        default:
          0,

      },

      status: {

        type:
          String,

        enum: [

          "safe",

          "warning",

          "danger",

        ],

        default:
          "safe",

      },

    },

    {

      timestamps: true,

    }

  );

/*
UNIQUE
*/
budgetSchema.index({

  user: 1,

  category: 1,

  month: 1,

  year: 1,

}, {

  unique: true,

});

const Budget =
  mongoose.model(

    "Budget",

    budgetSchema

  );

export default Budget;