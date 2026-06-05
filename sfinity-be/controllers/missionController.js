import Mission
from "../models/Mission.js";

import User
from "../models/UserModel.js";

import {
  MISSION_POOL,
} from "../constants/missionPool.js";

import {
  calculateLevel,
} from "../utils/calculateLevel.js";

import {
  checkAchievements,
} from "../utils/checkAchievements.js";

import {
  addActivity,
} from "../utils/addActivity.js";

/*
━━━━━━━━━━━━━━━━━━━
GET TODAY
━━━━━━━━━━━━━━━━━━━
*/
const getToday =
  () => {

    return new Date()

      .toISOString()

      .split("T")[0];

  };

/*
━━━━━━━━━━━━━━━━━━━
GENERATE DAILY MISSIONS
━━━━━━━━━━━━━━━━━━━
*/
export const generateDailyMissions =
  async (
    req,
    res,
  ) => {

    try {

      const today =
        getToday();

      /*
      ━━━━━━━━━━━━━━━━━━━
      CHECK EXISTING
      ━━━━━━━━━━━━━━━━━━━
      */
      const existing =
        await Mission.find({

          user:
            req.user._id,

          date:
            today,

        }).sort({

          createdAt: 1,

        });

      /*
      ━━━━━━━━━━━━━━━━━━━
      ALREADY GENERATED
      ━━━━━━━━━━━━━━━━━━━
      */
      if (
        existing.length > 0
      ) {

        return res.status(200).json({

          success: true,

          refreshed: false,

          missions:
            existing,

        });

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      RANDOMIZE
      ━━━━━━━━━━━━━━━━━━━
      */
      const shuffled =

        [...MISSION_POOL]

          .sort(
            () =>
              Math.random() - 0.5
          )

          .slice(0, 3);

      /*
      ━━━━━━━━━━━━━━━━━━━
      CREATE MISSIONS
      ━━━━━━━━━━━━━━━━━━━
      */
      const missions =

        await Promise.all(

          shuffled.map(

            (mission) =>

              Mission.create({

                user:
                  req.user._id,

                title:
                  mission.title,

                description:
                  mission.description,

                type:
                  mission.type,

                requirement:
                  mission.requirement,

                xpReward:
                  mission.xpReward,

                progress: 0,

                completed:
                  false,

                claimed:
                  false,

                date:
                  today,

              })

          )

        );

      /*
      ━━━━━━━━━━━━━━━━━━━
      USER
      ━━━━━━━━━━━━━━━━━━━
      */
      const user =
        await User.findById(
          req.user._id
        );

      /*
      ━━━━━━━━━━━━━━━━━━━
      INIT STATS
      ━━━━━━━━━━━━━━━━━━━
      */
      if (!user.stats) {

        user.stats = {

          transactions: 0,

          scans: 0,

          budgets: 0,

          streak: 0,

          missions: 0,

        };

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      DAILY STREAK
      ━━━━━━━━━━━━━━━━━━━
      */
      user.stats.streak += 1;

      /*
      ━━━━━━━━━━━━━━━━━━━
      XP BONUS
      ━━━━━━━━━━━━━━━━━━━
      */
      user.xp += 5;

      /*
      ━━━━━━━━━━━━━━━━━━━
      LEVEL
      ━━━━━━━━━━━━━━━━━━━
      */
      user.level =
        calculateLevel(
          user.xp
        );

      /*
      ━━━━━━━━━━━━━━━━━━━
      ACHIEVEMENTS
      ━━━━━━━━━━━━━━━━━━━
      */
      user.achievements =
        checkAchievements(
          user
        );

      /*
      ━━━━━━━━━━━━━━━━━━━
      SAVE USER
      ━━━━━━━━━━━━━━━━━━━
      */
      await user.save();

      /*
      ━━━━━━━━━━━━━━━━━━━
      ACTIVITY
      ━━━━━━━━━━━━━━━━━━━
      */
      await addActivity({

        userId:
          req.user._id,

        type:
          "mission",

        title:
          "Daily mission generated",

        description:
          "3 mission baru tersedia hari ini",

        xp: 5,

      });

      /*
      ━━━━━━━━━━━━━━━━━━━
      RESPONSE
      ━━━━━━━━━━━━━━━━━━━
      */
      res.status(201).json({

        success: true,

        refreshed: true,

        missions,

        user: {

          xp:
            user.xp,

          level:
            user.level,

          achievements:
            user.achievements,

          stats:
            user.stats,

        },

      });

    } catch (error) {

      console.log(
        "GENERATE MISSION ERROR:"
      );

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };