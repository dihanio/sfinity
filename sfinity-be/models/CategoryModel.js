import mongoose
from "mongoose";

const categorySchema =
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
      NAME
      ━━━━━━━━━━━━━━━━━━━
      */
      name: {

        type:
          String,

        required:
          true,

        trim:
          true,

        lowercase:
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

    },

    {

      timestamps: true,

    }

  );

/*
━━━━━━━━━━━━━━━━━━━
UNIQUE CATEGORY
━━━━━━━━━━━━━━━━━━━
*/
categorySchema.index(

  {

    user: 1,

    name: 1,

  },

  {

    unique: true,

  }

);

/*
━━━━━━━━━━━━━━━━━━━
MODEL
━━━━━━━━━━━━━━━━━━━
*/
const Category =
  mongoose.model(

    "Category",

    categorySchema

  );

export default Category;