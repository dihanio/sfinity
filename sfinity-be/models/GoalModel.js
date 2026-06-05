import mongoose
from "mongoose";

const goalSchema =
  new mongoose.Schema(

    {

      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "User",

        required:
          true,

      },

      title: {

        type:
          String,

        required:
          true,

        trim:
          true,

      },

      targetAmount: {

        type:
          Number,

        required:
          true,

      },

      currentAmount: {

        type:
          Number,

        default:
          0,

      },

      deadline: {

        type:
          Date,

      },

      completed: {

        type:
          Boolean,

        default:
          false,

      },

    },

    {
      timestamps:
        true,
    }

  );

export default
mongoose.model(
  "Goal",
  goalSchema
);