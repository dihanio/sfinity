// src/components/layout/AppProvider.jsx

"use client";

import LevelUpModal
from "@/components/gamification/LevelUpModal";

import AchievementModal
from "@/components/achievement/AchievementModal";

export default function AppProvider({
  children,
}) {

  return (

    <>

      {children}

      <LevelUpModal />

      <AchievementModal />

    </>

  );

}