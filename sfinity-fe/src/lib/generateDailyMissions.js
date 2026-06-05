export function generateDailyMissions({

  activities,

  activeChallenges,

  completedChallenges,

}) {

  return [

    /*
    ━━━━━━━━━━━━━━━━━━━
    CHECK-IN
    ━━━━━━━━━━━━━━━━━━━
    */
    {

      id: "checkin",

      title:
        "Check-in hari ini",

      xp: 15,

      completed:
        activities.checkedIn,

      type: "checkin",

    },

    /*
    ━━━━━━━━━━━━━━━━━━━
    ARTICLE
    ━━━━━━━━━━━━━━━━━━━
    */
    {

      id: "article",

      title:
        "Baca 1 artikel finansial",

      xp: 25,

      completed:

        activities.articlesRead >
        0,

      type: "article",

    },

    /*
    ━━━━━━━━━━━━━━━━━━━
    VIDEO
    ━━━━━━━━━━━━━━━━━━━
    */
    {

      id: "video",

      title:
        "Tonton video edukasi",

      xp: 35,

      completed:

        activities.videosWatched >
        0,

      type: "video",

    },

    /*
    ━━━━━━━━━━━━━━━━━━━
    TRANSACTION
    ━━━━━━━━━━━━━━━━━━━
    */
    {

      id: "transaction",

      title:
        "Catat 1 transaksi",

      xp: 20,

      completed:

        activities.transactionsAdded >
        0,

      type: "transaction",

    },

    /*
    ━━━━━━━━━━━━━━━━━━━
    RECEIPT SCAN
    ━━━━━━━━━━━━━━━━━━━
    */
    {

      id: "scan",

      title:
        "Scan 1 receipt hari ini",

      xp: 15,

      completed:

        activities.receiptsScanned >
        0,

      type: "scan",

    },

    /*
    ━━━━━━━━━━━━━━━━━━━
    CHALLENGE START
    ━━━━━━━━━━━━━━━━━━━
    */
    {

      id: "challenge-start",

      title:
        "Mulai 1 challenge finansial",

      xp: 20,

      completed:

        activeChallenges.length >
        0,

      type: "challenge",

    },

    /*
    ━━━━━━━━━━━━━━━━━━━
    CHALLENGE COMPLETE
    ━━━━━━━━━━━━━━━━━━━
    */
    {

      id: "challenge-complete",

      title:
        "Selesaikan challenge",

      xp: 40,

      completed:

        completedChallenges.length >
        0,

      type: "challenge",

    },

  ];

}