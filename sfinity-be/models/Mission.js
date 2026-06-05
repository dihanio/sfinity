import mongoose
from "mongoose";

const missionSchema =
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

      /*
      ━━━━━━━━━━━━━━━━━━━
      MISSION
      ━━━━━━━━━━━━━━━━━━━
      */
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

      /*
      transaction
      goal
      budget
      health
      */
      type: {

        type:
          String,

        required:
          true,

      },

      /*
      TARGET
      */
      requirement: {

        type:
          Number,

        default:
          1,

      },

      /*
      CURRENT PROGRESS
      */
      progress: {

        type:
          Number,

        default:
          0,

      },

      completed: {

        type:
          Boolean,

        default:
          false,

      },

      /*
      XP REWARD
      */
      xpReward: {

        type:
          Number,

        default:
          20,

      },

      /*
      DAILY KEY
      */
      date: {

        type:
          String,

        required:
          true,

      },

    },

    {

      timestamps:
        true,

    }

  );

export default mongoose.model(
  "Mission",
  missionSchema
);