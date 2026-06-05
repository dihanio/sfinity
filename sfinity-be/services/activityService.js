import Activity
from "../models/Activity.js";

export const createActivity =
  async ({

    userId,

    type,

    title,

    description,

  }) => {

    await Activity.create({

      user: userId,

      type,

      title,

      description,

    });

  };