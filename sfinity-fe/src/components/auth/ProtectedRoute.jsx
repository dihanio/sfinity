"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Check if store is already hydrated
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    } else {
      const unsub = useAuthStore.persist.onFinishHydration(() => {
        setHydrated(true);
      });
      return () => {
        if (unsub) unsub();
      };
    }
  }, []);

  useEffect(() => {
    // Only redirect if hydration is complete and token is missing
    if (hydrated && !token) {
      router.push("/login");
    }
  }, [hydrated, token, router]);

  if (!hydrated || !token) {
    return null;
  }

  return children;
}