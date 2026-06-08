import User
from "../models/UserModel.js";

import {
  calculateLevel,
} from "./levelService.js";

export const addXP =
  async (

    userId,

    amount

  ) => {

    const user =
      await User.findById(
        userId
      );

    if (!user) return;

    /*
    XP
    */
    user.xp += amount;

    /*
    LEVEL
    */
    user.level =
      calculateLevel(
        user.xp
      );

    await user.save();

    return user;

  };