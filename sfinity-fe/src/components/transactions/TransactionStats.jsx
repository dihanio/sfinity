"use client";

import {
  ArrowDown,
  ArrowUp,
  Wallet,
} from "lucide-react";

import {
  useTransactionStore,
} from "@/stores/useTransactionStore";

import { formatRupiah } from "@/lib/formatRupiah";

export default function TransactionStats() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const {
    getTotalIncome,
    getTotalExpense,
    getBalance,
  } = useTransactionStore();

  const cards = [
    {
      title: "Pemasukan",

      amount: getTotalIncome() || 0,

      icon: ArrowUp,

      bg: "bg-green-100",

      color: "text-green-600",
    },

    {
      title: "Pengeluaran",

      amount: getTotalExpense() || 0,

      icon: ArrowDown,

      bg: "bg-red-100",

      color: "text-red-600",
    },

    {
      title: "Saldo Bersih",

      amount: getBalance() || 0,

      icon: Wallet,

      bg: "bg-blue-100",

      color: "text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-[28px]
              bg-white
              border
              border-slate-200
              p-6
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-black text-slate-900 mt-3">
                  {formatRupiah(
                    card.amount
                  )}
                </h2>
              </div>

              <div
                className={`
                  w-14
                  h-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${card.bg}
                `}
              >
                <Icon
                  className={`
                    w-6
                    h-6
                    ${card.color}
                  `}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
