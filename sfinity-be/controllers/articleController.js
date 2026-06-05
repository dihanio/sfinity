import User from "../models/UserModel.js";

import {
  updateGamification,
} from "../utils/updateGamification.js";

import {
  addActivity,
} from "../utils/addActivity.js";

export const readArticle =
  async (
    req,
    res
  ) => {

    try {

      const {
        articleId,
        title,
      } = req.body;

      const existingUser =
        await User.findById(
          req.user._id
        );

      const alreadyRead =
        existingUser.readArticles.includes(
          articleId
        );

      /*
      ━━━━━━━━━━━━━━━━━━━
      ALREADY READ
      ━━━━━━━━━━━━━━━━━━━
      */
      if (alreadyRead) {

        return res.status(200).json({

          success: true,

          alreadyRead: true,

          user: existingUser,

        });

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      SAVE ARTICLE
      ━━━━━━━━━━━━━━━━━━━
      */
      existingUser.readArticles.push(
        articleId
      );

      await existingUser.save();

      /*
      ━━━━━━━━━━━━━━━━━━━
      XP + STATS
      ━━━━━━━━━━━━━━━━━━━
      */
      const user =
        await updateGamification(
          req.user._id,
          {
            xp: 15,
            articlesRead: 1,
          }
        );

      /*
      ━━━━━━━━━━━━━━━━━━━
      ACTIVITY
      ━━━━━━━━━━━━━━━━━━━
      */
      await addActivity({

        userId:
          req.user._id,

        type:
          "article",

        title:
          "Membaca Artikel",

        description:
          title,

        xp: 15,

      });

      /*
      ━━━━━━━━━━━━━━━━━━━
      RESPONSE
      ━━━━━━━━━━━━━━━━━━━
      */
      res.status(200).json({

        success: true,

        alreadyRead: false,

        user,

      });

    } catch (error) {

      console.log(
        "READ ARTICLE ERROR:"
      );

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };