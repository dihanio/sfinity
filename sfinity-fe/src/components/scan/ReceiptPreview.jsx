"use client";

import Image
from "next/image";

import {
  ImageIcon,
  ScanLine,
} from "lucide-react";

import {
  useReceiptStore,
} from "@/stores/useReceiptStore";

export default function
ReceiptPreview() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const image =
    useReceiptStore(
      (state) =>
        state.image
    );

  const result =
    useReceiptStore(
      (state) =>
        state.result
    );

  return (

    <div
      className="
        overflow-hidden
        rounded-[32px]
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >

      {/* HEADER */}
      <div
        className="
          border-b
          border-slate-100
          p-6
        "
      >

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-blue-100
            "
          >

            <ScanLine
              className="
                h-7
                w-7
                text-blue-600
              "
            />

          </div>

          <div>

            <h2
              className="
                text-2xl
                font-black
                text-slate-900
              "
            >
              Preview
            </h2>

            <p
              className="
                mt-1
                text-slate-500
              "
            >
              Preview receipt realtime
            </p>

          </div>

        </div>

      </div>

      {/* PREVIEW */}
      <div
        className="
          bg-slate-50
        "
      >

        {
          image ? (

            <div
              className="
                p-5
              "
            >

              {/* IMAGE */}
              <div
                className="
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-slate-200
                  bg-slate-100
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    p-4
                  "
                >

                  <Image
                    src={image}
                    alt="receipt"
                    width={700}
                    height={1200}
                    priority
                    className="
                      h-auto
                      max-h-[760px]
                      w-auto
                      max-w-full
                      rounded-2xl
                      object-contain
                    "
                  />

                </div>

              </div>

              {/* RESULT */}
              {
                result && (

                  <div
                    className="
                      mt-5
                      space-y-4
                    "
                  >

                    {/* MERCHANT */}
                    <div
                      className="
                        rounded-2xl
                        bg-white
                        p-4
                      "
                    >

                      <p
                        className="
                          text-sm
                          text-slate-500
                        "
                      >
                        Merchant
                      </p>

                      <h3
                        className="
                          mt-2
                          text-xl
                          font-black
                          text-slate-900
                        "
                      >
                        {
                          result.merchant
                        }
                      </h3>

                    </div>

                    {/* TOTAL */}
                    <div
                      className="
                        rounded-2xl
                        bg-blue-50
                        p-4
                      "
                    >

                      <p
                        className="
                          text-sm
                          text-blue-600
                        "
                      >
                        Total OCR
                      </p>

                      <h3
                        className="
                          mt-2
                          text-3xl
                          font-black
                          text-blue-700
                        "
                      >
                        Rp{" "}

                        {
                          Number(
                            result.total || 0
                          ).toLocaleString(
                            "id-ID"
                          )
                        }

                      </h3>

                    </div>

                    {/* CATEGORY */}
                    <div
                      className="
                        rounded-2xl
                        bg-white
                        p-4
                      "
                    >

                      <p
                        className="
                          text-sm
                          text-slate-500
                        "
                      >
                        Category
                      </p>

                      <h3
                        className="
                          mt-2
                          text-xl
                          font-black
                          text-slate-900
                        "
                      >
                        {
                          typeof result.category ===
                          "object"

                            ? result.category.name

                            : result.category
                        }
                      </h3>

                    </div>

                  </div>

                )
              }

            </div>

          ) : (

            <div
              className="
                flex
                h-[520px]
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >

              {/* ICON */}
              <div
                className="
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-100
                "
              >

                <ImageIcon
                  className="
                    h-12
                    w-12
                    text-slate-400
                  "
                />

              </div>

              {/* TITLE */}
              <h3
                className="
                  mt-8
                  text-3xl
                  font-black
                  text-slate-800
                "
              >
                Belum Ada Preview
              </h3>

              {/* DESC */}
              <p
                className="
                  mt-3
                  max-w-sm
                  leading-relaxed
                  text-slate-500
                "
              >
                Upload atau scan receipt
                untuk melihat hasil OCR
                secara realtime
              </p>

            </div>

          )
        }

      </div>

    </div>

  );

}