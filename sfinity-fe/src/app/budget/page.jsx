"use client";

import {
  useEffect,
} from "react";

import DashboardLayout
from "@/components/layout/DashboardLayout";

import BudgetHeader
from "@/components/budget/BudgetHeader";

import BudgetStats
from "@/components/budget/BudgetStats";

import BudgetList
from "@/components/budget/BudgetList";

import {
  useBudgetStore,
} from "@/stores/useBudgetStore";

import {
  useTransactionStore,
} from "@/stores/useTransactionStore";

import {
  useCategoryStore,
} from "@/stores/useCategoryStore";

export default function BudgetPage() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORES
  ━━━━━━━━━━━━━━━━━━━
  */
  const {
    fetchBudgets,
  } =
    useBudgetStore();

  const {
    fetchTransactions,
  } =
    useTransactionStore();

  const {
    fetchCategories,
  } =
    useCategoryStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  FETCH REALTIME
  ━━━━━━━━━━━━━━━━━━━
  */
  useEffect(() => {

    fetchBudgets();

    fetchTransactions();

    fetchCategories();

  }, []);

  return (

    <DashboardLayout>

      <div className="space-y-6">

        <BudgetHeader />

        <BudgetStats />

        <BudgetList />

      </div>

    </DashboardLayout>

  );

}