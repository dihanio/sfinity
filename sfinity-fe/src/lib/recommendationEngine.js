// src/lib/recommendationEngine.js

import {
  recommendationPool,
} from "@/data/recommendationPool";

/*
━━━━━━━━━━━━━━━━━━━
SHUFFLE
━━━━━━━━━━━━━━━━━━━
*/
function shuffleArray(array) {

  return [...array].sort(
    () => Math.random() - 0.5
  );

}

/*
━━━━━━━━━━━━━━━━━━━
MATCH CONDITIONS
━━━━━━━━━━━━━━━━━━━
*/
function matchConditions(
  item,
  user
) {

  const c =
    item.conditions || {};

  /*
  SCORE
  */
  if (
    c.minScore !==
      undefined &&
    user.score <
      c.minScore
  ) {
    return false;
  }

  if (
    c.maxScore !==
      undefined &&
    user.score >
      c.maxScore
  ) {
    return false;
  }

  /*
  FOOD
  */
  if (
    c.minFoodExpense !==
      undefined &&
    user.foodExpense <
      c.minFoodExpense
  ) {
    return false;
  }

  /*
  TRANSPORT
  */
  if (
    c.minTransportExpense !==
      undefined &&
    user.transportExpense <
      c.minTransportExpense
  ) {
    return false;
  }

  /*
  ENTERTAINMENT
  */
  if (
    c.minEntertainmentExpense !==
      undefined &&
    user.entertainmentExpense <
      c.minEntertainmentExpense
  ) {
    return false;
  }

  /*
  SAVING
  */
  if (
    c.maxSavingRatio !==
      undefined &&
    user.savingRatio >
      c.maxSavingRatio
  ) {
    return false;
  }

  /*
  STREAK
  */
  if (
    c.minStreak !==
      undefined &&
    user.streak <
      c.minStreak
  ) {
    return false;
  }

  return true;

}

/*
━━━━━━━━━━━━━━━━━━━
GENERATE
━━━━━━━━━━━━━━━━━━━
*/
export function
generateRecommendations({

  score,

  foodExpense,

  transportExpense,

  entertainmentExpense,

  savingRatio,

  streak,

}) {

  const user = {

    score,

    foodExpense,

    transportExpense,

    entertainmentExpense,

    savingRatio,

    streak,

  };

  /*
  FILTER
  */
  let filtered =
    recommendationPool.filter(
      (item) =>
        matchConditions(
          item,
          user
        )
    );

  /*
  SORT PRIORITY
  */
  filtered.sort(
    (a, b) =>
      b.priority -
      a.priority
  );

  /*
  GROUP
  */
  const tips =
    filtered.filter(
      (item) =>
        item.type ===
        "tip"
    );

  const videos =
    filtered.filter(
      (item) =>
        item.type ===
        "video"
    );

  const challenges =
    filtered.filter(
      (item) =>
        item.type ===
        "challenge"
    );

  /*
  PICK MULTIPLE
  */
  let results = [

    /*
    TIPS
    */
    ...shuffleArray(
      tips
    ).slice(0, 1),

    /*
    VIDEOS
    */
    ...shuffleArray(
      videos
    ).slice(0, 1),

    /*
    CHALLENGES
    */
    ...shuffleArray(
      challenges
    ).slice(0, 1),

  ];

  /*
  REMOVE DUPLICATE
  */
  results =
    results.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (x) =>
            x.id ===
            item.id
        )
    );

  /*
  FALLBACK
  */
  if (
    results.length === 0
  ) {

    results = [

      {
        id: 999,

        type: "tip",

        category:
          "general",

        conditions: {},

        priority: 1,

        title:
          "Catat Pengeluaran Harian",

        description:
          "Tracking pengeluaran membantu kontrol finansial lebih baik.",

        icon: "📝",

        url:
          "/transactions",
      },

    ];

  }

  return results;

}
