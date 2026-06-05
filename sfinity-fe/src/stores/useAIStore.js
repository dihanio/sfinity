"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { safeStorage } from "@/lib/safeStorage";
import { getAIPrediction } from "@/services/aiService";

export const useAIStore = create(
  persist(
    (set) => ({
      /*
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      STATE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      */
      aiAnalysis: null,
      loading: false,
      error: null,

      /*
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      ACTIONS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      */
      fetchAIAnalysis: async (demographics) => {
        set({ loading: true, error: null });
        try {
          const response = await getAIPrediction(demographics);
          if (response.success && response.data) {
            set({ aiAnalysis: response.data, loading: false });
            return { success: true };
          } else {
            set({ error: "Gagal memproses analisis AI.", loading: false });
            return { success: false };
          }
        } catch (err) {
          console.error("Error fetching AI analysis:", err);
          const errorMsg = err.response?.data?.message || err.message || "Gagal menghubungi server.";
          set({ error: errorMsg, loading: false });
          return { success: false };
        }
      },

      clearAIAnalysis: () => {
        set({ aiAnalysis: null, error: null, loading: false });
      }
    }),
    {
      name: "sfinity-ai-store",
      storage: safeStorage,
    }
  )
);
