import api
from "@/lib/api";

export async function
getReportAnalytics() {

  const { data } =
    await api.get(

      "/reports/analytics"

    );

  return data.analytics;

}