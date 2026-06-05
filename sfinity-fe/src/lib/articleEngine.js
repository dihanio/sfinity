function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function getDynamicArticles(score) {
  /*
    KONDISI KEUANGAN BURUK (score < 50)
    Fokus: hemat, budgeting dasar, kontrol pengeluaran
  */
  if (score < 50) {
    const articles = [
      {
        id: 1,
        title: "Cara Mengatur Keuangan Pribadi dengan Cerdas",
        description:
          "Panduan lengkap mengatur keuangan pribadi: mulai dari membuat anggaran, memangkas pengeluaran tidak perlu, hingga evaluasi kondisi finansial secara berkala.",
        category: "Financial Discipline",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
        url: "https://www.cermati.com/artikel/cara-mengatur-keuangan",
        external: true,
        readTime: "6 menit baca",
      },
      {
        id: 2,
        title: "Cara Budgeting Pemula: Atur Keuangan & Hindari Boros",
        description:
          "Panduan budgeting untuk pemula dari nol: cara mencatat pengeluaran harian, membuat pos anggaran, dan strategi menabung efektif agar tidak boros.",
        category: "Budgeting",
        image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
        url: "https://www.dana.id/blog/cara-budgeting-pemula-agar-pengeluaran-tidak-boros/",
        external: true,
        readTime: "5 menit baca",
      },
      {
        id: 3,
        title: "12 Cara Atur Keuangan Rumah Tangga dengan Gaji Kecil",
        description:
          "Tips praktis mengatur pengeluaran bulanan meski gaji terbatas — dari membuat rencana belanja, memangkas cicilan, hingga menyisihkan dana darurat secara bertahap.",
        category: "Saving",
        image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6",
        url: "https://www.cermati.com/artikel/cara-atur-keuangan-rumah-tangga-dengan-gaji-kecil",
        external: true,
        readTime: "6 menit baca",
      },
      {
        id: 4,
        title: "Cara Hidup Hemat agar Bisa Menabung",
        description:
          "Kenali kebiasaan yang membuat uang cepat habis dan tips hidup hemat yang bisa langsung diterapkan agar tabungan terus bertambah setiap bulan.",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9",
        url: "https://www.cermati.com/artikel/cara-hidup-hemat-agar-bisa-menabung",
        external: true,
        readTime: "5 menit baca",
      },
      {
        id: 5,
        title: "20 Cara Menghemat Uang Belanja Bulanan Hingga 30%",
        description:
          "Strategi nyata memangkas pengeluaran belanja hingga 30%: dari memasak sendiri, menghindari membership tidak penting, hingga belanja sesuai daftar kebutuhan.",
        category: "Saving",
        image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d",
        url: "https://www.finansialku.com/perencana-keuangan/cara-menghemat-uang-belanja-bulanan-rumah-tangga/",
        external: true,
        readTime: "5 menit baca",
      },
      {
        id: 6,
        title: "Tips Hemat Pengeluaran Makan Tanpa Mengorbankan Kualitas",
        description:
          "Cara efektif mengurangi pengeluaran makan dan delivery tanpa harus menurunkan kualitas hidup — cocok untuk kamu yang sering pesan makanan online.",
        category: "Food Budget",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        url: "https://www.allianz.co.id/explore/tips-hemat-pengeluaran-makan-tanpa-mengorbankan-kualitas.html",
        external: true,
        readTime: "5 menit baca",
      },
      {
        id: 7,
        title: "11 Tips Efektif Cara Menghemat Uang Sehari-hari",
        description:
          "Mulai dari membuat anggaran bulanan, memisahkan rekening tabungan, hingga menghindari pengeluaran impulsif — semua langkah mudah untuk diterapkan.",
        category: "Finance Reset",
        image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
        url: "https://flin.co.id/blog/cara-menghemat-uang/",
        external: true,
        readTime: "5 menit baca",
      },
      {
        id: 8,
        title: "Tidak Ada Kata Terlambat Untuk Dana Darurat",
        description:
          "Panduan OJK membangun dana darurat: berapa idealnya, di mana menyimpannya, dan cara memulai dari nominal kecil agar siap menghadapi kondisi darurat.",
        category: "Emergency Fund",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
        url: "https://sikapiuangmu.ojk.go.id/FrontEnd/CMS/Article/20586",
        external: true,
        readTime: "5 menit baca",
      },
      {
        id: 9,
        title: "Tips dan Cara Menghitung Dana Darurat",
        description:
          "Pelajari cara menghitung kebutuhan dana darurat sesuai kondisi finansialmu — lajang, menikah, atau punya tanggungan — beserta pilihan instrumen penyimpanannya.",
        category: "Emergency Fund",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
        url: "https://www.btn.co.id/id/About/Gallery/Article/Article/Listing/2025/11/25/dana-darurat",
        external: true,
        readTime: "5 menit baca",
      },
      {
        id: 10,
        title: "Tips Belanja Bulanan Hemat: Panduan Lengkap Mengatur Pengeluaran",
        description:
          "Cara mengontrol arus kas bulanan agar pengeluaran tidak melebihi pemasukan, termasuk strategi membuat daftar belanja dan memanfaatkan promo secara cerdas.",
        category: "Cash Flow",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
        url: "https://www.liputan6.com/feeds/read/5796345/tips-belanja-bulanan-hemat-panduan-lengkap-mengatur-pengeluaran",
        external: true,
        readTime: "6 menit baca",
      },
    ];

    return shuffleArray(articles).slice(0, 2);
  }

  /*
    NORMAL (score 50–74)
    Fokus: menabung lebih baik, mulai investasi, bangun kebiasaan finansial
  */
  if (score < 75) {
    const articles = [
      {
        id: 11,
        title: "Strategi Menabung Bulanan agar Konsisten",
        description:
          "Cara membangun kebiasaan menabung rutin setiap bulan: mulai dari menentukan target, mengatur pos anggaran, hingga otomasi tabungan agar tidak tergoda dipakai.",
        category: "Saving",
        image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d",
        url: "https://www.cermati.com/artikel/strategi-menabung-bulanan-agar-konsisten",
        external: true,
        readTime: "6 menit baca",
      },
      {
        id: 12,
        title: "Panduan Seputar Investasi dan Cara Memulainya",
        description:
          "Kenali berbagai instrumen investasi — reksa dana, saham, obligasi, properti — beserta cara memulai investasi pertama kamu secara aman dan sesuai profil risiko.",
        category: "Investment",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        url: "https://invest.cermati.com/artikel/investasi",
        external: true,
        readTime: "8 menit baca",
      },
      {
        id: 13,
        title: "3 Cara Mengatur Gaji untuk Investasi",
        description:
          "Tips mengalokasikan gaji bulanan agar bisa mulai berinvestasi secara konsisten: mulai dari budgeting, menentukan instrumen yang tepat, hingga strategi menambah nominal secara bertahap.",
        category: "Cash Flow",
        image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818",
        url: "https://invest.cermati.com/artikel/mengatur-gaji-untuk-investasi",
        external: true,
        readTime: "5 menit baca",
      },
      {
        id: 14,
        title: "14 Tips Menabung Mudah untuk Capai Tujuan Finansial",
        description:
          "Tips dari berbagai sumber terpercaya untuk mulai menabung secara disiplin — termasuk cara memisahkan rekening, menyisihkan sisa belanja, dan melunasi utang sebelum menabung.",
        category: "Habit",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        url: "https://www.btn.co.id/id/About/Gallery/Article/Article/Listing/2025/09/12/Tips-Menabung",
        external: true,
        readTime: "6 menit baca",
      },
      {
        id: 15,
        title: "8 Tips Menabung Dana Darurat Tanpa Stress",
        description:
          "Cara membangun dana darurat secara konsisten dengan strategi 50-30-20, memilih instrumen yang tepat, dan mengoptimalkan tabungan tanpa merasa terbebani.",
        category: "Saving",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
        url: "https://www.investasiku.id/eduvest/keuangan/tips-menabung-dana-darurat",
        external: true,
        readTime: "5 menit baca",
      },
      {
        id: 16,
        title: "7 Cara Investasi Reksa Dana untuk Pemula Supaya Tidak Rugi",
        description:
          "Panduan lengkap memulai investasi reksa dana: memilih jenis reksa dana sesuai tujuan, menentukan profil risiko, dan diversifikasi portofolio agar tidak merugi.",
        category: "Mutual Fund",
        image: "https://images.unsplash.com/photo-1554224155-1696413565d3",
        url: "https://www.banksinarmas.com/id/artikel/7-cara-investasi-reksadana-pemula",
        external: true,
        readTime: "7 menit baca",
      },
      {
        id: 17,
        title: "8 Tips Investasi untuk Pemula",
        description:
          "Tips OJK dan para ahli untuk pemula yang ingin mulai berinvestasi: dari membangun dana darurat terlebih dahulu, memilih instrumen, hingga menghindari investasi bodong.",
        category: "Budgeting",
        image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766",
        url: "https://finansial.bisnis.com/read/20210914/55/1441936/simak-ya-ini-8-tips-investasi-untuk-pemula",
        external: true,
        readTime: "6 menit baca",
      },
      {
        id: 18,
        title: "Cara Mengelola Keuangan Dana Darurat: Kombinasikan Menabung dan Investasi",
        description:
          "Pahami cara mengoptimalkan dana darurat dengan mengkombinasikan tabungan dan instrumen investasi rendah risiko seperti reksa dana pasar uang dan deposito.",
        category: "Investment",
        image: "https://images.unsplash.com/photo-1518186233392-c232efbf2373",
        url: "https://www.investasiku.id/eduvest/keuangan/cara-mengelola-keuangan-dana-darurat",
        external: true,
        readTime: "6 menit baca",
      },
      {
        id: 19,
        title: "4 Langkah Melakukan Diversifikasi Portofolio Investasi",
        description:
          "Cara menyebarkan investasi ke berbagai instrumen agar risiko kerugian berkurang — panduan diversifikasi portofolio reksa dana, saham, emas, dan obligasi.",
        category: "Finance",
        image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
        url: "https://www.cermati.com/artikel/4-langkah-melakukan-diversifikasi-portofolio-investasi",
        external: true,
        readTime: "5 menit baca",
      },
      {
        id: 20,
        title: "Hal-Hal Penting Seputar Perencanaan Hari Tua & Pensiun",
        description:
          "Panduan mempersiapkan dana pensiun dari dini: menentukan target, memilih instrumen investasi jangka panjang, dan menghitung kebutuhan hidup di masa tua.",
        category: "Retirement",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        url: "https://www.investasiku.id/eduvest/keuangan/perencanaan-pensiun",
        external: true,
        readTime: "7 menit baca",
      },
    ];

    return shuffleArray(articles).slice(0, 2);
  }

  /*
    KONDISI KEUANGAN BAIK (score >= 75)
    Fokus: wealth building, passive income, optimasi investasi
  */
  const articles = [
    {
      id: 21,
      title: "Strategi Membangun Passive Income untuk Kebebasan Finansial",
      description:
        "Berbagai cara membangun penghasilan pasif jangka panjang — dari investasi saham dan reksa dana, properti sewa, hingga bisnis yang bisa berjalan sendiri.",
      category: "Wealth Building",
      image: "https://images.unsplash.com/photo-1559526324-593bc073d938",
      url: "https://www.dipostar.com/berita/detail/strategi-membangun-passive-income-untuk-kebebasan-finansial",
      external: true,
      readTime: "7 menit baca",
    },
    {
      id: 22,
      title: "Belajar Investasi Saham Pemula untuk FIRE",
      description:
        "Panduan investasi saham untuk pemula yang ingin mencapai Financial Independence — kenapa saham menjadi instrumen terbaik untuk FIRE dan cara memulainya.",
      category: "Investment",
      image: "https://images.unsplash.com/photo-1518186233392-c232efbf2373",
      url: "https://danirachmat.com/belajar-investasi-saham-pemula-fire/",
      external: true,
      readTime: "9 menit baca",
    },
    {
      id: 23,
      title: "Diversifikasi Reksa Dana dan SBN: Strategi Cerdas Minimalkan Risiko",
      description:
        "Cara membangun portofolio investasi yang seimbang dengan mengkombinasikan reksa dana dan Surat Berharga Negara (SBN) untuk pertumbuhan optimal dengan risiko terkendali.",
      category: "Portfolio",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      url: "https://invest.cermati.com/artikel/diversifikasi-reksa-dana-dan-sbn",
      external: true,
      readTime: "7 menit baca",
    },
    {
      id: 24,
      title: "5 Tips Agar Bisa Merdeka Finansial",
      description:
        "Strategi mencapai kebebasan finansial dari Bareksa: mengetahui alur pengeluaran, membangun passive income melalui reksa dana dan saham, hingga konsisten berinvestasi.",
      category: "Wealth",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
      url: "https://www.bareksa.com/berita/reksa-dana/2019-07-12/hut-kemerdekaan-ri-ini-lima-tips-agar-bisa-merdeka-finansial",
      external: true,
      readTime: "6 menit baca",
    },
    {
      id: 25,
      title: "Panduan Lengkap Investasi: Cara Memilih dan Memulainya",
      description:
        "Pelajari berbagai jenis aset investasi — reksa dana, saham, properti, obligasi — dan strategi mengembangkan nilai aset untuk pertumbuhan kekayaan jangka panjang.",
      category: "Asset Growth",
      image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
      url: "https://invest.cermati.com/artikel/investasi",
      external: true,
      readTime: "8 menit baca",
    },
    {
      id: 26,
      title: "Menabung: Kebebasan Finansial di Masa Depan",
      description:
        "Memahami konsep kebebasan finansial lewat kombinasi menabung dan investasi — bagaimana uang bisa tumbuh melalui saham, obligasi, dan reksa dana pendapatan tetap.",
      category: "Financial Freedom",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
      url: "https://www.kompasiana.com/hadasanababan3232/67b21dc9ed64152b9f02f052/menabung-kebebasan-finansial-di-masa-depan",
      external: true,
      readTime: "7 menit baca",
    },
    {
      id: 27,
      title: "Mengapa Reksa Dana Cocok untuk Investor Pemula",
      description:
        "Keunggulan reksa dana dibanding instrumen lain: dikelola manajer investasi profesional, diversifikasi otomatis, modal awal kecil, dan cocok untuk semua profil risiko.",
      category: "Stock Market",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      url: "https://www.makmur.id/id/blog/artikel/ini-alasan-mengapa-reksa-dana-cocok-untuk-investor-pemula",
      external: true,
      readTime: "6 menit baca",
    },
    {
      id: 28,
      title: "Cara Mengatur Gaji untuk Investasi: 3 Langkah Praktis",
      description:
        "Bangun beberapa sumber penghasilan dengan mengalokasikan gaji secara cerdas — dari menentukan persentase investasi hingga memilih instrumen yang sesuai tujuan finansial.",
      category: "Income",
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
      url: "https://invest.cermati.com/artikel/mengatur-gaji-untuk-investasi",
      external: true,
      readTime: "5 menit baca",
    },
    {
      id: 29,
      title: "Investasi Saham Pemula: Strategi Membeli dan Menjual Saham",
      description:
        "Strategi investasi saham dari OJK — kapan waktu terbaik membeli dan menjual saham, analisis fundamental vs teknikal, serta cara mitigasi risiko kerugian.",
      category: "Mindset",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
      url: "https://sikapiuangmu.ojk.go.id/FrontEnd/CMS/Article/10433",
      external: true,
      readTime: "7 menit baca",
    },
    {
      id: 30,
      title: "Pilihan Reksa Dana Pendapatan Tetap Terbaik 2026",
      description:
        "Kenali konsep Financial Independence Retire Early (FIRE) lewat instrumen reksa dana pendapatan tetap — strategi investasi jangka menengah hingga panjang untuk pensiun dini.",
      category: "FIRE",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      url: "https://invest.cermati.com/artikel/pilihan-reksa-dana-pendapatan-tetap-terbaik",
      external: true,
      readTime: "8 menit baca",
    },
  ];

  return shuffleArray(articles).slice(0, 2);
}