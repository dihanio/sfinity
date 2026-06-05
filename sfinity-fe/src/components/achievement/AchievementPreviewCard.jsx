// src/components/achievement/AchievementPreviewCard.jsx

"use client";

export default function AchievementPreviewCard({
  achievement,
}) {

  return (

    <div
      className="
        flex
        min-w-[110px]
        flex-col
        items-center
      "
    >

      {/* BADGE */}
      <div
        className="
          flex
          h-[72px]
          w-[72px]
          items-center
          justify-center
          transition-all
          hover:scale-105
        "
      >

        <img

          src={
            achievement.image
          }

          alt={
            achievement.title
          }

          className="
            h-full
            w-full
            object-contain
          "
        />

      </div>

      {/* TITLE */}
      <p
        className="
          mt-2
          max-w-[100px]
          text-center
          text-xs
          font-bold
          leading-snug
          text-slate-700
        "
      >

        {
          achievement.title
        }

      </p>

    </div>

  );

}