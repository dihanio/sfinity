import Activity
from "../models/ActivityModel.js";

export async function addActivity({
  userId,
  type,
  title,
  description,
  xp = 0,
}) {

  console.log(
    "CREATE ACTIVITY USER:",
    userId
  );

  const activity =
    await Activity.create({
      user: userId,
      type,
      title,
      description,
      xp,
    });

  console.log(
    "ACTIVITY SAVED:",
    activity._id
  );

  return activity;
}