"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import Topbar from "@/components/layout/Topbar";

import StatsCard from "@/components/dashboard/StatsCard";

import DailyCheckin from "@/components/dashboard/DailyCheckin";

import FinancialHealth from "@/components/dashboard/FinancialHealth";

import MonthlyAnalysis from "@/components/dashboard/MonthlyAnalysis";

import DailyMission from "@/components/dashboard/DailyMission";

import RecommendationCard from "@/components/dashboard/RecommendationCard";

import ArticleCard from "@/components/dashboard/ArticleCard";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import GoalWidget
from "@/components/dashboard/GoalWidget";

import {
  useMissionStore,
} from "@/stores/useMissionStore";

import {
  useTransactionStore,
} from "@/stores/useTransactionStore";

import {
  useGamificationStore,
} from "@/stores/useGamificationStore";

import {
  useDashboardStore,
} from "@/stores/useDashboardStore";

import ExpenseDistribution
from "@/components/dashboard/ExpenseDistribution";


export default function DashboardPage() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  HYDRATION FIX
  ━━━━━━━━━━━━━━━━━━━
  */
  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {

    setMounted(true);

  }, []);

  /*
  ━━━━━━━━━━━━━━━━━━━
  MISSION STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const generateDailyMissions =
    useMissionStore(
      (state) =>
        state.generateDailyMissions
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  GAMIFICATION STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const setXP =
    useGamificationStore(
      (state) =>
        state.setXP
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  TRANSACTION STORE
  ━━━━━━━━━━━━━━━━━━━
  */
 const {
  transactions,
  fetchTransactions,
  getTotalIncome,
  getTotalExpense,
  getBalance,
} = useTransactionStore();

 /*
━━━━━━━━━━━━━━━━━━━
FETCH TRANSACTIONS
━━━━━━━━━━━━━━━━━━━
*/
/*
━━━━━━━━━━━━━━━━━━━
FETCH TRANSACTIONS
━━━━━━━━━━━━━━━━━━━
*/
useEffect(() => {

  fetchTransactions();

}, [fetchTransactions]);

  /*
━━━━━━━━━━━━━━━━━━━
DASHBOARD STORE
━━━━━━━━━━━━━━━━━━━
*/
const {
  summary,
  recentTransactions,
  categoryAnalytics,
  fetchDashboard,
} =
  useDashboardStore();

/*
━━━━━━━━━━━━━━━━━━━
FETCH DASHBOARD
━━━━━━━━━━━━━━━━━━━
*/
useEffect(() => {

  fetchDashboard();

}, [fetchDashboard]);

/*
━━━━━━━━━━━━━━━━━━━
SYNC XP
━━━━━━━━━━━━━━━━━━━
*/
useEffect(() => {

  if (summary?.xp) {

    setXP(summary.xp);

  }

}, [summary, setXP]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  GENERATE MISSIONS
  ━━━━━━━━━━━━━━━━━━━
  */
  useEffect(() => {

    generateDailyMissions();

  }, [generateDailyMissions]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  WAIT CLIENT
  ━━━━━━━━━━━━━━━━━━━
  */
  if (!mounted) {

    return null;

  }

const totalIncome =
  summary?.totalIncome || 0;

const totalExpense =
  summary?.totalExpense || 0;

const balance =
  summary?.balance || 0;
  /*
  ━━━━━━━━━━━━━━━━━━━
  SAVING RATIO
  ━━━━━━━━━━━━━━━━━━━
  */
  const savingRatio =

    totalIncome > 0

      ? Math.round(

          (
            (
              totalIncome -
              totalExpense
            ) /
            totalIncome
          ) * 100

        )

      : 0;

  /*
  ━━━━━━━━━━━━━━━━━━━
  EMPTY STATE
  ━━━━━━━━━━━━━━━━━━━
  */
  const isEmpty =
    transactions.length === 0;

  /*
  ━━━━━━━━━━━━━━━━━━━
  DATE
  ━━━━━━━━━━━━━━━━━━━
  */
  const currentMonth =
    new Date().getMonth();

  const currentYear =
    new Date().getFullYear();

    /*
━━━━━━━━━━━━━━━━━━━
COMPARISON TEMP
━━━━━━━━━━━━━━━━━━━
*/
const incomePercentage = 0;

const expensePercentage = 0;

const hasPreviousData = false;

  return (

    <DashboardLayout>

        {/* TOPBAR */}
        <Topbar />

        <div
          className="
            mt-6
            space-y-6
          "
        >

          {/* STATS */}
          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {/* INCOME */}
            <StatsCard
              title="Pemasukan"
              amount={`Rp ${Number(
                totalIncome || 0
              ).toLocaleString(
                "id-ID"
              )}`}
              percentage={`${incomePercentage}%`}
              type="success"
              hasComparison={
                hasPreviousData
              }
            />

            {/* EXPENSE */}
            <StatsCard
              title="Pengeluaran"
              amount={`Rp ${Number(
                totalExpense || 0
              ).toLocaleString(
                "id-ID"
              )}`}
              percentage={`${expensePercentage}%`}
              type="danger"
              hasComparison={
                hasPreviousData
              }
            />

            {/* BALANCE */}
            <StatsCard
              title="Saldo Bersih"
              amount={`Rp ${Number(
                balance || 0
              ).toLocaleString(
                "id-ID"
              )}`}
              percentage={`${savingRatio}% Saving`}
              type="income"
              hasComparison={false}
            />

          </div>

          {/* INSIGHT */}
          <div
            className="
              grid
              grid-cols-1
              gap-5
              lg:grid-cols-3
            "
          >

            <DailyCheckin />

            <FinancialHealth />

            <MonthlyAnalysis />

          </div>

{/* ROW 2 */}
<div className="mt-6">
<ExpenseDistribution />
  

</div>

          {/* EMPTY */}
          {isEmpty && (

            <div
              className="
                rounded-[32px]
                border
                border-dashed
                border-slate-300
                bg-white
                p-10
                text-center
              "
            >

              <h2
                className="
                  text-2xl
                  font-black
                  text-slate-800
                "
              >
                Belum Ada Transaksi
              </h2>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Tambahkan transaksi
                untuk melihat
                progress keuanganmu
              </p>

            </div>

          )}

          {/* AI SECTION */}
          <div
            className="
              grid
              grid-cols-1
              gap-6
              items-stretch
              xl:grid-cols-12
            "
          >

            <div className="xl:col-span-4">
              <RecommendationCard />
            </div>

            <div className="xl:col-span-8">
              <ArticleCard />
            </div>

          </div>

          {/* DAILY MISSION */}
          <DailyMission />

        </div>

      </DashboardLayout>

  );

}