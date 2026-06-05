import express
from "express";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  watchVideo,
} from "../controllers/videoController.js";

const router =
  express.Router();

router.post(
  "/watch",
  protect,
  watchVideo
);

export default router;