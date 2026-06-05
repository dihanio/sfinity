"use client";

import Link
from "next/link";

import DashboardLayout
from "@/components/layout/DashboardLayout";

import ScanHistory
from "@/components/scan/ScanHistory";

import {
  ArrowLeft,
  ScanSearch,
} from "lucide-react";

export default function ScanHistoryPage() {

  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* HEADER */}
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >

          {/* LEFT */}
          <div
            className="
              flex
              items-start
              gap-4
            "
          >

            {/* BACK BUTTON */}
            <Link
              href="/scan"
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

              <ArrowLeft
                className="
                  h-6
                  w-6
                "
              />

            </Link>

            {/* TITLE */}
            <div>

              <div className="flex items-center gap-3">

                <div>

                  <h1
                    className="
                      text-4xl
                      font-black
                      text-slate-900
                    "
                  >
                    Scan History
                  </h1>

                  <p
                    className="
                      mt-2
                      text-slate-500
                    "
                  >
                    Riwayat lengkap hasil AI OCR
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* HISTORY */}
        <ScanHistory />

      </div>

    </DashboardLayout>

  );

}