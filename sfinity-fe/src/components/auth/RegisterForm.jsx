"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Sparkles,
  TrendingUp,
  Coins,
} from "lucide-react";
import {
  useState,
} from "react";
import {
  useRouter,
} from "next/navigation";
import { toast }
from "sonner";

export default function RegisterForm() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  ROUTER
  ━━━━━━━━━━━━━━━━━━━
  */
  const router =
    useRouter();

  /*
  ━━━━━━━━━━━━━━━━━━━
  STATES
  ━━━━━━━━━━━━━━━━━━━
  */
  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    form,
    setForm,
  ] = useState({

    name: "",

    email: "",

    password: "",

    confirmPassword: "",

  });

  /*
  ━━━━━━━━━━━━━━━━━━━
  CHANGE
  ━━━━━━━━━━━━━━━━━━━
  */
  function handleChange(e) {

    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({

      ...prev,

      [name]: value,

    }));

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  REGISTER
  ━━━━━━━━━━━━━━━━━━━
  */
  async function handleRegister() {

    /*
    VALIDATION
    */
    if (

      !form.name ||

      !form.email ||

      !form.password ||

      !form.confirmPassword

    ) {

      toast.error(
        "Semua field wajib diisi"
      );

      return;

    }

    /*
    PASSWORD MATCH
    */
    if (
      form.password !==
      form.confirmPassword
    ) {

      toast.error(
        "Konfirmasi password tidak cocok"
      );

      return;

    }

    /*
    PASSWORD LENGTH
    */
    if (
      form.password.length < 8
    ) {

      toast.error(
        "Password minimal 8 karakter"
      );

      return;

    }

    try {

      setLoading(true);

      /*
      API
      */
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response =
        await fetch(

          `${baseUrl}/auth/register`,

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({

              name:
                form.name,

              email:
                form.email
                  .toLowerCase(),

              password:
                form.password,

            }),

          }

        );

      const data =
        await response.json();

      /*
      ERROR
      */
      if (!response.ok) {

        throw new Error(

          data.message ||
          "Register gagal"

        );

      }

      /*
      SUCCESS
      */
      toast.success(
        "Register berhasil 🎉"
      );

      /*
      REDIRECT LOGIN
      */
      router.push(
        "/login"
      );

    } catch (error) {

      toast.error(
        error.message
      );

    } finally {

      setLoading(false);

    }

  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <div className="grid w-full grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* LEFT SIDE PANEL (Illustration, Branding & Stats) - visible on lg:grid */}
        <div className="hidden lg:flex lg:col-span-5 relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex-col justify-between p-12 text-white">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          
          {/* Ambient glow effects */}
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
          
          {/* Top Brand Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
              <Image
                src="/logo.png"
                alt="Sfinity Logo"
                width={36}
                height={36}
                className="rounded-lg object-contain"
              />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-100 bg-clip-text text-transparent">
                Sfinity
              </span>
              <span className="text-xs block text-slate-400 font-medium tracking-widest uppercase -mt-1">
                Smart Finance
              </span>
            </div>
          </div>

          {/* Center Content: Mockup Image */}
          <div className="relative z-10 my-auto flex flex-col items-center">
            <div className="relative group max-w-sm rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 shadow-2xl transition-all duration-700 hover:scale-[1.02]">
              {/* Decorative border gradient wrapper */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <Image
                src="/splash.png"
                alt="Sfinity Dashboard Mockup"
                width={360}
                height={360}
                className="rounded-2xl object-cover shadow-lg relative z-10"
                priority
              />
              
              {/* Floating Stat Widget */}
              <div className="absolute -bottom-6 -left-6 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-md p-4 shadow-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Tabungan Meningkat</p>
                  <p className="text-sm font-bold text-emerald-400">+28% Rata-rata</p>
                </div>
              </div>

              {/* Floating Challenge Widget */}
              <div className="absolute -top-6 -right-6 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-md p-4 shadow-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 animate-pulse">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">AI Coach Aktif</p>
                  <p className="text-sm font-bold text-indigo-400">Level Up XP!</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center max-w-sm">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                Asisten Keuangan Pintar & Edukatif
              </h2>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                Kelola anggaran, lacak pengeluaran harian, dan naikkan level kesehatan finansialmu secara otomatis bersama Sfinity.
              </p>
            </div>
          </div>

          {/* Bottom Footer info */}
          <div className="relative z-10 text-xs text-slate-500 flex justify-between">
            <span>© 2026 Sfinity App</span>
            <span className="flex items-center gap-1">
              <Coins className="h-3.5 w-3.5 text-indigo-400" />
              Tumbuh Bersama Keuanganmu
            </span>
          </div>
        </div>

        {/* RIGHT SIDE PANEL (Register Form) */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center bg-slate-50/60 p-6 md:p-12 relative overflow-y-auto min-h-screen">
          {/* Decorative background shape for mobile branding */}
          <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Sfinity Logo"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="text-lg font-black tracking-tight text-slate-900">
              Sfinity
            </span>
          </div>

          <div className="w-full max-w-md bg-white rounded-[32px] border border-slate-100 p-8 shadow-2xl shadow-slate-200/50 md:p-10 relative overflow-hidden my-12">
            {/* Form Glow highlight */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none" />

            {/* TITLE */}
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Buat Akun Baru
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Mulai kelola keuanganmu dengan lebih cerdas bersama Sfinity
              </p>
            </div>

            {/* FORM */}
            <div className="mt-8 space-y-5">
              {/* NAME */}
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <div className="relative mt-2">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    className="h-14 w-full rounded-2xl border border-slate-200 pl-12 pr-4 outline-none text-slate-800 transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Email
                </label>
                <div className="relative mt-2">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Masukkan email kamu"
                    className="h-14 w-full rounded-2xl border border-slate-200 pl-12 pr-4 outline-none text-slate-800 transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Buat password"
                    className="h-14 w-full rounded-2xl border border-slate-200 pl-12 pr-14 outline-none text-slate-800 transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 bg-slate-50/50 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-indigo-500 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* RULES */}
                <div className="mt-4 space-y-2 bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                    Minimal 8 karakter
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                    Mengandung huruf dan angka
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                    Tidak boleh spasi
                  </div>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Konfirmasi Password
                </label>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Konfirmasi password"
                    className="h-14 w-full rounded-2xl border border-slate-200 pl-12 pr-4 outline-none text-slate-800 transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              {/* TERMS */}
              <div className="flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <p className="text-xs leading-relaxed text-slate-500">
                  Saya setuju dengan{" "}
                  <span className="font-semibold text-indigo-600 hover:underline cursor-pointer">
                    Syarat & Ketentuan
                  </span>{" "}
                  dan{" "}
                  <span className="font-semibold text-indigo-600 hover:underline cursor-pointer">
                    Kebijakan Privasi
                  </span>
                </p>
              </div>

              {/* REGISTER BUTTON */}
              <button
                onClick={handleRegister}
                disabled={loading}
                className="h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold transition-all duration-300 shadow-lg shadow-indigo-100 focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 mt-8"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  "Buat Akun Baru"
                )}
              </button>
            </div>

            {/* LOGIN LINK */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
              >
                Masuk sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}