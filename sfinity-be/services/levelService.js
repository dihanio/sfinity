import {
  LEVELS,
} from "../constants/levels.js";

export const calculateLevel =
  (xp) => {

    let currentLevel = 1;

    for (
      let i = 0;
      i < LEVELS.length;
      i++
    ) {

      if (
        xp >=
        LEVELS[i].minXP
      ) {

        currentLevel =
          LEVELS[i].level;

      }

    }

    return currentLevel;

  };