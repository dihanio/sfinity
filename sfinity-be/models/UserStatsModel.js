import mongoose from "mongoose";

const userStatsSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true,
      },

      transactions: {
        type: Number,
        default: 0,
      },

      scans: {
        type: Number,
        default: 0,
      },

      budgets: {
        type: Number,
        default: 0,
      },

      streak: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "UserStats",
  userStatsSchema
);