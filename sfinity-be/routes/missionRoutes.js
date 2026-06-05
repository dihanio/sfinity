import express
from "express";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  generateDailyMissions,
} from "../controllers/missionController.js";

const router =
  express.Router();

router.get(

  "/daily",

  protect,

  generateDailyMissions

);

export default router;