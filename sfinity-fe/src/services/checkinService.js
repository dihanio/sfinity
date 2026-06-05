import api from "@/lib/api";

/*
━━━━━━━━━━━━━━━━━━━
DAILY CHECKIN
━━━━━━━━━━━━━━━━━━━
*/
export async function
dailyCheckin() {

  const { data } =
    await api.post(
      "/checkin"
    );

  return data;

}