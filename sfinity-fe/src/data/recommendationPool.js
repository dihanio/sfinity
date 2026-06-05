// src/data/recommendationPool.js

export const recommendationPool = [

  /*
  ━━━━━━━━━━━━━━━━━━━
  BEGINNER TIPS
  SCORE 0 - 40
  ━━━━━━━━━━━━━━━━━━━
  */
  {
    id: 1,
    type: "tip",
    category: "food",
    conditions: {
      minScore: 0,
      maxScore: 40,
      minFoodExpense: 200000,
    },
    priority: 10,
    title: "Kurangi Makan Delivery",
    description:
      "Pengeluaran delivery cukup tinggi minggu ini.",
    icon: "🍔",
    url: "/insights/food-expense",
  },

  {
    id: 2,
    type: "tip",
    category: "coffee",
    conditions: {
      minScore: 0,
      maxScore: 40,
    },
    priority: 8,
    title: "Kurangi Ngopi Cafe",
    description:
      "Coba kurangi kopi cafe untuk hemat mingguan.",
    icon: "☕",
    url: "/insights/coffee",
  },

  {
    id: 3,
    type: "tip",
    category: "budget",
    conditions: {
      minScore: 0,
      maxScore: 40,
    },
    priority: 8,
    title: "Gunakan Budget Harian",
    description:
      "Batasi pengeluaran harian agar lebih terkontrol.",
    icon: "📊",
    url: "/budget",
  },

  {
    id: 4,
    type: "tip",
    category: "habit",
    conditions: {
      minScore: 0,
      maxScore: 40,
    },
    priority: 7,
    title: "Catat Semua Pengeluaran",
    description:
      "Tracking membantu melihat pola boros.",
    icon: "📝",
    url: "/transactions",
  },

  {
    id: 5,
    type: "tip",
    category: "shopping",
    conditions: {
      minScore: 0,
      maxScore: 40,
    },
    priority: 7,
    title: "Hindari Impulse Buying",
    description:
      "Tunggu 24 jam sebelum membeli barang.",
    icon: "🛒",
    url: "/insights/shopping",
  },

  /*
  ━━━━━━━━━━━━━━━━━━━
  INTERMEDIATE TIPS
  SCORE 41 - 70
  ━━━━━━━━━━━━━━━━━━━
  */
  {
    id: 6,
    type: "tip",
    category: "saving",
    conditions: {
      minScore: 41,
      maxScore: 70,
      maxSavingRatio: 20,
    },
    priority: 10,
    title: "Tambah Tabungan Mingguan",
    description:
      "Idealnya tabungan minimal 20% dari income.",
    icon: "💰",
    url: "/insights/save-money",
  },

  {
    id: 7,
    type: "tip",
    category: "transport",
    conditions: {
      minScore: 41,
      maxScore: 70,
      minTransportExpense: 200000,
    },
    priority: 8,
    title: "Gabungkan Perjalanan",
    description:
      "Kurangi ongkos transport dengan sekali jalan.",
    icon: "🚗",
    url: "/insights/transport",
  },

  {
    id: 8,
    type: "tip",
    category: "saving",
    conditions: {
      minScore: 41,
      maxScore: 70,
    },
    priority: 7,
    title: "Sisihkan Uang di Awal",
    description:
      "Tabungan lebih efektif dilakukan di awal.",
    icon: "🏦",
    url: "/insights/save-money",
  },

  {
    id: 9,
    type: "tip",
    category: "subscription",
    conditions: {
      minScore: 41,
      maxScore: 70,
      minEntertainmentExpense: 150000,
    },
    priority: 7,
    title: "Kurangi Subscription",
    description:
      "Cek subscription yang jarang digunakan.",
    icon: "📺",
    url: "/insights/entertainment",
  },

  {
    id: 10,
    type: "tip",
    category: "meal",
    conditions: {
      minScore: 41,
      maxScore: 70,
    },
    priority: 6,
    title: "Coba Meal Prep Mingguan",
    description:
      "Meal prep membantu hemat pengeluaran makan.",
    icon: "🍱",
    url: "/insights/food-expense",
  },

  /*
  ━━━━━━━━━━━━━━━━━━━
  ADVANCED TIPS
  SCORE 71 - 100
  ━━━━━━━━━━━━━━━━━━━
  */
  {
    id: 11,
    type: "tip",
    category: "investment",
    conditions: {
      minScore: 71,
    },
    priority: 9,
    title: "Mulai Diversifikasi Investasi",
    description:
      "Jangan simpan semua dana di satu aset.",
    icon: "📈",
    url: "/insights/investment",
  },

  {
    id: 12,
    type: "tip",
    category: "wealth",
    conditions: {
      minScore: 71,
    },
    priority: 9,
    title: "Bangun Passive Income",
    description:
      "Cari penghasilan tambahan jangka panjang.",
    icon: "🏦",
    url: "/insights/passive-income",
  },

  {
    id: 13,
    type: "tip",
    category: "asset",
    conditions: {
      minScore: 71,
    },
    priority: 8,
    title: "Evaluasi Asset Tahunan",
    description:
      "Review perkembangan asset secara rutin.",
    icon: "💎",
    url: "/insights/assets",
  },

  {
    id: 14,
    type: "tip",
    category: "finance",
    conditions: {
      minScore: 71,
    },
    priority: 8,
    title: "Buat Target Finansial Baru",
    description:
      "Naikkan target finansial bulananmu.",
    icon: "🎯",
    url: "/goals",
  },

  {
    id: 15,
    type: "tip",
    category: "wealth",
    conditions: {
      minScore: 71,
    },
    priority: 7,
    title: "Tingkatkan Dana Darurat",
    description:
      "Idealnya dana darurat 6x pengeluaran.",
    icon: "🛡️",
    url: "/insights/emergency-fund",
  },

  /*
  ━━━━━━━━━━━━━━━━━━━
  VIDEOS
  Sumber: YouTube kreator keuangan Indonesia terpercaya
  ━━━━━━━━━━━━━━━━━━━
  */

  // SCORE 0–40: Budgeting & Financial Habit Pemula
  {
    id: 101,
    type: "video",
    category: "budgeting",
    conditions: {
      minScore: 0,
      maxScore: 40,
    },
    priority: 7,
    // Judul asli: "CARA BUDGETING BULANAN TERMUDAH UNTUK PEMULA"
    // Channel: Jovita Christy | views: tinggi
    title: "Cara Budgeting Bulanan Termudah untuk Pemula",
    description:
      "Cara membuat budgeting bulanan dari nol — cocok untuk pemula yang mau mulai atur keuangan.",
    icon: "🎥",
    url: "https://www.youtube.com/watch?v=V4_G8P9s7jo",
  },

  {
    id: 102,
    type: "video",
    category: "saving",
    conditions: {
      minScore: 0,
      maxScore: 40,
    },
    priority: 7,
    // Judul asli: "CARA HEMAT ALA ORANG JEPANG DENGAN KAKEIBO"
    // Channel: Ngomongin Uang | kreator keuangan populer Indonesia
    title: "Cara Hemat Ala Orang Jepang dengan Kakeibo",
    description:
      "Metode Kakeibo dari Jepang untuk mencatat pengeluaran dan membangun kebiasaan finansial sehat.",
    icon: "🧠",
    url: "https://www.youtube.com/watch?v=2KBSsYoJGWs",
  },

  // SCORE 41–70: Tips Menabung & Investasi Pemula
  {
    id: 103,
    type: "video",
    category: "saving",
    conditions: {
      minScore: 41,
      maxScore: 70,
    },
    priority: 7,
    // Judul asli: "Cara Hemat Tanpa Kekurangan Uang di Akhir Bulan ala Tejasari Asad"
    // Channel: NOVA | narasumber perencana keuangan
    title: "Cara Hemat Tanpa Kekurangan di Akhir Bulan",
    description:
      "Tips menabung konsisten dari perencana keuangan Tejasari Asad agar tidak boncos di akhir bulan.",
    icon: "💵",
    url: "https://www.youtube.com/watch?v=ak2S3x3Cd7I",
  },

  {
    id: 104,
    type: "video",
    category: "investment",
    conditions: {
      minScore: 41,
      maxScore: 70,
    },
    priority: 7,
    // Judul asli: "Cara Aman Gue Ubah 16rb jadi 1Miliar. Belajar Investasi Modal Kecil"
    // Channel: Raymond Chin / Ternak Uang — kreator keuangan terpopuler Indonesia
    title: "Belajar Investasi Modal Kecil untuk Pemula",
    description:
      "Panduan investasi dari modal kecil yang realistis — strategi aman memulai investasi untuk pemula.",
    icon: "📈",
    url: "https://www.youtube.com/watch?v=tPJYXW_BOkQ",
  },

  // SCORE 71+: Passive Income & Asset Management
  {
    id: 105,
    type: "video",
    category: "wealth",
    conditions: {
      minScore: 71,
    },
    priority: 7,
    // Judul asli: "CARA HEMAT UANG ALA JEPANG" — channel Ngomongin Uang
    // (konten wealth building & minimalis finansial)
    title: "Cara Hemat dan Bangun Kekayaan ala Jepang",
    description:
      "Filosofi hidup hemat Jepang yang bisa diterapkan untuk membangun passive income dan kekayaan jangka panjang.",
    icon: "🏦",
    url: "https://www.youtube.com/watch?v=H9e4FyfHlDE",
  },

  {
    id: 106,
    type: "video",
    category: "asset",
    conditions: {
      minScore: 71,
    },
    priority: 7,
    // Judul asli: "CARA HEMAT JEPANG DENGAN HIDUP MINIMALIS"
    // Channel: Ngomongin Uang | strategi mengelola aset & wealth
    title: "Strategi Kelola Aset dengan Hidup Minimalis",
    description:
      "Konsep hidup minimalis ala Jepang sebagai strategi mengembangkan dan mengelola aset secara efisien.",
    icon: "💎",
    url: "https://www.youtube.com/watch?v=-g2r9AqEIeM",
  },

  /*
  ━━━━━━━━━━━━━━━━━━━
  CHALLENGES
  ━━━━━━━━━━━━━━━━━━━
  */
  {
    id: 201,
    type: "challenge",
    category: "saving",
    conditions: {
      minScore: 0,
      maxScore: 40,
    },
    priority: 8,
    title: "No Jajan Challenge",
    description:
      "Coba tahan jajan selama 1 hari.",
    icon: "🥗",
    url: "/missions",
  },

  {
    id: 202,
    type: "challenge",
    category: "food",
    conditions: {
      minScore: 0,
      maxScore: 40,
      minFoodExpense: 250000,
    },
    priority: 8,
    title: "No Delivery Challenge",
    description:
      "Hindari pesan makanan online hari ini.",
    icon: "🍱",
    url: "/missions",
  },

  {
    id: 203,
    type: "challenge",
    category: "transport",
    conditions: {
      minScore: 41,
      maxScore: 70,
      minTransportExpense: 200000,
    },
    priority: 8,
    title: "Tanpa Ojek Online",
    description:
      "Gunakan transport alternatif hari ini.",
    icon: "🛵",
    url: "/missions",
  },

  {
    id: 204,
    type: "challenge",
    category: "saving",
    conditions: {
      minScore: 41,
      maxScore: 70,
    },
    priority: 8,
    title: "Tabung Rp20rb Hari Ini",
    description:
      "Mulai habit finansial sehat.",
    icon: "🚀",
    url: "/missions",
  },

  {
    id: 205,
    type: "challenge",
    category: "habit",
    conditions: {
      minScore: 41,
      maxScore: 70,
      minStreak: 3,
    },
    priority: 7,
    title: "Check-in 3 Hari Berturut",
    description:
      "Pertahankan streak untuk bonus XP.",
    icon: "🔥",
    url: "/missions",
  },

  {
    id: 206,
    type: "challenge",
    category: "investment",
    conditions: {
      minScore: 71,
    },
    priority: 8,
    title: "Investasi Mingguan",
    description:
      "Sisihkan dana untuk investasi minggu ini.",
    icon: "📈",
    url: "/missions",
  },

  {
    id: 207,
    type: "challenge",
    category: "wealth",
    conditions: {
      minScore: 71,
    },
    priority: 8,
    title: "Wealth Growth Challenge",
    description:
      "Naikkan total asset minggu ini.",
    icon: "💎",
    url: "/missions",
  },

  {
    id: 208,
    type: "challenge",
    category: "saving",
    conditions: {
      minScore: 71,
    },
    priority: 7,
    title: "No Spending Day",
    description:
      "Coba 1 hari tanpa pengeluaran.",
    icon: "🛡️",
    url: "/missions",
  },

  /*
  ━━━━━━━━━━━━━━━━━━━
  FALLBACK
  ━━━━━━━━━━━━━━━━━━━
  */
  {
    id: 999,
    type: "tip",
    category: "general",
    conditions: {},
    priority: 1,
    title: "Catat Pengeluaran Harian",
    description:
      "Tracking pengeluaran membantu kontrol finansial.",
    icon: "📝",
    url: "/transactions",
  },

];