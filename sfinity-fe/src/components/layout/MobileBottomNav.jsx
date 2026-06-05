"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  BarChart3,
  CreditCard,
  Home,
  ScanLine,
  Settings,
} from "lucide-react";

const menus = [
  {
    label: "Beranda",
    href: "/dashboard",
    icon: Home,
  },

  {
    label: "Transaksi",
    href: "/transactions",
    icon: CreditCard,
  },

  {
    label: "Scan",
    href: "/scan",
    icon: ScanLine,
  },

  {
    label: "Laporan",
    href: "/reports",
    icon: BarChart3,
  },

  {
    label: "Pengaturan",
    href: "/profile",
    icon: Settings,
  },
];

export default function MobileBottomNav() {
  /*
    PATHNAME
  */
  const pathname =
    usePathname();

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-slate-200
        bg-white/95
        backdrop-blur-xl
        lg:hidden
      "
    >
      <div
        className="
          grid
          h-20
          grid-cols-5
        "
      >
        {menus.map((item) => {
          const Icon =
            item.icon;

          /*
            ACTIVE
          */
          const active =
            pathname ===
            item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="
                relative
                flex
                flex-col
                items-center
                justify-center
                gap-1
              "
            >
              {/* ACTIVE INDICATOR */}
              {active && (
                <div
                  className="
                    absolute
                    h-1
                    w-10
                    rounded-full
                    bg-blue-100
                  "
                />
              )}

              {/* ICON */}
              <div
                className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  transition-all
                  duration-300
                  ${
                    active
                      ? "bg-blue-100 text-blue-600 shadow-lg"
                      : "text-slate-500"
                  }
                `}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* LABEL */}
              <span
                className={`
                  text-xs
                  font-semibold
                  transition-all
                  ${
                    active
                      ? "text-blue-600"
                      : "text-slate-500"
                  }
                `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}