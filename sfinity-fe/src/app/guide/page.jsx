"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const guideCategories = [
  {
    title: "📖 Tentang Sfinity",
    items: [
      {
        question: "Apa itu Sfinity?",
        answer: "Sfinity adalah aplikasi Smart Finance untuk mahasiswa yang membantu mencatat transaksi, mengelola budget, memantau kesehatan finansial, serta meningkatkan kebiasaan finansial melalui sistem gamifikasi.",
      },
      {
        question: "Siapa yang dapat menggunakan Sfinity?",
        answer: "Sfinity dirancang khusus untuk mahasiswa, namun dapat digunakan oleh siapa saja yang ingin mengelola keuangan pribadi dengan lebih teratur.",
      },
      {
        question: "Apa tujuan utama Sfinity?",
        answer: "Sfinity membantu pengguna memahami kondisi keuangan mereka, membangun kebiasaan finansial yang sehat, dan membuat keputusan keuangan yang lebih baik.",
      },
    ],
  },
  {
    title: "📊 Financial Health Score",
    items: [
      {
        question: "Apa itu Financial Health Score?",
        answer: "Financial Health Score adalah skor yang menggambarkan kondisi kesehatan finansial pengguna berdasarkan pemasukan, pengeluaran, tabungan, dan distribusi pengeluaran.",
      },
      {
        question: "Bagaimana Financial Health Score dihitung?",
        answer: "Skor dihitung menggunakan saving ratio, expense ratio, serta pola distribusi pengeluaran pengguna.",
      },
      {
        question: "Berapa skor maksimal Financial Health Score?",
        answer: "Skor maksimal adalah 100.",
      },
      {
        question: "Apa arti status Sangat Sehat?",
        answer: "Status Sangat Sehat menunjukkan bahwa pengguna memiliki pola pengelolaan keuangan yang baik dan seimbang.",
      },
      {
        question: "Bagaimana cara meningkatkan Financial Health Score?",
        answer: "Kurangi pengeluaran yang tidak perlu, tingkatkan tabungan, dan pertahankan distribusi pengeluaran yang sehat.",
      },
    ],
  },
  {
    title: "🤖 AI Recommendation",
    items: [
      {
        question: "Apa itu AI Recommendation?",
        answer: "AI Recommendation adalah fitur yang memberikan rekomendasi keuangan yang dipersonalisasi berdasarkan kondisi finansial pengguna.",
      },
      {
        question: "Bagaimana AI Recommendation bekerja?",
        answer: "Sistem menganalisis Financial Health Score, pola pemasukan, pengeluaran, serta kebiasaan finansial pengguna untuk menghasilkan rekomendasi yang relevan.",
      },
      {
        question: "Mengapa rekomendasi setiap pengguna berbeda?",
        answer: "Setiap pengguna memiliki kondisi finansial yang berbeda sehingga rekomendasi yang diberikan juga akan berbeda.",
      },
      {
        question: "Apakah AI Recommendation selalu benar?",
        answer: "Rekomendasi diberikan berdasarkan pola data yang tersedia dan sebaiknya digunakan sebagai bahan pertimbangan.",
      },
    ],
  },
  {
    title: "📰 Artikel Finansial",
    items: [
      {
        question: "Apa itu Artikel Finansial?",
        answer: "Artikel Finansial berisi edukasi dan tips pengelolaan keuangan yang disesuaikan dengan kondisi finansial pengguna.",
      },
      {
        question: "Mengapa artikel yang saya lihat berbeda?",
        answer: "Artikel dipersonalisasi berdasarkan kondisi keuangan dan Financial Health Score pengguna.",
      },
      {
        question: "Bagaimana artikel dipilih?",
        answer: "Sistem mencocokkan kondisi finansial pengguna dengan kategori artikel yang paling relevan.",
      },
    ],
  },
  {
    title: "🧠 Financial Analysis & Machine Learning",
    items: [
      {
        question: "Apa itu Financial Analysis?",
        answer: "Financial Analysis memberikan insight kondisi keuangan berdasarkan data transaksi pengguna.",
      },
      {
        question: "Apa yang dianalisis dalam Financial Analysis?",
        answer: "Pemasukan, pengeluaran, saving ratio, expense ratio, dan distribusi pengeluaran.",
      },
      {
        question: "Bagaimana Machine Learning digunakan dalam Sfinity?",
        answer: "Machine Learning digunakan untuk mengenali pola keuangan pengguna dan menghasilkan insight yang lebih personal.",
      },
      {
        question: "Fitur apa saja yang menggunakan AI?",
        answer: "AI digunakan pada AI Receipt Scanner, AI Recommendation, Financial Analysis, dan personalisasi artikel finansial.",
      },
      {
        question: "Apakah Machine Learning akan belajar dari data saya?",
        answer: "Machine Learning digunakan untuk mengenali pola keuangan dan menghasilkan insight yang lebih personal berdasarkan data yang tersedia.",
      },
      {
        question: "Mengapa Financial Health Score saya berbeda dengan teman saya?",
        answer: "Skor dihitung berdasarkan kondisi finansial masing-masing pengguna sehingga hasilnya dapat berbeda.",
      },
      {
        question: "Apakah saya perlu mencatat transaksi setiap hari?",
        answer: "Pencatatan rutin membantu sistem menghasilkan analisis, rekomendasi, dan Financial Health Score yang lebih akurat.",
      },
    ],
  },
  {
    title: "📷 AI Receipt Scanner",
    items: [
      {
        question: "Apa itu AI Receipt Scanner?",
        answer: "AI Receipt Scanner membantu membaca informasi pada struk dan mengubahnya menjadi data transaksi.",
      },
      {
        question: "Bagaimana AI Receipt Scanner bekerja?",
        answer: "AI menganalisis gambar struk dan mengekstrak informasi penting secara otomatis.",
      },
      {
        question: "Kenapa hasil scan tidak selalu akurat?",
        answer: "Akurasi dipengaruhi kualitas foto, pencahayaan, dan kondisi struk.",
      },
    ],
  },
  {
    title: "🎯 Budget Planner",
    items: [
      {
        question: "Apa itu Budget Planner?",
        answer: "Budget Planner membantu pengguna menentukan batas pengeluaran pada setiap kategori.",
      },
      {
        question: "Apa yang terjadi jika budget terlampaui?",
        answer: "Sfinity akan memberikan indikator dan peringatan kepada pengguna.",
      },
      {
        question: "Apakah budget akan reset setiap bulan?",
        answer: "Ya. Budget mengikuti periode bulanan.",
      },
    ],
  },
  {
    title: "🏆 XP & Achievement",
    items: [
      {
        question: "Bagaimana cara mendapatkan XP?",
        answer: "XP diperoleh dari aktivitas seperti transaksi, scan struk, check-in harian, dan misi.",
      },
      {
        question: "Apa manfaat naik level?",
        answer: "Level menunjukkan progres dan konsistensi pengguna dalam mengelola keuangan.",
      },
      {
        question: "Bagaimana Achievement diperoleh?",
        answer: "Achievement terbuka otomatis ketika pengguna mencapai milestone tertentu.",
      },
    ],
  },
  {
    title: "📈 Dashboard & Laporan",
    items: [
      {
        question: "Apa fungsi Dashboard?",
        answer: "Dashboard menampilkan ringkasan kondisi keuangan, rekomendasi, artikel, dan insight finansial.",
      },
      {
        question: "Bagaimana cara membaca laporan keuangan?",
        answer: "Laporan menampilkan pemasukan, pengeluaran, rasio keuangan, dan tren aktivitas finansial.",
      },
    ],
  },
  {
    title: "🔒 Akun & Keamanan",
    items: [
      {
        question: "Apakah data keuangan saya aman?",
        answer: "Ya. Data pengguna disimpan secara aman dan digunakan hanya untuk kebutuhan aplikasi.",
      },
      {
        question: "Apakah data saya akan hilang jika logout?",
        answer: "Tidak. Data tetap tersimpan pada akun pengguna.",
      },
    ],
  },
  {
    title: "🚀 Pengembangan Selanjutnya",
    items: [
      {
        question: "Apakah Sfinity akan memiliki fitur prediksi keuangan?",
        answer: "Pengembangan berikutnya memungkinkan sistem memprediksi kondisi finansial berdasarkan pola transaksi sebelumnya.",
      },
      {
        question: "Apakah Sfinity dapat memberikan peringatan risiko finansial?",
        answer: "Ya, fitur ini direncanakan untuk membantu pengguna mendeteksi risiko finansial lebih awal.",
      },
    ],
  },
];

