import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import { Toaster } from "sonner";
import LevelUpModal
from "@/components/gamification/LevelUpModal";

const geistSans = Geist({
  variable:
    "--font-geist-sans",

  subsets: ["latin"],
});

const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",

    subsets: ["latin"],
  });

export const metadata = {
  title: "Sfinity",

  description:
    "Modern AI Finance Dashboard",
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >
      <body
        className="
          min-h-full
          bg-slate-50
          text-slate-900
        "
      >
        {children}

        {/* TOASTER */}
        <Toaster
          position="top-right"
          richColors
          expand
          closeButton
        />
         <LevelUpModal />
      </body>
    </html>
  );
}