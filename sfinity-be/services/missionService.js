import Mission
from "../models/Mission.js";

import {
  addXP,
} from "./xpService.js";

import {
  createActivity,
} from "./activityService.js";

/*
━━━━━━━━━━━━━━━━━━━
UPDATE MISSION
━━━━━━━━━━━━━━━━━━━
*/
export const updateMissionProgress =
  async ({

    userId,

    type,

  }) => {

    /*
    FIND MISSIONS
    */
    const missions =
      await Mission.find({

        user: userId,

        type,

        completed: false,

      });

    for (
      const mission of missions
    ) {

      /*
      UPDATE PROGRESS
      */
      mission.progress += 1;

      /*
      COMPLETE
      */
      if (

        mission.progress >=
        mission.requirement

      ) {

        mission.completed =
          true;

        /*
        XP REWARD
        */
        await addXP(

          userId,

          mission.xpReward

        );

        /*
        ACTIVITY
        */
        await createActivity({

          userId,

          type:
            "mission",

          title:
            "Mission completed",

          description:
            mission.title,

        });

      }

      await mission.save();

    }

  };