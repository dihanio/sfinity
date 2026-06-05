export const missionPool = {

  /*
  ━━━━━━━━━━━━━━━━━━━
  CHECK-IN
  ━━━━━━━━━━━━━━━━━━━
  */
  checkin: [

    {
      id: 1,

      title:
        "Check-in hari ini",

      xp: 10,

      type:
        "checkin",

      requirement: 1,
    },

    {
      id: 2,

      title:
        "Check-in sebelum jam 9 pagi",

      xp: 20,

      type:
        "checkin",

      requirement: 1,
    },

    {
      id: 3,

      title:
        "Pertahankan streak hari ini",

      xp: 25,

      type:
        "checkin",

      requirement: 1,
    },

  ],

  /*
  ━━━━━━━━━━━━━━━━━━━
  TRANSACTION
  ━━━━━━━━━━━━━━━━━━━
  */
  transaction: [

    {
      id: 4,

      title:
        "Catat 1 transaksi",

      xp: 15,

      type:
        "transaction",

      requirement: 1,
    },

    {
      id: 5,

      title:
        "Catat 3 transaksi",

      xp: 35,

      type:
        "transaction",

      requirement: 3,
    },

    {
      id: 6,

      title:
        "Tambah pemasukan hari ini",

      xp: 30,

      type:
        "transaction",

      requirement: 1,

      transactionType:
        "income",
    },

    {
      id: 7,

      title:
        "Catat transaksi expense",

      xp: 20,

      type:
        "transaction",

      requirement: 1,

      transactionType:
        "expense",
    },

    {
      id: 8,

      title:
        "Catat transaksi tanpa telat",

      xp: 40,

      type:
        "transaction",

      requirement: 5,
    },

  ],

  /*
  ━━━━━━━━━━━━━━━━━━━
  RECEIPT SCAN
  ━━━━━━━━━━━━━━━━━━━
  */
  scan: [

    {
      id: 9,

      title:
        "Scan 1 receipt",

      xp: 15,

      type:
        "scan",

      requirement: 1,
    },

    {
      id: 10,

      title:
        "Scan 3 receipt",

      xp: 40,

      type:
        "scan",

      requirement: 3,
    },

    {
      id: 11,

      title:
        "Gunakan live scanner",

      xp: 25,

      type:
        "scan",

      requirement: 1,
    },

    {
      id: 12,

      title:
        "Simpan hasil OCR ke transaksi",

      xp: 30,

      type:
        "scan",

      requirement: 1,
    },

    {
      id: 13,

      title:
        "Scan receipt tanpa gagal",

      xp: 50,

      type:
        "scan",

      requirement: 5,
    },

  ],

  /*
  ━━━━━━━━━━━━━━━━━━━
  ARTICLE
  ━━━━━━━━━━━━━━━━━━━
  */
  article: [

    {
      id: 14,

      title:
        "Baca 1 artikel finansial",

      xp: 20,

      type:
        "article",

      requirement: 1,
    },

    {
      id: 15,

      title:
        "Baca 2 artikel finansial",

      xp: 35,

      type:
        "article",

      requirement: 2,
    },

    {
      id: 16,

      title:
        "Selesaikan artikel edukasi",

      xp: 25,

      type:
        "article",

      requirement: 1,
    },

    {
      id: 17,

      title:
        "Pelajari tips budgeting hari ini",

      xp: 20,

      type:
        "article",

      requirement: 1,
    },

  ],

  /*
  ━━━━━━━━━━━━━━━━━━━
  VIDEO
  ━━━━━━━━━━━━━━━━━━━
  */
  video: [

    {
      id: 18,

      title:
        "Tonton video edukasi",

      xp: 25,

      type:
        "video",

      requirement: 1,
    },

    {
      id: 19,

      title:
        "Selesaikan 1 video edukasi",

      xp: 45,

      type:
        "video",

      requirement: 1,
    },

    {
      id: 20,

      title:
        "Pelajari investasi dasar",

      xp: 30,

      type:
        "video",

      requirement: 1,
    },

    {
      id: 21,

      title:
        "Tonton video budgeting",

      xp: 25,

      type:
        "video",

      requirement: 1,
    },

  ],

  /*
  ━━━━━━━━━━━━━━━━━━━
  CHALLENGE
  ━━━━━━━━━━━━━━━━━━━
  */
  challenge: [

    {
      id: 22,

      title:
        "Mulai challenge baru",

      xp: 25,

      type:
        "challenge",

      requirement: 1,
    },

    {
      id: 23,

      title:
        "Selesaikan challenge",

      xp: 60,

      type:
        "challenge",

      requirement: 1,
    },

    {
      id: 24,

      title:
        "Pertahankan challenge aktif",

      xp: 35,

      type:
        "challenge",

      requirement: 1,
    },

    {
      id: 25,

      title:
        "Selesaikan challenge tanpa gagal",

      xp: 80,

      type:
        "challenge",

      requirement: 1,
    },

  ],

};