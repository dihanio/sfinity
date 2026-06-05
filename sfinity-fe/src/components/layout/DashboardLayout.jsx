"use client";

import {
  useEffect,
} from "react";

import Sidebar from "./Sidebar";
import MobileBottomNav from "./MobileBottomNav";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import {
  useUserStore,
} from "@/stores/useUserStore";

export default function DashboardLayout({

  children,

}) {

  const fetchProfile =
    useUserStore(
      (state) =>
        state.fetchProfile
    );

  useEffect(() => {

    fetchProfile();

  }, []);

  return (

    <ProtectedRoute>
      <main className="min-h-screen bg-slate-100 flex">

        <Sidebar />

        <section className="flex-1 lg:ml-[280px]">

          <div className="p-4 md:p-6 pb-28 lg:pb-6">

            {children}

          </div>

        </section>

        <MobileBottomNav />

      </main>
    </ProtectedRoute>

  );

}