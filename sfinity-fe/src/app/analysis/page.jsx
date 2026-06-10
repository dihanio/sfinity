"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Sparkles, RefreshCw, UserCheck } from "lucide-react";
import { toast } from "sonner";

import ExpenseBreakdown from "@/components/analysis/ExpenseBreakdown";
import AIInsight from "@/components/analysis/AIInsight";
import PredictionCard from "@/components/analysis/PredictionCard";
import RecommendationList from "@/components/analysis/RecommendationList";
import SpendingTrend from "@/components/analysis/SpendingTrend";
import ForecastChart from "@/components/analysis/ForecastChart";

import { useTransactionStore } from "@/stores/useTransactionStore";
import { useAIStore } from "@/stores/useAIStore";
import {
  calculateFinancialHealth,
  calculateSavingRate,
  getTopExpenseCategory,
} from "@/lib/financeAnalytics";

export default function AnalysisPage() {
  const transactions = useTransactionStore((state) => state.transactions);
  const { aiAnalysis, loading, error, fetchAIAnalysis, clearAIAnalysis } = useAIStore();

  const [form, setForm] = useState({
    usia: "",
    gender: "",
    year_in_school: "",
    major: "",
    preferred_payment_method: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.usia || !form.gender || !form.year_in_school || !form.major || !form.preferred_payment_method) {
      toast.error("Harap isi semua kolom formulir.");
      return;
    }

    const res = await fetchAIAnalysis(form);
    if (res.success) {
      toast.success("Analisis AI berhasil diperbarui!");
    } else {
      toast.error("Gagal mendapatkan analisis AI. Silakan coba lagi.");
    }
  };

  /*
    INCOME
  */
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + Number(item.amount || 0), 0);

  /*
    EXPENSE
  */
  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + Math.abs(Number(item.amount || 0)), 0);

  /*
    BALANCE
  */
  const balance = income - expense;

  /*
    SAVING RATE
  */
  const savingRate = calculateSavingRate({ income, expense });

  /*
    HEALTH
  */
  const healthScore = calculateFinancialHealth({ income, expense });

  /*
    TOP CATEGORY
  */
  const topCategory = getTopExpenseCategory(transactions);

  /*
    GROUP EXPENSE
  */
  const expenseGrouped = {};
  transactions
    .filter((item) => item.type === "expense")
    .forEach((item) => {
      expenseGrouped[item.category] =
        (expenseGrouped[item.category] || 0) + Math.abs(Number(item.amount || 0));
    });

  /*
    EMPTY
  */
  const isEmpty = transactions.length === 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* BACK BUTTON */}
            <Link
              href="/dashboard"
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-3xl
                border
                border-slate-200
                bg-white
                text-slate-700
                shadow-sm
                transition-all
                hover:bg-slate-100
              "
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>

            {/* TITLE */}
            <div>
              <h1 className="text-4xl font-black text-slate-900">
                Financial Analysis
              </h1>
              <p className="mt-2 text-slate-500 font-medium">
                Analisis & Rekomendasi Finansial Berbasis Deep Learning AI
              </p>
            </div>
          </div>

          {/* UPDATE PROFILE / RE-ANALYZE BUTTON */}
          {aiAnalysis && !isEmpty && (
            <button
              onClick={() => clearAIAnalysis()}
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-indigo-600
                px-5
                py-3
                text-sm
                font-bold
                text-white
                shadow-md
                transition-all
                hover:bg-indigo-700
              "
            >
              <RefreshCw className="h-4 w-4" />
              Perbarui Data Demografis
            </button>
          )}
        </div>

        {/* EMPTY */}
        {isEmpty ? (
          <div
            className="
              rounded-[32px]
              border
              border-dashed
              border-slate-300
              bg-white
              p-12
              text-center
            "
          >
            <h2 className="text-3xl font-black text-slate-800">
              Belum Ada Data
            </h2>
            <p className="mt-3 text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
              Tambahkan transaksi terlebih dahulu untuk melihat analisis finansial yang komprehensif.
            </p>
          </div>
        ) : (
          <>
            {/* LOADING STATE */}
            {loading && (
              <div className="rounded-[32px] bg-white border border-slate-200 p-12 text-center shadow-sm space-y-4">
                <div className="inline-flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
                <h3 className="text-xl font-bold text-slate-800">Menghubungi AI Engine...</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed text-sm">
                  Model Deep Learning SFINITY sedang menganalisis perilaku keuangan dan menghitung proyeksi tabungan Anda...
                </p>
              </div>
            )}

            {/* DEMOGRAPHICS FORM STATE */}
            {!aiAnalysis && !loading && (
              <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm max-w-2xl mx-auto space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">Setup Analisis AI</h3>
                    <p className="text-slate-500 text-sm font-medium mt-0.5">Lengkapi profil untuk mengaktifkan model Deep Learning SFINITY</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* AGE */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Usia Anda (Tahun)</label>
                      <input
                        type="number"
                        name="usia"
                        min="15"
                        max="60"
                        placeholder="Contoh: 20"
                        value={form.usia}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:bg-white"
                      />
                    </div>

                    {/* GENDER */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Gender</label>
                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:bg-white"
                      >
                        <option value="">Pilih Gender</option>
                        <option value="Male">Laki-laki (Male)</option>
                        <option value="Female">Perempuan (Female)</option>
                      </select>
                    </div>

                    {/* SCHOOL YEAR */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Tahun Studi (Mahasiswa)</label>
                      <select
                        name="year_in_school"
                        value={form.year_in_school}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:bg-white"
                      >
                        <option value="">Pilih Tahun</option>
                        <option value="Freshman">Freshman (Tahun 1)</option>
                        <option value="Sophomore">Sophomore (Tahun 2)</option>
                        <option value="Junior">Junior (Tahun 3)</option>
                        <option value="Senior">Senior (Tahun 4)</option>
                      </select>
                    </div>

                    {/* METODE PEMBAYARAN */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Metode Pembayaran Utama</label>
                      <select
                        name="preferred_payment_method"
                        value={form.preferred_payment_method}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:bg-white"
                      >
                        <option value="">Pilih Metode</option>
                        <option value="Cash">Cash (Tunai)</option>
                        <option value="Credit/Debit Card">Kartu Kredit/Debit</option>
                        <option value="Mobile Payment App">Aplikasi Pembayaran (E-Wallet/QRIS)</option>
                      </select>
                    </div>
                  </div>

                  {/* JURUSAN */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Jurusan Kuliah</label>
                    <input
                      type="text"
                      name="major"
                      placeholder="Contoh: Computer Science, Engineering, Business, dll."
                      value={form.major}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:bg-white"
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    className="
                      mt-4
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-indigo-600
                      p-4
                      font-bold
                      text-white
                      shadow-md
                      transition-all
                      hover:bg-indigo-700
                    "
                  >
                    <UserCheck className="h-5 w-5" />
                    Aktifkan Analisis Deep Learning
                  </button>
                </form>

                {error && (
                  <div className="rounded-2xl bg-red-50 border border-red-100 p-4 text-red-600 text-sm font-semibold text-center">
                    Error: {error}
                  </div>
                )}
              </div>
            )}

            {/* RESULTS STATE */}
            {aiAnalysis && !loading && (
              <div className="space-y-6">
                {/* CHART & TREND SECTION */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* FORECAST CHART */}
                  <ForecastChart aiAnalysis={aiAnalysis} />

                  {/* BREAKDOWN */}
                  <ExpenseBreakdown expenseGrouped={expenseGrouped} />
                </div>

                {/* INSIGHT */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <AIInsight aiAnalysis={aiAnalysis} />
                  <PredictionCard aiAnalysis={aiAnalysis} />
                </div>

                {/* RECOMMENDATION */}
                <RecommendationList aiAnalysis={aiAnalysis} />
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}