export default function GuidePage() {
  const [search, setSearch] = useState("");
  const [openCategory, setOpenCategory] = useState({});
  const [openQuestion, setOpenQuestion] = useState({});

  const filteredCategories = guideCategories
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(search.toLowerCase()) ||
          item.answer.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <Link
              href="/dashboard"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-100"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>

            <div>
              <h1 className="text-4xl font-black text-slate-900">Panduan Sfinity</h1>
              <p className="mt-2 max-w-3xl text-slate-500">
                Pelajari fitur, Financial Health Score, Budget Planner, Achievement,
                AI Receipt Scanner, dan sistem lainnya dalam aplikasi Sfinity.
              </p>
            </div>
          </div>

          {/* SEARCH INPUT */}
          <input
            type="text"
            placeholder="Cari panduan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition-all focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* CONTENT */}
        {filteredCategories.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <h3 className="font-semibold text-slate-900">Panduan tidak ditemukan</h3>
            <p className="mt-2 text-slate-500">Coba gunakan kata kunci lain.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredCategories.map((category, categoryIndex) => {
              const isCategoryOpen = openCategory[categoryIndex];

              return (
                <div
                  key={category.title}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
                >
                  <button
                    onClick={() =>
                      setOpenCategory((prev) => ({
                        ...prev,
                        [categoryIndex]: !prev[categoryIndex],
                      }))
                    }
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <h2 className="text-lg font-bold text-slate-900">{category.title}</h2>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${
                        isCategoryOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isCategoryOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden border-t border-slate-100">
                      {category.items.map((item, questionIndex) => {
                        const key = `${categoryIndex}-${questionIndex}`;
                        const isQuestionOpen = openQuestion[key];

                        return (
                          <div key={item.question} className="border-b border-slate-100 last:border-b-0">
                            <button
                              onClick={() =>
                                setOpenQuestion((prev) => ({
                                  ...prev,
                                  [key]: !prev[key],
                                }))
                              }
                              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                            >
                              <span className="font-medium text-slate-800">{item.question}</span>
                              <ChevronDown
                                className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                                  isQuestionOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            <div
                              className={`grid transition-all duration-300 ${
                                isQuestionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                              }`}
                            >
                              <div className="overflow-hidden">
                                <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}