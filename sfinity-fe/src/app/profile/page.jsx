"use client";

import {
  useEffect,
} from "react";

import DashboardLayout
from "@/components/layout/DashboardLayout";

import ProfileHeader
from "@/components/profile/ProfileHeader";

import ProfileAchievements
from "@/components/profile/ProfileAchievements";

import ProfileActivity
from "@/components/profile/ProfileActivity";

import LevelProgressCard
from "@/components/gamification/LevelProgressCard";

import LevelBadges
from "@/components/gamification/LevelBadges";

import FAQSection from "@/components/profile/FAQSection";

import AchievementModal
from "@/components/achievement/AchievementModal";

import {
  useAchievementStore,
} from "@/stores/useAchievementStore";

import {
  useUserStore,
} from "@/stores/useUserStore";

import {
  useRouter,
} from "next/navigation";

import {
  LogOut,
} from "lucide-react";

import {
  useAuthStore,
} from "@/stores/useAuthStore";

export default function ProfilePage() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  USER STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const user =
    useUserStore(
      (state) =>
        state.user
    );

  const fetchProfile =
    useUserStore(
      (state) =>
        state.fetchProfile
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  FETCH PROFILE
  ━━━━━━━━━━━━━━━━━━━
  */
  useEffect(() => {

    fetchProfile();

  }, []);

  /*
  ━━━━━━━━━━━━━━━━━━━
  USER DATA
  ━━━━━━━━━━━━━━━━━━━
  */
  const xp =
    user?.xp || 0;

  const streak =
    user?.streak || 0;

  /*
  ━━━━━━━━━━━━━━━━━━━
  ACHIEVEMENT
  ━━━━━━━━━━━━━━━━━━━
  */
  const {

    updateStats,

    checkAchievements,

  } =
    useAchievementStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  UPDATE ACHIEVEMENT
  ━━━━━━━━━━━━━━━━━━━
  */
  useEffect(() => {

    updateStats({

      xp,

      streak,

    });

    checkAchievements();

  }, [

    xp,

    streak,

  ]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  LOGOUT
  ━━━━━━━━━━━━━━━━━━━
  */
  const router =
    useRouter();

  const authLogout =
    useAuthStore(
      (state) => state.logout
    );

  const logout =
    () => {

      try {
        localStorage.clear();
      } catch (e) {
        // ignore
      }

      authLogout();

      router.push(
        "/login"
      );

    };

  return (

    <DashboardLayout>

      {/* MODAL */}
      <AchievementModal />

      <div className="space-y-8">

        {/* HEADER */}
        <div
          className="
            flex
            flex-wrap
            items-start
            justify-between
            gap-4
          "
        >

          <div>

            <h2
              className="
                text-4xl
                font-black
                text-slate-900
              "
            >
              Pengaturan
            </h2>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Pantau progress
              dan kelola akunmu
            </p>

          </div>

          {/* LOGOUT */}
          <button

            onClick={logout}

            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-5
              py-3
              font-semibold
              text-red-600
              transition-all
              hover:bg-red-100
            "
          >

            <LogOut
              className="
                h-5
                w-5
              "
            />

            Logout

          </button>

        </div>

        {/* PROFILE */}
        <ProfileHeader />

        {/* LEVEL */}
        <LevelProgressCard />

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-8
            xl:grid-cols-3
          "
        >

          <div className="min-w-0">
            <LevelBadges />
          </div>

          <div className="min-w-0">
            <ProfileActivity />
          </div>

          <div className="min-w-0">
            <ProfileAchievements />
          </div>

        </div>

        {/* FAQ SECTION */}
        <FAQSection />

      </div>

    </DashboardLayout>

  );

}