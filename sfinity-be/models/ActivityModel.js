import mongoose
from "mongoose";

const activitySchema =
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

      type: {

        type:
          String,

        required:
          true,

      },

      title: {

        type:
          String,

        required:
          true,

      },

      description: {

        type:
          String,

        default:
          "",

      },

      xp: {

        type:
          Number,

        default:
          0,

      },

      metadata: {

        merchant:
          String,

        category:
          String,

        amount:
          Number,

      },

    },

    {

      timestamps:
        true,

    }

  );

const Activity =
  mongoose.model(

    "Activity",

    activitySchema

  );

export default Activity;