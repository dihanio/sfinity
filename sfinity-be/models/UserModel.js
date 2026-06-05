import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    /*
    ━━━━━━━━━━━━━━━━━━━
    GAMIFICATION
    ━━━━━━━━━━━━━━━━━━━
    */
    xp: {
      type: Number,
      default: 0,
    },

    level: {
      type: Number,
      default: 1,
    },

    achievements: {
      type: [String],
      default: [],
    },

    /*
    ━━━━━━━━━━━━━━━━━━━
    DAILY CHECK-IN
    ━━━━━━━━━━━━━━━━━━━
    */
    lastCheckinDate: {
      type: String,
      default: null,
    },

    /*
    ━━━━━━━━━━━━━━━━━━━
    STATS
    ━━━━━━━━━━━━━━━━━━━
    */
    stats: {
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

      missions: {
        type: Number,
        default: 0,
      },

      articlesRead: {
        type: Number,
        default: 0,
      },

      videosWatched: {
        type: Number,
        default: 0,
      },

      challengesCompleted: {
        type: Number,
        default: 0,
      },
    },

    readArticles: {
      type: [String],
      default: [],
    },

    watchedVideos: {
      type: [String],
      default: [],
    },

    activeChallenges: {
      type: [String],
      default: [],
    },

    viewedTips: {
      type: [String],
      default: [],
    },

    completedChallenges: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    userSchema
  );

export default User;