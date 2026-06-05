import express
from "express";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  dailyCheckin,
} from "../controllers/checkinController.js";

const router =
  express.Router();

router.post(

  "/",

  protect,

  dailyCheckin

);

export default router;