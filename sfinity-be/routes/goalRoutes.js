import express
from "express";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {

  getGoals,

  createGoal,

  addGoalProgress,

  deleteGoal,updateGoal,

} from "../controllers/goalController.js";

console.log(
  "GOAL ROUTES LOADED"
);



const router =
  express.Router();

router.get(
  "/",
  protect,
  getGoals
);

router.post(
  "/",
  protect,
  createGoal
);

router.put(
  "/:id/progress",
  protect,
  addGoalProgress
);

router.delete(
  "/:id",
  protect,
  deleteGoal
);

router.put(
  "/:id",
  protect,
  updateGoal
);


export default
router;