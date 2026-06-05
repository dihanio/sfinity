import express
from "express";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  getReportAnalytics,
} from "../controllers/reportController.js";

const router =
  express.Router();

router.get(

  "/analytics",

  protect,

  getReportAnalytics

);

export default router;