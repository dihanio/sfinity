"use client";

import {
  ScanLine,
} from "lucide-react";

export default function ScanHeader() {
  return (
    <div
      className="
        relative
      "
    >
      <div
        className="
          absolute
          -right-20
          -top-20
          h-64
          w-64
          rounded-full
          bg-blue-100
          blur-3xl
          opacity-60
        "
      />
<h1
          className="
            mt-6
            text-4xl
            font-black
            tracking-tight
            text-slate-900
          "
        >
          Scan Struk
        </h1>

        <p
          className="
            mt-4
            max-w-2xl
            text-lg
            leading-relaxed
            text-slate-500
          "
        >
          Scan struk otomatis menjadi transaksi
          finansial realtime.
        </p>
    </div>
  );
}
