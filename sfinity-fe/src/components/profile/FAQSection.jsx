import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Apa itu SFINITY?",
    answer: "SFINITY adalah platform manajemen keuangan pintar yang memanfaatkan teknologi AI untuk menganalisis perilaku pengeluaranmu, memberikan rekomendasi personal, dan memproyeksikan kondisi tabungan di masa depan.",
  },
  {
    question: "Bagaimana cara kerja fitur Analisis AI?",
    answer: "Model Deep Learning kami menganalisis data demografis serta riwayat transaksi kamu (pemasukan & pengeluaran) untuk menentukan status kesehatan finansialmu (seperti Sangat Sehat, Stabil, Waspada, atau Bahaya) dan memberikan saran spesifik.",
  },
  {
    question: "Apakah data finansial saya aman?",
    answer: "Keamanan privasi dan data kamu adalah prioritas kami. Semua informasi transaksi diproses secara aman dan tidak akan disalahgunakan untuk keperluan di luar analisis finansialmu di dalam aplikasi.",
  },
  {
    question: "Apa fungsi Level dan Badge di profil saya?",
    answer: "SFINITY menggunakan sistem gamifikasi agar kamu lebih termotivasi dalam menabung. Setiap transaksi positif atau streak login akan menambah XP kamu. Dapatkan Badge menarik setiap mencapai level tertentu!",
  },
  {
    question: "Bagaimana cara reset password atau mengubah data profil?",
    answer: "Saat ini, pembaruan profil dapat dilakukan melalui menu ini. Jika kamu mengalami kendala login, silakan hubungi tim dukungan kami melalui menu Contact Support.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <HelpCircle className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Pusat Bantuan (FAQ)</h3>
          <p className="text-sm text-slate-500">Pertanyaan yang sering diajukan</p>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`overflow-hidden rounded-2xl border transition-colors ${
                isOpen ? "border-indigo-200 bg-indigo-50/30" : "border-slate-200 bg-slate-50/50"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className="font-semibold text-slate-800">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-indigo-500" : ""
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
