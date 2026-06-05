import {
  achievementList,
} from "../data/achievementData.js";

export const checkAchievements =
  (user) => {

    const unlocked = [];

    achievementList.forEach(
      (achievement) => {

        let current = 0;

        if (
          achievement.type ===
          "level"
        ) {

          current =
            user.level || 1;

        } else {

          current =
            user.stats?.[
              achievement.type
            ] || 0;

        }

        if (
          current >=
          achievement.target
        ) {

          unlocked.push(
            achievement.id
          );

        }

      }
    );

    return unlocked;

  };