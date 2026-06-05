import mongoose
from "mongoose";

const transactionSchema =
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
      TYPE
      ━━━━━━━━━━━━━━━━━━━
      */
      type: {

        type:
          String,

        enum: [

          "income",

          "expense",

        ],

        required:
          true,

      },

      /*
      ━━━━━━━━━━━━━━━━━━━
      TITLE
      ━━━━━━━━━━━━━━━━━━━
      */
      title: {

        type:
          String,

        required:
          true,

        trim:
          true,

        maxlength:
          100,

      },

      /*
      ━━━━━━━━━━━━━━━━━━━
      AMOUNT
      ━━━━━━━━━━━━━━━━━━━
      */
      amount: {

        type:
          Number,

        required:
          true,

        min:
          1,

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
      NOTE
      ━━━━━━━━━━━━━━━━━━━
      */
      note: {

        type:
          String,

        default:
          "",

        trim:
          true,

        maxlength:
          500,

      },

      /*
      ━━━━━━━━━━━━━━━━━━━
      DATE
      ━━━━━━━━━━━━━━━━━━━
      */
      date: {

        type:
          Date,

        default:
          Date.now,

      },

      /*
      ━━━━━━━━━━━━━━━━━━━
      MONTH
      ━━━━━━━━━━━━━━━━━━━
      */
      month: {

        type:
          Number,

      },

      /*
      ━━━━━━━━━━━━━━━━━━━
      YEAR
      ━━━━━━━━━━━━━━━━━━━
      */
      year: {

        type:
          Number,

      },

    },

    {

      timestamps: true,

    }

  );

/*
━━━━━━━━━━━━━━━━━━━
AUTO GENERATE
MONTH & YEAR
━━━━━━━━━━━━━━━━━━━
*/
// transactionSchema.pre(

//   "save",

//   function(next) {

//     const transactionDate =
//       new Date(this.date);

//     this.month =
//       transactionDate.getMonth() + 1;

//     this.year =
//       transactionDate.getFullYear();

//     next();

//   }

// );

/*
━━━━━━━━━━━━━━━━━━━
INDEXES
━━━━━━━━━━━━━━━━━━━
*/
transactionSchema.index({

  user: 1,

  type: 1,

});

transactionSchema.index({

  user: 1,

  category: 1,

});

transactionSchema.index({

  user: 1,

  month: 1,

  year: 1,

});

transactionSchema.index({

  user: 1,

  date: -1,

});

/*
━━━━━━━━━━━━━━━━━━━
MODEL
━━━━━━━━━━━━━━━━━━━
*/
const Transaction =
  mongoose.model(

    "Transaction",

    transactionSchema

  );

export default Transaction;