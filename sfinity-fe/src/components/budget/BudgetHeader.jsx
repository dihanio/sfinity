"use client";

import Link from "next/link";

import { useState } from "react";

import {
  ArrowLeft,
} from "lucide-react";

import AddBudgetModal from "./AddBudgetModal";

export default function BudgetHeader() {

  const [open, setOpen] =
    useState(false);

  return (
    <>
    

        {/* TOP */}
        <div
          className="
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-start
            md:justify-between
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

            {/* BACK */}
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
                Budget Planner
              </h1>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Kelola anggaran
                bulananmu
              </p>

            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={() =>
              setOpen(true)
            }
            className="
              h-14
              rounded-2xl
              bg-blue-100
              px-6
              font-semibold
              text-black
              transition-all
              hover:bg-blue-600
            "
          >
            + Tambah Budget
          </button>

        </div>



      <AddBudgetModal
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}