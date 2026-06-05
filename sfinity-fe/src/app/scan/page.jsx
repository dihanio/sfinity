"use client";

import {
  useEffect,
} from "react";

import DashboardLayout
from "@/components/layout/DashboardLayout";

import ScanHeader
from "@/components/scan/ScanHeader";

import ScanStats
from "@/components/scan/ScanStats";

import ReceiptUploadCard
from "@/components/scan/ReceiptUploadCard";

import ReceiptPreview
from "@/components/scan/ReceiptPreview";

import OCRResultCard
from "@/components/scan/OCRResultCard";

import ScanHistory
from "@/components/scan/ScanHistory";

import {
  useReceiptStore,
} from "@/stores/useReceiptStore";

import {
  useCategoryStore,
} from "@/stores/useCategoryStore";

export default function
ScanPage() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const fetchReceipts =
    useReceiptStore(
      (state) =>
        state.fetchReceipts
    );

    const fetchCategories =
  useCategoryStore(
    (state) =>
      state.fetchCategories
  );
  /*
  ━━━━━━━━━━━━━━━━━━━
  FETCH RECEIPTS
  ━━━━━━━━━━━━━━━━━━━
  */
  useEffect(() => {

  fetchReceipts();

  fetchCategories();

}, [
  fetchReceipts,
  fetchCategories,
]);

  return (

    <DashboardLayout>

      <div className="space-y-6">

        {/* HEADER */}
        <ScanHeader />

        {/* STATS */}
        <ScanStats />

        {/* CONTENT */}
        <div
          className="
            grid
            grid-cols-1
            gap-6
            xl:grid-cols-3
          "
        >

          {/* LEFT */}
          <div
            className="
              space-y-6
              xl:col-span-2
            "
          >

            <ReceiptUploadCard />

            <OCRResultCard />

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            <ReceiptPreview />

            <ScanHistory
              limit={2}
              compact
            />

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}