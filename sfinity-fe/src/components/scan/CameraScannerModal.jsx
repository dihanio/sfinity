"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Tesseract from "tesseract.js";

import {
  X,
  Camera,
  Loader2,
} from "lucide-react";

import { toast }
from "sonner";

import { useReceiptStore } from "@/stores/useReceiptStore";
import { useCategoryStore } from "@/stores/useCategoryStore";

export default function CameraScannerModal({
  open,
  onClose,
}) {
  /*
    STORE
  */
  const categories = useCategoryStore((state) => state.categories);
  const expenseCategories = categories.filter((item) => item.type === "expense");

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


  /*
    REFS
  */
  const videoRef =
    useRef(null);

  const canvasRef =
    useRef(null);

  const streamRef =
    useRef(null);

  /*
    STATE
  */
  const [loading,
    setLoading] =
    useState(false);

  /*
    START CAMERA
  */
  async function startCamera() {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({

          video: {
            facingMode:
              "environment",
          },

          audio: false,

        });

      streamRef.current =
        stream;

      if (
        videoRef.current
      ) {

        videoRef.current.srcObject =
          stream;

      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Gagal membuka kamera"
      );

    }

  }

  /*
    STOP CAMERA
  */
  function stopCamera() {

    if (
      streamRef.current
    ) {

      streamRef.current

        .getTracks()

        .forEach(
          (track) =>
            track.stop()
        );

    }

  }

  /*
    PARSE OCR
  */
  function parseReceipt(text) {

    const lines =
      text
        .split("\n")
        .filter(
          (line) =>
            line.trim() !== ""
        );

    const merchant =
      lines[0] ||
      "Unknown Store";

    const totalRegex =
      /total.*?(\d+[.,]?\d+)/i;

    const totalMatch =
      text.match(totalRegex);

    const total =
      totalMatch

        ? Number(

            totalMatch[1]

              .replace(
                /[.,]/g,
                ""
              )

          )

        : 0;

    let categoryName = "Belanja";
    const merchantName = merchant.toLowerCase();

    if (
      merchantName.includes("breadtalk") ||
      merchantName.includes("mcd") ||
      merchantName.includes("kfc") ||
      merchantName.includes("pizza") ||
      merchantName.includes("kopi")
    ) {
      categoryName = "Makanan";
    } else if (
      merchantName.includes("indomaret") ||
      merchantName.includes("alfamart") ||
      merchantName.includes("superindo")
    ) {
      categoryName = "Belanja";
    } else if (
      merchantName.includes("gopay") ||
      merchantName.includes("grab") ||
      merchantName.includes("gojek")
    ) {
      categoryName = "Transport";
    }

    const categoryData = expenseCategories.find(
      (item) => item.name === categoryName
    );

    const category = categoryData || expenseCategories?.[0] || {
      _id: "",
      name: categoryName,
    };

    return {
      merchant,
      total,
      category,
      rawText: text,
      date: new Date().toLocaleDateString("id-ID"),
    };

  }

  /*
    CAPTURE
  */
  async function captureImage() {

    if (

      !videoRef.current ||

      !canvasRef.current

    ) return;

    setLoading(true);

    toast.loading(
      "AI sedang scan struk..."
    );

    try {

      const video =
        videoRef.current;

      const canvas =
        canvasRef.current;

      const context =
        canvas.getContext(
          "2d"
        );

      /*
        SIZE
      */
      canvas.width =
        video.videoWidth;

      canvas.height =
        video.videoHeight;

      /*
        DRAW
      */
      context.drawImage(

        video,

        0,

        0,

        canvas.width,

        canvas.height

      );

      /*
        IMAGE
      */
      const imageData =
        canvas.toDataURL(
          "image/png"
        );

      /*
        OCR
      */
      const {
        data: { text },
      } =
        await Tesseract.recognize(

          imageData,

          "eng"

        );

      /*
        RESULT
      */
      const result =
  parseReceipt(text);

/*
  SAVE IMAGE
*/
setImage(
  imageData
);

/*
  SAVE RESULT
*/
setResult(
  result
);

/*
  SAVE HISTORY
*/
addScan(
  result,
  imageData
);

      toast.dismiss();

      toast.success(
        "Struk berhasil discan"
      );

      /*
        CLOSE
      */
      onClose();

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
    EFFECT
  */
  useEffect(() => {

    if (open) {

      startCamera();

    }

    return () => {

      stopCamera();

    };

  }, [open]);

  /*
    HIDE
  */
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-2xl
          rounded-[32px]
          bg-white
          p-6
        "
      >

        {/* TOP */}
        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-black
                text-slate-900
              "
            >
              Live Camera Scan
            </h2>

            <p
              className="
                mt-1
                text-slate-500
              "
            >
              Scan receipt realtime
            </p>

          </div>

          <button
            onClick={
              onClose
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-slate-100
            "
          >

            <X
              className="
                h-5
                w-5
              "
            />

          </button>

        </div>

        {/* CAMERA */}
        <div
          className="
            relative
            mt-6
            overflow-hidden
            rounded-[28px]
            bg-black
          "
        >

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="
              h-[420px]
              w-full
              object-cover
            "
          />

        </div>

        {/* HIDDEN */}
        <canvas
          ref={canvasRef}
          className="hidden"
        />

        {/* BUTTON */}
        <button
          onClick={
            captureImage
          }
          disabled={loading}
          className="
            mt-6
            flex
            h-14
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-blue-100
            font-semibold
            text-blue-600
            transition-all
            hover:bg-blue-700
          "
        >

          {
            loading ? (

              <>
                <Loader2
                  className="
                    h-5
                    w-5
                    animate-spin
                  "
                />

                Scanning...
              </>

            ) : (

              <>
                <Camera
                  className="
                    h-5
                    w-5
                  "
                />

                Capture & Scan
              </>

            )
          }

        </button>

      </div>

    </div>
  );
}