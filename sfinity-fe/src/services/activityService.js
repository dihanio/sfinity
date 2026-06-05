import api
from "@/lib/api";

/*
━━━━━━━━━━━━━━━━━━━
GET
━━━━━━━━━━━━━━━━━━━
*/
export async function
getActivities() {

  const response =
    await api.get(
      "/activities"
    );

  return response.data;
}

/*
━━━━━━━━━━━━━━━━━━━
CREATE
━━━━━━━━━━━━━━━━━━━
*/
export async function
createActivity(data) {

  const response =
    await api.post(

      "/activities",

      data

    );

  return response.data;
}