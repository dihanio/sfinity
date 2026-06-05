import api
from "@/lib/api";

/*
━━━━━━━━━━━━━━━━━━━
GET
━━━━━━━━━━━━━━━━━━━
*/
export async function
getGoals() {

  const { data } =
    await api.get(
      "/goals"
    );

  return data;

}

/*
━━━━━━━━━━━━━━━━━━━
CREATE
━━━━━━━━━━━━━━━━━━━
*/
export async function
createGoal(
  payload
) {

  const { data } =
    await api.post(

      "/goals",

      payload

    );

  return data;

}

/*
━━━━━━━━━━━━━━━━━━━
ADD PROGRESS
━━━━━━━━━━━━━━━━━━━
*/
export async function
addGoalProgress(

  id,

  amount

) {

  const { data } =
    await api.put(

      `/goals/${id}/progress`,

      {
        amount,
      }

    );

  return data;

}

/*
━━━━━━━━━━━━━━━━━━━
UPDATE
━━━━━━━━━━━━━━━━━━━
*/
export async function
updateGoal(
  id,
  payload
) {

  const { data } =
    await api.put(

      `/goals/${id}`,

      payload

    );

  return data.goal;

}

/*
━━━━━━━━━━━━━━━━━━━
DELETE
━━━━━━━━━━━━━━━━━━━
*/
export async function
deleteGoal(id) {

  const { data } =
    await api.delete(
      `/goals/${id}`
    );

  return data;

}