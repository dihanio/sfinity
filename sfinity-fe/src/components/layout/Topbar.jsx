"use client";

import Link from "next/link";

import {
  useAuthStore,
} from "@/stores/useAuthStore";

export default function Topbar() {

  /*
    STORE
  */
  const {
    user,
  } = useAuthStore();

  return (
    <header
      className="
        flex
        flex-col
        gap-5
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* LEFT */}
      <div>
        <h1
          className="
            text-4xl
            font-black
            text-slate-900
            md:text-4xl
          "
        >
          Hai, {user?.name || "User"}!
        </h1>

        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Semangat kelola
          keuangan hari ini
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* BUDGET */}
        <Link
          href="/budget"
          className="
            inline-flex
            h-14
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-blue-100
            px-6
            font-semibold
            text-blue-600
            transition-all
            hover:scale-[1.02]
          "
        >
          Kelola Budget
        </Link>
      </div>
    </header>
  );
}