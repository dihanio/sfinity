"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function GuideCard() {
  return (
    <Link href="/guide">
      <div className="group rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Panduan Sfinity
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Pelajari fitur utama Sfinity mulai dari Financial Health Score,
                Budget Planner, AI Receipt Scanner, hingga Achievement.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                11 Kategori
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                40+ FAQ
              </span>
            </div>
          </div>

          <ArrowRight className="h-5 w-5 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-700" />
        </div>
      </div>
    </Link>
  );
}