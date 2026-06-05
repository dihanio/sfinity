"use client";

import Link from "next/link";
import Image from "next/image";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import { useAuthStore }
from "@/stores/useAuthStore";

import {
  BarChart3,
  CreditCard,
  Home,
  LogOut,
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

export default function Sidebar() {
  /*
    PATHNAME
  */
  const pathname =
    usePathname();

  const router =
    useRouter();

  const logout =
    useAuthStore(
      (state) => state.logout
    );

  /*
    HANDLE LOGOUT
  */
  function handleLogout() {

    try {
      localStorage.clear();
    } catch (e) {
      // ignore
    }

    logout();

    router.push("/");

  }

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        hidden
        h-screen
        w-[280px]
        flex-col
        border-r
        border-slate-200
        bg-white
        p-4
        lg:flex
      "
    >
      <div
  className="
    flex
    items-center
    gap-1
  "
>
  {/* LOGO */}
  <div
    className="
      flex
      h-24
      w-24
      items-center
      justify-center
      overflow-hidden
      rounded-2xl
    "
  >
    <Image
      src="/logo.png"
      alt="Sfinity Logo"
      width={40}
      height={40}
      className="object-contain"
    />
  </div>

  {/* TEXT */}
  <div>
    <h1
      className="
        text-3xl
        font-black
        text-slate-900
      "
    >
      SFINITY
    </h1>

    <p
      className="
        text-sm
        text-slate-500
      "
    >
      Smart Finance
    </p>
  </div>
</div>

      {/* NAVIGATION */}
      <nav className="mt-8 space-y-2">
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
              className={`
                group
                flex
                h-14
                items-center
                gap-4
                rounded-2xl
                px-5
                transition-all
                duration-300
                ${
                  active
                    ? "bg-blue-100 text-blue-600 shadow-lg"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                }
              `}
            >
              {/* ICON */}
              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  transition-all
                  ${
                    active
                      ? "bg-white/20"
                      : "bg-slate-100 group-hover:bg-blue-100"
                  }
                `}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* LABEL */}
              <span
                className="
                  font-semibold
                "
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="mt-auto pb-4">
        <button
          onClick={handleLogout}
          className="
            group
            flex
            h-14
            w-full
            items-center
            gap-4
            rounded-2xl
            px-5
            text-slate-600
            transition-all
            duration-300
            hover:bg-red-50
            hover:text-red-600
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              transition-all
              group-hover:bg-red-100
            "
          >
            <LogOut className="h-5 w-5" />
          </div>

          <span
            className="
              font-semibold
            "
          >
            Keluar
          </span>

        </button>
      </div>

    </aside>
  );
}