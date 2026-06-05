import express
from "express";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {

  getReceipts,

  createReceipt,

  deleteReceipt,

  updateReceipt,

} from "../controllers/receiptController.js";

const router =
  express.Router();

router
  .route("/")

  .get(
    protect,
    getReceipts
  )

  .post(
    protect,
    createReceipt
  );

router
  .route("/:id")

  .put(
    protect,
    updateReceipt
  )

  .delete(
    protect,
    deleteReceipt
  );

export default router;