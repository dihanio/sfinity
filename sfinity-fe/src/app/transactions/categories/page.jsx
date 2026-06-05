"use client";

import Link from "next/link";

import DashboardLayout
from "@/components/layout/DashboardLayout";

import CategoryManager
from "@/components/transactions/CategoryManager";

import {
  ArrowLeft,
  Layers3,
} from "lucide-react";

export default function CategoriesPage() {

  return (
    <DashboardLayout>

      <div className="space-y-6">

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

              <ArrowLeft
                className="
                  h-6
                  w-6
                "
              />

            </Link>

            {/* TITLE */}
            <div>

              <h1
                className="
                  text-4xl
                  font-black
                  text-slate-900
                "
              >
                Categories
              </h1>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Kelola kategori transaksi
                dan budget
              </p>

            </div>

          </div>
        </div>

        {/* CATEGORY MANAGER */}
        <CategoryManager />

      </div>

    </DashboardLayout>
  );
}