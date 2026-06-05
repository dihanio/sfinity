"use client";

import {
  useState,
} from "react";

import Link
from "next/link";

import {

  Plus,

  Tags,

} from "lucide-react";

import AddTransactionModal
from "./AddTransactionModal";

export default function TransactionHeader() {

  /*
    MODAL
  */
  const [
    open,
    setOpen,
  ] = useState(false);

  return (
    <>

      <div
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
            "
          >
            Transactions
          </h1>

          <p
            className="
              mt-2
              text-slate-500
            "
          >
            Kelola pemasukan dan
            pengeluaranmu
          </p>

        </div>

        {/* RIGHT */}
        <div
          className="
            flex
            flex-wrap
            gap-4
          "
        >

          {/* CATEGORY */}
          {/* <Link
            href="/transactions/categories"
          >

            <button
              className="
                flex
                h-14
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-blue-100
                px-5
                font-semibold
                text-black
                transition-all
                hover:bg-blue-600
              "
            >

              <Plus
                className="
                  h-5
                  w-5
                "
              />

              Categories

            </button>

          </Link> */}

          {/* ADD */}
          <button
            onClick={() =>
              setOpen(true)
            }
            className="
              flex
              h-14
              items-center
              gap-3
              rounded-2xl
              bg-blue-100
              px-6
              font-semibold
              text-black
              transition-all
              hover:bg-blue-600
            "
          >

            <Plus
              className="
                h-5
                w-5
              "
            />

            Tambah Transaksi

          </button>

        </div>

      </div>

      {/* MODAL */}
      <AddTransactionModal
        open={open}
        setOpen={setOpen}
      />

    </>

  );
}