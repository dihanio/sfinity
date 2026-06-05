import User
from "../models/UserModel.js";

/*
━━━━━━━━━━━━━━━━━━━
GET PROFILE
━━━━━━━━━━━━━━━━━━━
*/
export const getProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        ).select(
          "-password"
        );

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });

      }

      res.json({

        success: true,

        user,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

/*
━━━━━━━━━━━━━━━━━━━
UPDATE PROFILE
━━━━━━━━━━━━━━━━━━━
*/
export const updateProfile =
  async (req, res) => {

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

      /*
      ━━━━━━━━━━━━━━━━━━━
      UPDATE
      ━━━━━━━━━━━━━━━━━━━
      */
      user.name =
        req.body.name ??
        user.name;

      user.image =
        req.body.image ??
        user.image;

      /*
      ━━━━━━━━━━━━━━━━━━━
      SAVE
      ━━━━━━━━━━━━━━━━━━━
      */
      const updatedUser =
        await user.save();

      res.json({

        success: true,

        user: {

          _id:
            updatedUser._id,

          name:
            updatedUser.name,

          email:
            updatedUser.email,

          image:
            updatedUser.image,

          xp:
            updatedUser.xp,

        },

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };