import api
from "@/lib/api";

export const getGoals =
  async () => {

    const {
      data,
    } =
      await api.get(
        "/goals"
      );

    return data;
};

export const createGoal =
  async (
    payload
  ) => {

    const {
      data,
    } =
      await api.post(
        "/goals",
        payload
      );

    return data;
};

export const addGoalProgress =
  async (
    id,
    amount
  ) => {

    const {
      data,
    } =
      await api.put(

        `/goals/${id}/progress`,

        {
          amount,
        }

      );

    return data;
};

export const deleteGoal =
  async (id) => {

    await api.delete(
      `/goals/${id}`
    );

};

export const updateGoal =
  async (
    id,
    payload
  ) => {

    const { data } =
      await api.put(

        `/goals/${id}`,

        payload

      );

    return data;

};