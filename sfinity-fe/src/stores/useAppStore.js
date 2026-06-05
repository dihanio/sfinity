"use client";

import { create }
from "zustand";

export const useAppStore =
  create((set) => ({

    user: null,

    stats: null,

    achievements: [],

    activities: [],

    receipts: [],

    transactions: [],

    setDashboard:
      (data) =>

        set({

          user:
            data.user,

          stats:
            data.stats,

          achievements:
            data.achievements,

          activities:
            data.activities,

          receipts:
            data.receipts,

          transactions:
            data.transactions,

        }),

  }));