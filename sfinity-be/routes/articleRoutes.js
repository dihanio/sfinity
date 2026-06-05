import express
from "express";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  readArticle,
} from "../controllers/articleController.js";

const router =
  express.Router();

router.post(
  "/read-article",
  protect,
  readArticle
);

export default router;