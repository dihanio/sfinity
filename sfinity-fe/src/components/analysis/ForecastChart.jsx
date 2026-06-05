"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";

export default function ForecastChart({ aiAnalysis }) {
  if (!aiAnalysis || !aiAnalysis.forecast) {
    return null;
  }

  // Format dataset for recharts from the three forecast timelines
  const forecast = aiAnalysis.forecast;
  const timelineLength = forecast.status_quo?.timeline?.length || 6;

  const data = Array.from({ length: timelineLength }).map((_, index) => {
    const monthNum = index + 1;
    return {
      month: `Bulan ${monthNum}`,
      "Status Quo": forecast.status_quo.timeline[index]?.tabungan_kumulatif || 0,
      "Perbaikan Moderat": forecast.perbaikan_moderat.timeline[index]?.tabungan_kumulatif || 0,
      "Perbaikan Agresif": forecast.perbaikan_agresif.timeline[index]?.tabungan_kumulatif || 0,
    };
  });

  // Custom Formatter for currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div
      className="
        rounded-[28px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="
              text-2xl
              font-black
              text-slate-900
            "
          >
            Proyeksi Tabungan 6 Bulan
          </h2>
          <p
            className="
              mt-2
              text-slate-500
            "
          >
            Simulasi tabungan berdasarkan 3 tingkat kedisiplinan keuangan
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shrink-0">
          <TrendingUp className="h-7 w-7" />
        </div>
      </div>

      <div className="mt-8 h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorQuo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.01}/>
              </linearGradient>
              <linearGradient id="colorMod" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01}/>
              </linearGradient>
              <linearGradient id="colorAgr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={11} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `Rp ${(v / 1e6).toFixed(1)}jt`}
            />
            <Tooltip 
              formatter={(value) => [formatCurrency(value), null]}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: 13, fontWeight: 600, color: "#475569" }}
            />
            <Area
              name="Status Quo"
              type="monotone"
              dataKey="Status Quo"
              stroke="#ef4444"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorQuo)"
            />
            <Area
              name="Perbaikan Moderat"
              type="monotone"
              dataKey="Perbaikan Moderat"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorMod)"
            />
            <Area
              name="Perbaikan Agresif"
              type="monotone"
              dataKey="Perbaikan Agresif"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAgr)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
