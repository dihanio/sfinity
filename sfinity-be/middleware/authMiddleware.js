import jwt
from "jsonwebtoken";

import User
from "../models/UserModel.js";

/*
━━━━━━━━━━━━━━━━━━━
PROTECT
━━━━━━━━━━━━━━━━━━━
*/
export const protect =
  async (
    req,
    res,
    next
  ) => {

    try {

      let token;

      /*
      ━━━━━━━━━━━━━━━━━━━
      CHECK TOKEN
      ━━━━━━━━━━━━━━━━━━━
      */
      if (

        req.headers.authorization &&

        req.headers.authorization.startsWith(
          "Bearer"
        )

      ) {

        token =
          req.headers.authorization.split(
            " "
          )[1];

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      NO TOKEN
      ━━━━━━━━━━━━━━━━━━━
      */
      if (!token) {

        return res.status(401).json({

          success: false,

          message:
            "Not authorized",

        });

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      VERIFY
      ━━━━━━━━━━━━━━━━━━━
      */
      const decoded =
        jwt.verify(

          token,

          process.env.JWT_SECRET

        );

      /*
      ━━━━━━━━━━━━━━━━━━━
      FIND USER
      ━━━━━━━━━━━━━━━━━━━
      */
      req.user =
        await User.findById(

          decoded.id

        ).select(
          "-password"
        );

      next();

    } catch (error) {

      console.log(error);

      res.status(401).json({

        success: false,

        message:
          "Token failed",

      });

    }

  };