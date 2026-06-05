import {
  achievementList,
} from "../data/achievementData.js";

export function checkAchievements(
  user
) {

  const unlocked = [];

  achievementList.forEach(
    (achievement) => {

      let current = 0;

      /*
      ━━━━━━━━━━━━━━━━━━━
      LEVEL
      ━━━━━━━━━━━━━━━━━━━
      */
      if (
        achievement.type ===
        "level"
      ) {

        current =
          user.level || 1;

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      OTHER STATS
      ━━━━━━━━━━━━━━━━━━━
      */
      else {

        current =

          user.stats?.[
            achievement.type
          ] || 0;

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      COMPLETE
      ━━━━━━━━━━━━━━━━━━━
      */
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

}