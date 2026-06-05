import User from "../models/UserModel.js";
import { calculateLevel } from "./calculateLevel.js";
import { checkAchievements } from "./checkAchievements.js";

export const updateGamification =
  async (
    userId,
    {
      xp = 0,
      transactions = 0,
      scans = 0,
      budgets = 0,
      missions = 0,
      streak = 0,

      articlesRead = 0,
      videosWatched = 0,
      challengesCompleted = 0,

      lastCheckinDate = null,
    }
  ) => {

    const user =
      await User.findById(userId);

    if (!user) return null;

    // XP
    // XP
user.xp =
  Math.max(
    0,
    user.xp + xp
  );

// STATS
user.stats.transactions =
  Math.max(
    0,
    user.stats.transactions +
    transactions
  );

user.stats.scans =
  Math.max(
    0,
    user.stats.scans +
    scans
  );

user.stats.budgets =
  Math.max(
    0,
    user.stats.budgets +
    budgets
  );

  user.stats.articlesRead =
  Math.max(
    0,
    (user.stats.articlesRead || 0) +
    articlesRead
  );

user.stats.videosWatched =
  Math.max(
    0,
    (user.stats.videosWatched || 0) +
    videosWatched
  );

user.stats.challengesCompleted =
  Math.max(
    0,
    (user.stats.challengesCompleted || 0) +
    challengesCompleted
  );

user.stats.missions =
  Math.max(
    0,
    user.stats.missions +
    missions
  );

user.stats.streak =
  Math.max(
    0,
    user.stats.streak +
    streak
  );

// LEVEL
user.level =
  calculateLevel(
    user.xp
  );

// ACHIEVEMENTS
user.achievements =
  checkAchievements(
    user
  );

    if (lastCheckinDate) {

  user.lastCheckinDate =
    lastCheckinDate;

}

   

    user.markModified(
      "stats"
    );

    await user.save();

    return user;

  };