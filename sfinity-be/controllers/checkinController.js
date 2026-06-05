import User from "../models/UserModel.js";
import Mission from "../models/Mission.js";

import {
  addActivity,
} from "../utils/addActivity.js";

import {
  updateGamification,
} from "../utils/updateGamification.js";

const getToday = () => {

  return new Date()
    .toISOString()
    .split("T")[0];

};

const getDiffDays = (
  oldDate,
  newDate,
) => {

  const diff =
    Math.abs(

      new Date(newDate) -
      new Date(oldDate)

    );

  return Math.floor(

    diff /

    (
      1000 *
      60 *
      60 *
      24
    )

  );

};

export const dailyCheckin =
  async (
    req,
    res,
  ) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });

      }

      const today =
        getToday();

      /*
      ALREADY CHECKED
      */
      if (
        user.lastCheckinDate ===
        today
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Sudah check-in hari ini",

        });

      }

      /*
      STREAK RESET
      */
      if (
        user.lastCheckinDate
      ) {

        const diffDays =
          getDiffDays(

            user.lastCheckinDate,
            today

          );

        if (
          diffDays > 1
        ) {

          user.stats.streak = 0;

        }

      }

      /*
      STREAK
      */
    const nextStreak =
  user.stats.streak + 1;

const xpReward =
  nextStreak % 7 === 0
    ? 60
    : 10;

const updatedUser =
  await updateGamification(
    req.user._id,
    {
      xp: xpReward,
      streak: 1,
      lastCheckinDate: today,
    }
  );
      /*
      MISSIONS
      */
      const missions =
        await Mission.find({

          user:
            req.user._id,

          completed:
            false,

          date:
            today,

        });

      for (
        const mission
        of missions
      ) {

        if (
          mission.type ===
          "checkin"
        ) {

          mission.progress += 1;

          if (
            mission.progress >=
            mission.requirement
          ) {

            mission.completed =
              true;

          }

          await mission.save();

        }

      }


      /*
      VERIFY SAVE
      */
      const verify =
        await User.findById(
          user._id
        );

      console.log(
        "========== VERIFY USER =========="
      );

      console.log({

        id:
          verify._id,

        xp:
          verify.xp,

        level:
          verify.level,

        streak:
          verify.stats.streak,

        lastCheckinDate:
          verify.lastCheckinDate,

        achievements:
          verify.achievements,

      });

      /*
      ACTIVITY
      */
      await addActivity({

  userId:
    req.user._id,

  type:
    "checkin",

  title:
    "Daily Check-in",

  description:
    `Streak ${updatedUser.stats.streak} hari 🔥`,

  xp:
    xpReward,

});

      return res.status(200).json({

        success: true,

        streak:
          updatedUser.stats.streak,

        xpReward,

        bonus:

          updatedUser.stats.streak % 7 === 0,

        user: {

          xp:
            updatedUser.xp,

          level:
            updatedUser.level,

          achievements:
            updatedUser.achievements,

          stats:
            updatedUser.stats,

          lastCheckinDate:
            updatedUser.lastCheckinDate,

        },

      });

    } catch (error) {

      console.error(
        "CHECKIN ERROR"
      );

      console.error(
        error
      );

      return res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };