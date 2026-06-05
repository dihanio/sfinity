"use client";

import { useEffect }
from "react";

import { useRouter }
from "next/navigation";

import Image
from "next/image";

import {
  motion,
} from "framer-motion";

export default function SplashScreen() {

  const router =
    useRouter();

  /*
    AUTO REDIRECT
  */
  useEffect(() => {

    const timer =
      setTimeout(() => {

        router.push(
          "/login"
        );

      }, 3000);

    return () =>
      clearTimeout(timer);

  }, [router]);

  return (

    <div
      className="
        relative
        flex
        h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#f5f7fb]
        px-4
      "
    >

      {/* BACKGROUND BLUR */}
      <div
        className="
          absolute
          top-[-60px]
          right-[-60px]
          h-40
          w-40
          rounded-full
          bg-blue-100
          opacity-60
          blur-2xl
        "
      />

      {/* CARD */}
      <motion.div

        initial={{
          opacity: 0,
          scale: 0.96,
          y: 30,
        }}

        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}

        transition={{
          duration: 0.8,
        }}

        className="
          relative
          w-full
          max-w-[420px]
          overflow-hidden
          rounded-[40px]
          border
          border-slate-200
          bg-white
          px-8
          py-8
          shadow-[0_20px_50px_rgba(15,23,42,0.06)]
        "
      >

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
          "
        >

          {/* LOGO */}
          <motion.div

            initial={{
              opacity: 0,
              scale: 0.8,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}

            transition={{
              delay: 0.2,
            }}

            className="
              flex
              flex-col
              items-center
            "
          >

            <Image
              src="/logo.png"
              alt="Sfinity"
              width={62}
              height={62}
              priority
              className="
                h-auto
                w-[62px]
                drop-shadow-sm
              "
            />

            <h1
              className="
                mt-4
                text-4xl
                font-extrabold
                tracking-tight
                text-blue-600
              "
              style={{
                letterSpacing:
                  "-0.04em",
              }}
            >
              SFINITY
            </h1>

            <p
              className="
                mt-3
                text-center
                text-sm
                leading-relaxed
                text-slate-500
              "
            >
              Kelola Keuangan,
              Raih Tujuan
            </p>

          </motion.div>

          {/* ILLUSTRATION */}
          <motion.div

            animate={{
              y: [0, -8, 0],
            }}

            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}

            className="
              mt-8
              flex
              justify-center
            "
          >

            <div
              className="
                rounded-[32px]
                bg-[#f8fafc]
                p-5
              "
            >

              <Image
                src="/splash.png"
                alt="Splash Illustration"
                width={210}
                height={210}
                priority
                className="
                  h-auto
                  w-full
                  max-w-[210px]
                  object-contain
                "
              />

            </div>

          </motion.div>

          {/* TEXT */}
          <div
            className="
              mt-8
              text-center
            "
          >

            <h2
              className="
                text-[30px]
                font-black
                leading-[1.2]
                text-slate-900
              "
            >
              Pantau dan tingkatkan
              kesehatan finansialmu
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-[300px]
                text-sm
                leading-7
                text-slate-500
              "
            >
              Semua transaksi,
              budgeting,
              dan progress
              dalam satu aplikasi modern.
            </p>

          </div>

        </div>

      </motion.div>

    </div>

  );

}