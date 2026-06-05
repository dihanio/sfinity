import api
from "@/lib/api";

/*
━━━━━━━━━━━━━━━━━━━
GET
━━━━━━━━━━━━━━━━━━━
*/
export async function
getTransactions() {

  const { data } =
    await api.get(
      "/transactions"
    );

  return (
    data.transactions || []
  );

}

/*
━━━━━━━━━━━━━━━━━━━
CREATE
━━━━━━━━━━━━━━━━━━━
*/
export async function
createTransaction(payload) {

  const { data } =
    await api.post(

      "/transactions",

      payload

    );

  return data.transaction;

}

/*
━━━━━━━━━━━━━━━━━━━
UPDATE
━━━━━━━━━━━━━━━━━━━
*/
export async function
updateTransaction(

  id,

  payload

) {

  const { data } =
    await api.put(

      `/transactions/${id}`,

      payload

    );

  return data.transaction;

}

/*
━━━━━━━━━━━━━━━━━━━
DELETE
━━━━━━━━━━━━━━━━━━━
*/
export async function
deleteTransaction(id) {

  const { data } =
    await api.delete(

      `/transactions/${id}`

    );

  return data;

}