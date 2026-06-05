"use client";

import Tesseract
from "tesseract.js";

import {
  useState,
} from "react";

import {
  Camera,
  ImageIcon,
  Loader2,
} from "lucide-react";

import { toast }
from "sonner";

import CameraScannerModal
from "./CameraScannerModal";

import {
  useReceiptStore,
} from "@/stores/useReceiptStore";

import {
  useActivityStore,
} from "@/stores/useActivityStore";

import {
  useGamificationStore,
} from "@/stores/useGamificationStore";

import {
  XP_REWARDS,
} from "@/data/xpRewards";

import {
  fileToBase64,
} from "@/lib/fileToBase64";

import {
  compressImage,
} from "@/lib/compressImage";

import {
  useCategoryStore,
} from "@/stores/useCategoryStore";

export default function
ReceiptUploadCard() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  CATEGORY STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const categories =
    useCategoryStore(
      (state) =>
        state.categories
    );
  /*
  ━━━━━━━━━━━━━━━━━━━
  EXPENSE CATEGORY
  ━━━━━━━━━━━━━━━━━━━
  */
  const expenseCategories =
    categories.filter(

      (item) =>

        item.type ===
        "expense"

    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  MODAL
  ━━━━━━━━━━━━━━━━━━━
  */
  const [
    openCamera,
    setOpenCamera,
  ] = useState(false);

  /*
  ━━━━━━━━━━━━━━━━━━━
  RECEIPT STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const setImage =
    useReceiptStore(
      (state) =>
        state.setImage
    );

  const setResult =
    useReceiptStore(
      (state) =>
        state.setResult
    );

  const addScan =
    useReceiptStore(
      (state) =>
        state.addScan
    );

  const setLoading =
    useReceiptStore(
      (state) =>
        state.setLoading
    );

  const loading =
    useReceiptStore(
      (state) =>
        state.loading
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  ACTIVITY
  ━━━━━━━━━━━━━━━━━━━
  */
  const addReceiptScan =
    useActivityStore(
      (state) =>
        state.addReceiptScan
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  XP
  ━━━━━━━━━━━━━━━━━━━
  */
  const addXP =
    useGamificationStore(
      (state) =>
        state.addXP
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  PARSE OCR
  ━━━━━━━━━━━━━━━━━━━
  */
  function parseReceipt(text) {

    /*
    CLEAN LINES
    */
    const lines =
      text
        .split("\n")
        .filter(
          (line) =>
            line.trim() !== ""
        );

    /*
    MERCHANT
    */
    const merchant =
      lines[0] ||
      "Unknown Store";

    /*
    ━━━━━━━━━━━━━━━━━━━
    EXTRACT TOTAL
    ━━━━━━━━━━━━━━━━━━━
    */
    function extractTotal(
      text
    ) {

      const matches =
        text.match(

          /\d{1,3}(?:[.,]\d{3})+/g

        );

      if (!matches)
        return 0;

      const numbers =
        matches.map((item) =>

          Number(

            item.replace(
              /[.,]/g,
              ""
            )

          )

        );

      return Math.max(
        ...numbers
      );

    }

    /*
    TOTAL
    */
    const total =
      extractTotal(text);

    /*
    ━━━━━━━━━━━━━━━━━━━
    AUTO CATEGORY
    ━━━━━━━━━━━━━━━━━━━
    */
    let categoryName =
      "Belanja";

    const merchantName =
      merchant.toLowerCase();

    /*
    FOOD
    */
    if (

      merchantName.includes(
        "breadtalk"
      ) ||

      merchantName.includes(
        "mcd"
      ) ||

      merchantName.includes(
        "kfc"
      ) ||

      merchantName.includes(
        "pizza"
      ) ||

      merchantName.includes(
        "kopi"
      )

    ) {

      categoryName =
        "Makanan";

    }

    /*
    MARKET
    */
    else if (

      merchantName.includes(
        "indomaret"
      ) ||

      merchantName.includes(
        "alfamart"
      ) ||

      merchantName.includes(
        "superindo"
      )

    ) {

      categoryName =
        "Belanja";

    }

    /*
    TRANSPORT
    */
    else if (

      merchantName.includes(
        "gopay"
      ) ||

      merchantName.includes(
        "grab"
      ) ||

      merchantName.includes(
        "gojek"
      )

    ) {

      categoryName =
        "Transport";

    }

    /*
    CATEGORY OBJECT
    */
    const categoryData =
      expenseCategories.find(

        (item) =>

          item.name ===
          categoryName

      );

    /*
    CATEGORY OBJ
    */
    const category = categoryData || expenseCategories?.[0] || {
      _id: "",
      name: categoryName,
    };

    /*
    RETURN
    */
    return {

      merchant,

      total,

      category,

      rawText: text,

      date:
        new Date()
          .toISOString(),

    };

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  OCR PROCESS
  ━━━━━━━━━━━━━━━━━━━
  */
  async function handleOCR(
    file
  ) {

    try {

      /*
      LOADING
      */
      setLoading(true);

      toast.loading(
        "AI sedang membaca struk..."
      );

      /*
      COMPRESS IMAGE
      */
      const compressed =
        await compressImage(
          file
        );

      /*
      BASE64
      */
      const imageBase64 =
        await fileToBase64(
          compressed
        );

      /*
      SAVE PREVIEW
      */
      setImage(
        imageBase64
      );

      /*
      OCR
      */
      const {
        data: { text },
      } =
        await Tesseract.recognize(

          compressed,

          "eng"

        );

      /*
      PARSE RESULT
      */
      const result =
        parseReceipt(text);

      /*
      VALIDASI TOTAL
      */
      if (

        result.total <= 0

      ) {

        toast.dismiss();

        toast.error(
          "Total gagal terbaca AI"
        );

        setResult(result);

        return;

      }

      /*
      SAVE RESULT
      */
      setResult(result);

      /*
      SAVE HISTORY + API
      */
      await addScan(

        result,

        imageBase64

      );

      /*
      SUCCESS
      */
      toast.dismiss();

      toast.success(

        `+${XP_REWARDS.RECEIPT_SCAN} XP Receipt berhasil discan`

      );

    } catch (error) {

      console.error(error);

      toast.dismiss();

      toast.error(
        "OCR gagal membaca struk"
      );

    } finally {

      setLoading(false);

    }

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  HANDLE UPLOAD
  ━━━━━━━━━━━━━━━━━━━
  */
  function handleUpload(e) {

    const file =
      e.target.files?.[0];

    if (!file) return;

    handleOCR(file);

  }

  return (

    <>

      <div
        className="
          rounded-[32px]
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
        "
      >

        {/* HEADER */}
        <div className="text-center">

          <h2
            className="
              text-3xl
              font-black
              text-slate-900
            "
          >
            AI Receipt Scanner
          </h2>

          <p
            className="
              mt-3
              text-slate-500
            "
          >
            Scan struk otomatis
            menggunakan AI OCR
          </p>

        </div>

        {/* ACTION */}
        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >

          {/* CAMERA */}
          <button
            type="button"
            onClick={() =>
              setOpenCamera(true)
            }
            className="
              rounded-[28px]
              border
              border-blue-200
              bg-blue-50
              p-6
              transition-all
              hover:scale-[1.02]
            "
          >

            <div className="text-center">

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-3xl
                  bg-blue-100
                  text-blue-600
                "
              >

                <Camera
                  className="
                    h-8
                    w-8
                  "
                />

              </div>

              <h3
                className="
                  mt-5
                  text-xl
                  font-black
                  text-slate-900
                "
              >
                Scan Kamera
              </h3>

            </div>

          </button>

          {/* UPLOAD */}
          <label
            className="
              cursor-pointer
              rounded-[28px]
              border
              border-slate-200
              bg-slate-50
              p-6
              transition-all
              hover:scale-[1.02]
            "
          >

            <div className="text-center">

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-3xl
                  bg-blue-100
                  text-blue-600
                "
              >

                <ImageIcon
                  className="
                    h-8
                    w-8
                  "
                />

              </div>

              <h3
                className="
                  mt-5
                  text-xl
                  font-black
                  text-slate-900
                "
              >
                Upload Gambar
              </h3>

            </div>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={
                handleUpload
              }
            />

          </label>

        </div>

        {/* LOADING */}
        {
          loading && (

            <div
              className="
                mt-8
                rounded-2xl
                bg-blue-50
                p-5
              "
            >

              <div className="flex items-center gap-4">

                <Loader2
                  className="
                    h-6
                    w-6
                    animate-spin
                    text-blue-600
                  "
                />

                <div>

                  <h3
                    className="
                      font-bold
                      text-slate-900
                    "
                  >
                    AI Scanning...
                  </h3>

                </div>

              </div>

            </div>

          )
        }

      </div>

      {/* CAMERA */}
      <CameraScannerModal
        open={openCamera}
        onClose={() =>
          setOpenCamera(false)
        }
      />

    </>

  );

}
