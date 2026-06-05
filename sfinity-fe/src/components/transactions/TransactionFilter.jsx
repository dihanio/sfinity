"use client";

import {
  Search,
} from "lucide-react";

import {
  useTransactionStore,
} from "@/stores/useTransactionStore";

export default function TransactionFilter() {
  const {
    search,
    setSearch,
    filterType,
    setFilterType,
  } = useTransactionStore();

  return (
    <div
      className="
        rounded-[28px]
        bg-white
        border
        border-slate-200
        p-5
        flex
        flex-col
        lg:flex-row
        gap-4
      "
    >
      {/* SEARCH */}
      <div className="relative flex-1">
        <Search
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            w-5
            h-5
          "
        />

        <input
          type="text"
          placeholder="Cari transaksi..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            h-14
            rounded-2xl
            border
            border-slate-200
            pl-12
            pr-4
            outline-none
          "
        />
      </div>

      {/* FILTER */}
      <select
        value={filterType}
        onChange={(e) =>
          setFilterType(
            e.target.value
          )
        }
        className="
          h-14
          rounded-2xl
          border
          border-slate-200
          px-5
          bg-white
          outline-none
        "
      >
        <option value="all">
          Semua
        </option>

        <option value="income">
          Pemasukan
        </option>

        <option value="expense">
          Pengeluaran
        </option>
      </select>
    </div>
  );
}