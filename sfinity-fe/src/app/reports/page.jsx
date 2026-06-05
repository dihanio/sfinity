"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

import ReportHeader from "@/components/reports/ReportHeader";

import ReportStats from "@/components/reports/ReportStats";

import MonthlyCashflowChart from "@/components/reports/MonthlyCashflowChart";

import ExpenseCategoryChart from "@/components/reports/ExpenseCategoryChart";

import FinancialInsightCard from "@/components/reports/FinancialInsightCard";

import TopExpenseList from "@/components/reports/TopExpenseList";

import ReportSummaryCard from "@/components/reports/ReportSummaryCard";

import ReportBudgetProgress from "@/components/reports/ReportBudgetProgress";

import {
  useEffect,
} from "react";

import {
  useReportStore,
} from "@/stores/useReportStore";

export default function ReportsPage() {

  const {
  fetchAnalytics,
} =
  useReportStore();

useEffect(() => {

  fetchAnalytics();

}, []);
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <ReportHeader />

        {/* STATS */}
        <ReportStats />

        {/* ANALYTICS */}
        <div
          className="
            grid
            grid-cols-1
            gap-6
            xl:grid-cols-12
            items-start
          "
        >
          {/* LEFT */}
          <div
            className="
              space-y-6
              xl:col-span-7
            "
          >
            {/* CASHFLOW */}
            <MonthlyCashflowChart />

           
          </div>

          {/* RIGHT */}
          <div className="xl:col-span-5">
            <ExpenseCategoryChart />
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-3
          "
        >
          <TopExpenseList />

          <ReportBudgetProgress />

          <ReportSummaryCard />
        </div>
         {/* AI INSIGHT */}
            <FinancialInsightCard />
      </div>
    </DashboardLayout>
  );
}