// src/lib/getAchievementProgress.js

export function getAchievementProgress(

  achievement,

  stats = {}

) {

  /*
  ━━━━━━━━━━━━━━━━━━━
  VALIDATION
  ━━━━━━━━━━━━━━━━━━━
  */
  if (
    !achievement ||
    !achievement.type
  ) {

    return {

      current: 0,

      target: 1,

      progress: 0,

      completed: false,

    };

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  RAW CURRENT
  ━━━━━━━━━━━━━━━━━━━
  */
  const rawCurrent =

    stats[
      achievement.type
    ] || 0;

  /*
  ━━━━━━━━━━━━━━━━━━━
  TARGET
  ━━━━━━━━━━━━━━━━━━━
  */
  const target =
    achievement.target || 1;

  /*
  ━━━━━━━━━━━━━━━━━━━
  CLAMP CURRENT
  ━━━━━━━━━━━━━━━━━━━
  */
  const current =
    Math.min(
      rawCurrent,
      target
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  PROGRESS
  ━━━━━━━━━━━━━━━━━━━
  */
  const progress =
    Math.min(

      (
        rawCurrent /
        target
      ) * 100,

      100

    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  COMPLETED
  ━━━━━━━━━━━━━━━━━━━
  */
  const completed =
    rawCurrent >=
    target;

  return {

    current,

    target,

    progress,

    completed,

  };

}