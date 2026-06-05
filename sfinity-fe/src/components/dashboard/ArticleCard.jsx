"use client";

import Image from "next/image";
import { useEffect } from "react";

import api from "@/lib/api";

import {
  useUserStore,
} from "@/stores/useUserStore";

import {
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";

import {
  useDashboardStore,
} from "@/stores/useDashboardStore";

import {
  useGamificationStore,
} from "@/stores/useGamificationStore";

import {
  useActivityStore,
} from "@/stores/useActivityStore";

import {
  useArticleStore,
} from "@/stores/useArticleStore";
import {
  XP_REWARDS,
} from "@/data/xpRewards";
export default function ArticleCard() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  TRANSACTION
  ━━━━━━━━━━━━━━━━━━━
  */
  const {
  financialHealth,

} =
  useDashboardStore();

  const user =
  useUserStore(
    (state) =>
      state.user
  );

  const setUser =
  useUserStore(
    (state) =>
      state.setUser
  );

  const markArticleAsRead =
  useActivityStore(
    (state) =>
      state.markArticleAsRead
  );

  /*
  ━━━━━━━━━━━━━━━━━━━
  ARTICLES
  ━━━━━━━━━━━━━━━━━━━
  */
const {

  articles,

  generateArticles,

} =
  useArticleStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  CLIENT ONLY
  ━━━━━━━━━━━━━━━━━━━
  */
useEffect(() => {

  generateArticles(
  financialHealth
);

}, [
  financialHealth,
  generateArticles,
]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  READ ARTICLE
  ━━━━━━━━━━━━━━━━━━━
  */
  async function handleReadArticle(
  article
) {

    /*
    ━━━━━━━━━━━━━━━━━━━
    ALREADY READ
    ━━━━━━━━━━━━━━━━━━━
    */
    const alreadyRead =
      user?.readArticles?.includes(
        article.id
      );

    /*
    ━━━━━━━━━━━━━━━━━━━
    OPEN LINK
    ━━━━━━━━━━━━━━━━━━━
    */
    if (article.external) {

      window.open(
        article.url,
        "_blank"
      );

    }

    /*
    ━━━━━━━━━━━━━━━━━━━
    XP ONLY ONCE
    ━━━━━━━━━━━━━━━━━━━
    */
    if (!alreadyRead) {

      /*
      SAVE HISTORY
      */
      const response =
  await api.post(

    "/articles/read-article",

    {

      articleId:
        article.id,

      title:
        article.title,

    }

  );

setUser(
  response.data.user
);

      markArticleAsRead(article.id);

      /*
      TOAST
      */
      toast.success(
  `+${XP_REWARDS.ARTICLE_READ} XP`
);

    } else {

      /*
      READ AGAIN
      */
      toast(
        "Membuka artikel kembali"
      );

    }

  }

  return (

    <div
      className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-8
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-black
              text-slate-900
            "
          >
            Artikel Finansial
          </h2>

          <p
            className="
              mt-2
              text-slate-500
            "
          >
            Insight finansial
            berdasarkan
            kondisi keuanganmu
          </p>

        </div>

        {/* BADGE */}
        <div
          className="
            rounded-xl
            bg-slate-100
            px-4
            py-2
            text-sm
            font-semibold
            text-slate-700
          "
        >
          AI Feed
        </div>

      </div>

      {/* EMPTY */}
      {articles.length === 0 && (

        <div
          className="
            mt-8
            rounded-3xl
            border
            border-slate-200
            bg-slate-50
            p-10
            text-center
          "
        >

          <p
            className="
              text-slate-500
            "
          >
            Memuat artikel...
          </p>

        </div>

      )}

      {/* LIST */}
      <div
        className="
          mt-8
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
        "
      >

        {articles.map(
          (article) => {

            /*
            ━━━━━━━━━━━━━━━━━━━
            READ STATUS
            ━━━━━━━━━━━━━━━━━━━
            */
            const alreadyRead =
  user?.readArticles?.includes(
    article.id
  );

            return (

              <div
                key={article.id}
                className="
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-slate-200
                  bg-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >

                {/* IMAGE */}
                <div
                  className="
                    relative
                    h-52
                    w-full
                  "
                >

                  <Image
                    src={
                      article.image ||
                      "/images/article-placeholder.jpg"
                    }
                    alt={
                      article.title
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="
                      object-cover
                    "
                  />

                  {/* CATEGORY */}
                  <div
                    className="
                      absolute
                      left-4
                      top-4
                      rounded-full
                      bg-white/90
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-slate-700
                      backdrop-blur
                    "
                  >
                    {
                      article.category
                    }
                  </div>

                  {/* READ BADGE */}
                  {alreadyRead && (

                    <div
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        items-center
                        gap-2
                        rounded-full
                        bg-emerald-100
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-emerald-600
                      "
                    >

                      <CheckCircle2
                        className="
                          h-4
                          w-4
                        "
                      />

                      Dibaca

                    </div>

                  )}

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  {/* TITLE */}
                  <h3
                    className="
                      text-xl
                      font-black
                      leading-snug
                      text-slate-900
                    "
                  >
                    {
                      article.title
                    }
                  </h3>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      mt-4
                      line-clamp-3
                      leading-relaxed
                      text-slate-500
                    "
                  >
                    {
                      article.description
                    }
                  </p>

                  {/* META */}
                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <span
                      className="
                        rounded-full
                        bg-slate-100
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-slate-600
                      "
                    >
                      {
                        article.readTime
                      }
                    </span>

                    

                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      handleReadArticle(
                        article
                      )
                    }
                    className={`
                      mt-6
                      h-12
                      w-full
                      rounded-2xl
                      px-5
                      font-semibold
                      text-black
                      transition-all
                      ${
                        alreadyRead
                          ? "bg-emerald-100 hover:bg-emerald-600"
                          : "bg-blue-100 hover:bg-blue-600"
                      }
                    `}
                  >

                    {alreadyRead
                      ? "Baca Lagi"
                      : "Baca Artikel"}

                  </button>

                </div>

              </div>

            );

          }
        )}

      </div>

    </div>

  );

}