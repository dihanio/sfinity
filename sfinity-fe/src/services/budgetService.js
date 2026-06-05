import api
from "@/lib/api";

/*
━━━━━━━━━━━━━━━━━━━
GET
━━━━━━━━━━━━━━━━━━━
*/
export async function
getBudgets() {

  const { data } =
    await api.get(
      "/budgets"
    );

  return data;

}

/*
━━━━━━━━━━━━━━━━━━━
CREATE
━━━━━━━━━━━━━━━━━━━
*/
export async function
createBudget(payload) {

  const { data } =
    await api.post(

      "/budgets",

      payload

    );

  return data.budget;

}

/*
━━━━━━━━━━━━━━━━━━━
UPDATE
━━━━━━━━━━━━━━━━━━━
*/
export async function
updateBudget(

  id,

  payload

) {

  const { data } =
    await api.put(

      `/budgets/${id}`,

      payload

    );

  return data.budget;

}

/*
━━━━━━━━━━━━━━━━━━━
DELETE
━━━━━━━━━━━━━━━━━━━
*/
export async function
deleteBudget(id) {

  const { data } =
    await api.delete(

      `/budgets/${id}`

    );

  return data;

}