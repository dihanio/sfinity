import User
from "../models/UserModel.js";

import {
  updateGamification,
} from "../utils/updateGamification.js";

import {
  addActivity,
} from "../utils/addActivity.js";

export const watchVideo =
  async (
    req,
    res
  ) => {

    try {

      const {
        videoId,
        title,
      } = req.body;

      const existingUser =
        await User.findById(
          req.user._id
        );

      const alreadyWatched =
        existingUser.watchedVideos.includes(
          videoId
        );

      /*
      VIDEO SUDAH DITONTON
      */
      if (alreadyWatched) {

        return res.status(200).json({

          success: true,

          alreadyWatched: true,

          user: existingUser,

        });

      }

      /*
      SAVE VIDEO
      */
      existingUser.watchedVideos.push(
        videoId
      );

      await existingUser.save();

      /*
      XP + STATS
      */
      const user =
        await updateGamification(
          req.user._id,
          {

            xp: 20,

            videosWatched: 1,

          }
        );

      /*
      ACTIVITY
      */
      await addActivity({

        userId:
          req.user._id,

        type:
          "video",

        title:
          "Menonton Video",

        description:
          title,

        xp: 20,

      });

      res.status(200).json({

        success: true,

        alreadyWatched: false,

        user,

      });

    } catch (error) {

      console.log(
        "WATCH VIDEO ERROR"
      );

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };