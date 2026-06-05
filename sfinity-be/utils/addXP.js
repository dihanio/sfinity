import User
from "../models/UserModel.js";

import {
  getLevelInfo,
} from "./getLevelInfo.js";

export async function addXP(

  userId,

  amount

) {

  /*
  ━━━━━━━━━━━━━━━━━━━
  FIND USER
  ━━━━━━━━━━━━━━━━━━━
  */
  const user =
    await User.findById(
      userId
    );

  if (!user) return;

  /*
  ━━━━━━━━━━━━━━━━━━━
  OLD DATA
  ━━━━━━━━━━━━━━━━━━━
  */
  const oldXP =
    user.xp;

  const oldLevel =
    user.level;

  /*
  ━━━━━━━━━━━━━━━━━━━
  ADD XP
  ━━━━━━━━━━━━━━━━━━━
  */
  user.xp += amount;

  /*
  ━━━━━━━━━━━━━━━━━━━
  NEW LEVEL
  ━━━━━━━━━━━━━━━━━━━
  */
  const newLevel =
    getLevelInfo(
      user.xp
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  LEVEL UP
  ━━━━━━━━━━━━━━━━━━━
  */
  if (
    newLevel >
    oldLevel
  ) {

    user.level =
      newLevel;

  }

  await user.save();

  return {

    oldXP,

    newXP:
      user.xp,

    oldLevel,

    newLevel,

  };

}