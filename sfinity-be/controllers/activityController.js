import Activity
from "../models/ActivityModel.js";

/*
━━━━━━━━━━━━━━━━━━━
GET ACTIVITIES
━━━━━━━━━━━━━━━━━━━
*/
export const getActivities =
  async (req, res) => {

    console.log(
      "LOGIN USER:",
      req.user._id.toString()
    );

    const activities =
      await Activity.find({
        user: req.user._id,
      });

    console.log(
      "FOUND:",
      activities.length
    );

    res.json({
      success: true,
      activities,
    });

  };
/*
━━━━━━━━━━━━━━━━━━━
CREATE ACTIVITY
━━━━━━━━━━━━━━━━━━━
*/
export const createActivity =
  async (req, res) => {

    try {

      const {

        type,

        title,

        description,

        xp,

      } = req.body;

      const activity =
        await Activity.create({

          user:
            req.user._id,

          type,

          title,

          description,

          xp,

        });

      res.status(201).json({

        success: true,

        activity,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };