import {
  levelData,
} from "@/data/levelData";

export function getLevelInfo(
  xp = 0
) {

  let currentLevel =
    levelData[0];

  let nextLevel =
    null;

  /*
    FIND LEVEL
  */
  for (
    let i =
      levelData.length - 1;

    i >= 0;

    i--
  ) {

    if (
      xp >=
      levelData[i].minXP
    ) {

      currentLevel =
        levelData[i];

      nextLevel =
        levelData[
          i + 1
        ] || null;

      break;
    }
  }

  /*
    CURRENT XP
  */
  const currentXP =
    xp -
    currentLevel.minXP;

  /*
    MAX LEVEL
  */
  if (!nextLevel) {

    return {

      ...currentLevel,

      currentXP,

      nextXP:
        currentLevel.minXP,

      progress: 100,
    };
  }

  /*
    LEVEL RANGE
  */
  const neededXP =
    nextLevel.minXP -
    currentLevel.minXP;

  /*
    PROGRESS
  */
  const progress =
    Math.min(
      (
        currentXP /
        neededXP
      ) * 100,
      100
    );

  return {

    ...currentLevel,

    currentXP,

    nextXP:
      nextLevel.minXP,

    progress,

    nextLevel,
  };
}