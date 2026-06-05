import api
from "@/lib/api";

/*
━━━━━━━━━━━━━━━━━━━
GET
━━━━━━━━━━━━━━━━━━━
*/
export async function
getReceipts() {

  const { data } =
    await api.get(
      "/receipts"
    );

  return (
    data.receipts || []
  );

}

/*
━━━━━━━━━━━━━━━━━━━
CREATE
━━━━━━━━━━━━━━━━━━━
*/
export async function
createReceipt(payload) {

  const { data } =
    await api.post(

      "/receipts",

      payload

    );

  return data;

}

/*
━━━━━━━━━━━━━━━━━━━
DELETE
━━━━━━━━━━━━━━━━━━━
*/
export async function
deleteReceipt(id) {

  const { data } =
    await api.delete(

      `/receipts/${id}`

    );

  return data;

}

/*
━━━━━━━━━━━━━━━━━━━
UPDATE
━━━━━━━━━━━━━━━━━━━
*/
export async function
updateReceipt(id, payload) {

  const { data } =
    await api.put(

      `/receipts/${id}`,

      payload

    );

  return data;

}