import Goal
from "../models/GoalModel.js";

export const getGoals =
  async (
    req,
    res
  ) => {

    const goals =
      await Goal.find({

        user:
          req.user._id,

      })

      .sort({
        createdAt:
          -1,
      });

    const formatted =
      goals.map(
        (goal) => ({

          ...goal.toObject(),

          progress:
            Math.min(

              100,

              Math.round(

                (
                  goal.currentAmount /
                  goal.targetAmount
                ) * 100

              )

            ),

        })
      );

    res.json({

      success:
        true,

      goals:
        formatted,

    });

  };

  export const createGoal =
  async (
    req,
    res
  ) => {

    const {

      title,

      targetAmount,

      deadline,

    } = req.body;

    const goal =
      await Goal.create({

        user:
          req.user._id,

        title,

        targetAmount,

        deadline,

      });

    res.status(201).json({

      success:
        true,

      goal,

    });

  };

  export const addGoalProgress =
  async (
    req,
    res
  ) => {

    const goal =
      await Goal.findOne({

        _id:
          req.params.id,

        user:
          req.user._id,

      });

    if (!goal) {

      return res
        .status(404)
        .json({

          success:
            false,

          message:
            "Goal not found",

        });

    }

    const amount =
      Number(
        req.body.amount
      );

    goal.currentAmount +=
      amount;

    if (

      goal.currentAmount >=
      goal.targetAmount

    ) {

      goal.completed =
        true;

    }

    await goal.save();

    res.json({

      success:
        true,

      goal,

    });

  };

  export const deleteGoal =
  async (
    req,
    res
  ) => {

    await Goal.findOneAndDelete({

      _id:
        req.params.id,

      user:
        req.user._id,

    });

    res.json({

      success:
        true,

    });

  };

  export const updateGoal =
  async (req, res) => {

    const goal =
      await Goal.findOne({

        _id: req.params.id,

        user: req.user._id,

      });

    if (!goal) {

      return res.status(404).json({

        success: false,

        message: "Goal not found",

      });

    }

    goal.title =
      req.body.title ??
      goal.title;

    goal.targetAmount =
      req.body.targetAmount ??
      goal.targetAmount;

    await goal.save();

    res.json({

      success: true,

      goal,

    });

  };