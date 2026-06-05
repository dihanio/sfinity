import bcrypt
from "bcryptjs";

import jwt
from "jsonwebtoken";

import Category
from "../models/CategoryModel.js";

import User
from "../models/UserModel.js";

/*
━━━━━━━━━━━━━━━━━━━
GENERATE TOKEN
━━━━━━━━━━━━━━━━━━━
*/
const generateToken =
  (id) => {

    return jwt.sign(

      { id },

      process.env.JWT_SECRET,

      {

        expiresIn: "30d",

      }

    );

  };
  const DEFAULT_CATEGORIES = [

  // INCOME

  {
    name: "Beasiswa",
    type: "income",
  },

  {
    name: "Gaji",
    type: "income",
  },

  {
    name: "Freelance",
    type: "income",
  },

  {
    name: "Kiriman Orang Tua",
    type: "income",
  },

  // EXPENSE

  {
    name: "Tuition",
    type: "expense",
  },

  {
    name: "Housing",
    type: "expense",
  },

  {
    name: "Food",
    type: "expense",
  },

  {
    name: "Transportation",
    type: "expense",
  },

  {
    name: "Books & Supplies",
    type: "expense",
  },

  {
    name: "Entertainment",
    type: "expense",
  },

  {
    name: "Personal Care",
    type: "expense",
  },

  {
    name: "Technology",
    type: "expense",
  },

  {
    name: "Health & Wellness",
    type: "expense",
  },

  {
    name: "Miscellaneous",
    type: "expense",
  },

];

/*
━━━━━━━━━━━━━━━━━━━
REGISTER
━━━━━━━━━━━━━━━━━━━
*/
export const register =
  async (req, res) => {

    try {

      const {

        name,

        email,

        password,

      } = req.body;

      /*
      ━━━━━━━━━━━━━━━━━━━
      VALIDATION
      ━━━━━━━━━━━━━━━━━━━
      */
      if (

        !name ||

        !email ||

        !password

      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please fill all fields",

        });

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      CHECK EMAIL
      ━━━━━━━━━━━━━━━━━━━
      */
      const existingUser =
        await User.findOne({

          email,

        });

      if (existingUser) {

        return res.status(400).json({

          success: false,

          message:
            "Email already used",

        });

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      HASH PASSWORD
      ━━━━━━━━━━━━━━━━━━━
      */
      const salt =
        await bcrypt.genSalt(10);

      const hashedPassword =
        await bcrypt.hash(

          password,

          salt

        );

      /*
      ━━━━━━━━━━━━━━━━━━━
      CREATE USER
      ━━━━━━━━━━━━━━━━━━━
      */
      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,

          xp: 0,

          level: 1,

          achievements: [],

          stats: {

            transactions: 0,

            scans: 0,

            budgets: 0,

            streak: 0,

          },

        });
        /*
━━━━━━━━━━━━━━━━━━━
DEFAULT CATEGORIES
━━━━━━━━━━━━━━━━━━━
*/
await Category.insertMany(

  DEFAULT_CATEGORIES.map(
    (category) => ({

      ...category,

      user:
        user._id,

    })
  )

);

      /*
      ━━━━━━━━━━━━━━━━━━━
      TOKEN
      ━━━━━━━━━━━━━━━━━━━
      */
      const token =
        generateToken(
          user._id
        );

      /*
      ━━━━━━━━━━━━━━━━━━━
      RESPONSE
      ━━━━━━━━━━━━━━━━━━━
      */
      res.status(201).json({

        success: true,

        token,

        user: {

          _id:
            user._id,

          name:
            user.name,

          email:
            user.email,

          image:
            user.image,

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
        "REGISTER ERROR:"
      );

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
LOGIN
━━━━━━━━━━━━━━━━━━━
*/
export const login =
  async (req, res) => {

    try {

      const {

        email,

        password,

      } = req.body;

      /*
      ━━━━━━━━━━━━━━━━━━━
      VALIDATION
      ━━━━━━━━━━━━━━━━━━━
      */
      if (

        !email ||

        !password

      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please fill all fields",

        });

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      FIND USER
      ━━━━━━━━━━━━━━━━━━━
      */
      const user =
        await User.findOne({

          email,

        });

      if (!user) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid credentials",

        });

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      MATCH PASSWORD
      ━━━━━━━━━━━━━━━━━━━
      */
      const isMatch =
        await bcrypt.compare(

          password,

          user.password

        );

      if (!isMatch) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid credentials",

        });

      }

      /*
      ━━━━━━━━━━━━━━━━━━━
      TOKEN
      ━━━━━━━━━━━━━━━━━━━
      */
      const token =
        generateToken(
          user._id
        );

      /*
      ━━━━━━━━━━━━━━━━━━━
      RESPONSE
      ━━━━━━━━━━━━━━━━━━━
      */
      res.json({

        success: true,

        token,

        user: {

          _id:
            user._id,

          name:
            user.name,

          email:
            user.email,

          image:
            user.image,

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
        "LOGIN ERROR:"
      );

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };