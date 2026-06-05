import api
from "@/lib/api";

/*
━━━━━━━━━━━━━━━━━━━
GET PROFILE
━━━━━━━━━━━━━━━━━━━
*/
export async function getProfile() {

  const response =
    await api.get(
      "/users/profile"
    );

  return response.data;

}

/*
━━━━━━━━━━━━━━━━━━━
UPDATE PROFILE
━━━━━━━━━━━━━━━━━━━
*/
export async function updateProfile(
  data
) {

  const response =
    await api.put(

      "/users/profile",

      data

    );

  return response.data;

}