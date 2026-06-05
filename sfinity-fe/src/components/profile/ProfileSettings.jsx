"use client";

import { useEffect } from "react";

import api from "@/lib/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import ProfileHeader from "@/components/profile/ProfileHeader";

import ProfileAchievements from "@/components/profile/ProfileAchievements";

import ProfileActivity from "@/components/profile/ProfileActivity";

import LevelProgressCard from "@/components/gamification/LevelProgressCard";

import LevelBadges from "@/components/gamification/LevelBadges";

import {
  useAuthStore,
} from "@/stores/useAuthStore";

import {
  useGamificationStore,
} from "@/stores/useGamificationStore";

export default function ProfilePage() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  AUTH STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const setUser =
    useAuthStore(
      (state) =>
        state.setUser
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  GAMIFICATION STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const setXP =
    useGamificationStore(
      (state) =>
        state.setXP
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  FETCH PROFILE
  ━━━━━━━━━━━━━━━━━━━
  */
  useEffect(() => {

    async function fetchProfile() {

      try {

        const response =
          await api.get(
            "/profile"
          );

        /*
        USER
        */
        setUser(

          response.data.user

        );

        /*
        XP
        */
        setXP(

          response.data.user?.xp || 0

        );

      } catch (error) {

        console.log(
          "Fetch profile error:",
          error
        );

      }

    }

    fetchProfile();

  }, [setUser, setXP]);

  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* PAGE HEADER */}
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
            Pantau progress dan
            kelola akunmu
          </p>

        </div>

        {/* PROFILE HEADER */}
        <ProfileHeader />

        {/* LEVEL */}
        <LevelProgressCard />

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            gap-8
            xl:grid-cols-3
            items-start
          "
        >

          {/* BADGES */}
          <div className="min-w-0">
            <LevelBadges />
          </div>

          {/* ACTIVITY */}
          <div className="min-w-0">
            <ProfileActivity />
          </div>

          {/* ACHIEVEMENTS */}
          <div className="min-w-0">
            <ProfileAchievements />
          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}