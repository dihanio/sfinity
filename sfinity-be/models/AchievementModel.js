import mongoose from "mongoose";

const achievementSchema =
  new mongoose.Schema({

    user: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    achievementId: String,

    unlockedAt: {
      type: Date,
      default: Date.now,
    },

  });

export default mongoose.model(
  "Achievement",
  achievementSchema
);