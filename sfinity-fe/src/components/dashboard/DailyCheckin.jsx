"use client";

import {
  Calendar,
  Check,
  Flame,
  Star,
  Loader2,
} from "lucide-react";

import { useState, useEffect } from "react";

import { toast } from "sonner";

import {
  dailyCheckin,
} from "@/services/checkinService";

import {
  useDailyCheckinStore,
} from "@/stores/useDailyCheckinStore";

import {
  useUserStore,
} from "@/stores/useUserStore";

const days = [
  "Min",
  "Sen",
  "Sel",
  "Rab",
  "Kam",
  "Jum",
  "Sab",
];

export default function DailyCheckin() {

  const [loading, setLoading] =
    useState(false);

  const {

    checkedDays,

    streak,

    lastCheckinDate,

    setCheckinData,

  } =
    useDailyCheckinStore();

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      setCheckinData({
        streak: user.stats?.streak || 0,
        lastCheckinDate: user.lastCheckinDate || null,
      });
    }
  }, [user, setCheckinData]);

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const alreadyChecked =
    lastCheckinDate ===
    today;

  async function handleCheckin() {

    try {

      setLoading(true);

      const data =
        await dailyCheckin();

      setCheckinData({

        streak:
          data.user.stats.streak,

        lastCheckinDate:
          data.user.lastCheckinDate,

        checkedDays:
          data.checkedDays || [],

      });

      toast.success(
        `+${data.xpReward} XP`
      );

    } catch (error) {

      const message =
        error?.response?.data?.message;

      if (
        message ===
        "Sudah check-in hari ini"
      ) {

        toast.info(
          "Kamu sudah check-in hari ini"
        );

        return;

      }

      toast.error(
        message ||
        "Check-in gagal"
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div
      className="
        rounded-[28px]
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div
          className="
            flex
            gap-5
          "
        >

          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              bg-orange-100
            "
          >

            <Flame
              className="
                h-10
                w-10
                text-orange-500
              "
            />

          </div>

          <div>

            <h2
              className="
                text-3xl
                font-black
                text-slate-900
              "
            >
              Check-in Harian
            </h2>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Beruntun{" "}

              <span
                className="
                  font-bold
                "
              >
                {streak} hari
              </span>

            </p>

          </div>

        </div>

      </div>

      {/* DAYS */}
      <div
        className="
          mt-8
          grid
          grid-cols-7
          gap-3
        "
      >

        {days.map(

          (
            day,
            index
          ) => {

            const checked =
              checkedDays?.includes(
                index
              );

            return (

              <div
                key={day}
                className="
                  flex
                  flex-col
                  items-center
                "
              >

                <span
                  className="
                    text-sm
                    text-slate-400
                  "
                >
                  {day}
                </span>

                <div
                  className={`
                    mt-3
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    ${
                      checked
                        ? "bg-blue-100 text-blue-600"
                        : "border border-slate-200 text-slate-400"
                    }
                  `}
                >

                  {checked ? (

                    <Check
                      className="
                        h-5
                        w-5
                      "
                    />

                  ) : (

                    <Star
                      className="
                        h-4
                        w-4
                      "
                    />

                  )}

                </div>

              </div>

            );

          }

        )}

      </div>

      {/* BUTTON */}
      <button

        onClick={
          handleCheckin
        }

        disabled={
          alreadyChecked ||
          loading
        }

        className={`
          mt-8
          flex
          h-14
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          font-semibold
          transition-all
          ${
            alreadyChecked
              ? "bg-slate-100 text-black"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }
        `}
      >

        {loading ? (

          <Loader2
            className="
              h-5
              w-5
              animate-spin
            "
          />

        ) : (

          <Calendar
            className="
              h-5
              w-5
            "
          />

        )}

        {alreadyChecked

          ? "Sudah Check-in"

          : "Check-in Hari Ini"}

      </button>

    </div>

  );

}
