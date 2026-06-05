"use client";

import {
  useEffect,
} from "react";

import DashboardLayout
from "@/components/layout/DashboardLayout";

import TransactionHeader
from "@/components/transactions/TransactionHeader";

import TransactionStats
from "@/components/transactions/TransactionStats";

import TransactionFilter
from "@/components/transactions/TransactionFilter";

import TransactionList
from "@/components/transactions/TransactionList";

import {
  useTransactionStore,
} from "@/stores/useTransactionStore";

import {
  useCategoryStore,
} from "@/stores/useCategoryStore";

export default function
TransactionsPage() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORES
  ━━━━━━━━━━━━━━━━━━━
  */
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

    fetchTransactions();

    fetchCategories();

  }, []);

  return (

    <DashboardLayout>

      <div className="space-y-6">

        <TransactionHeader />

        <TransactionStats />

        <TransactionFilter />

        <TransactionList />

      </div>

    </DashboardLayout>

  );

}