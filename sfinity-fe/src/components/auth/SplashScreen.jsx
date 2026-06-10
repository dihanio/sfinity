"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
      {/* BACKGROUND GLOW */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute h-[320px] w-[320px] rounded-full bg-gradient-to-r from-cyan-100 via-blue-100 to-orange-100 blur-3xl"
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* LOGO */}
        <motion.div
          initial={{
            scale: 0.6,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/logo.png"
              alt="Sfinity Logo"
              width={220}
              height={220}
              priority
              className="h-auto w-[180px] sm:w-[220px] object-contain"
            />
          </motion.div>
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="mt-2 text-4xl sm:text-5xl font-black tracking-tight text-slate-900"
        >
          SFINITY
        </motion.h1>

        {/* TAGLINE */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6,
          }}
          className="mt-3 text-center text-sm sm:text-base text-slate-500"
        >
          Kelola Keuangan, Raih Tujuan
        </motion.p>

        {/* LOADING */}
        <div className="mt-10 w-40 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: "100%",
            }}
            transition={{
              duration: 2.8,
              ease: "easeInOut",
            }}
            className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-orange-400"
          />
        </div>
      </div>
    </div>
  );
}