"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Tesseract from "tesseract.js";

import { toast } from "sonner";

import {
  Camera,
  Loader2,
} from "lucide-react";

import { useReceiptStore } from "@/stores/useReceiptStore";
import { useCategoryStore } from "@/stores/useCategoryStore";

export default function LiveCameraScanner() {
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
    START CAMERA
  */
  async function startCamera() {

    try {

      const mediaStream =
        await navigator.mediaDevices.getUserMedia({

          video: {
            facingMode:
              "environment",
          },

          audio: false,

        });

      streamRef.current =
        mediaStream;

      if (
        videoRef.current
      ) {

        videoRef.current.srcObject =
          mediaStream;

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
    CAPTURE IMAGE
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
        PARSE
      */
      const result =
        parseReceipt(text);

      /*
        SAVE
      */
      setImage(
        imageData
      );

      setResult(
        result
      );

      toast.dismiss();

      toast.success(
        "Struk berhasil discan "
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
    START ON MOUNT
  */
  useEffect(() => {

    startCamera();

    return () => {

      stopCamera();

    };

  }, []);

  return (
    <div
      className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      {/* HEADER */}
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

          <Camera
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
            Live Camera Scan
          </h2>

          <p
            className="
              mt-1
              text-slate-500
            "
          >
            Scan struk realtime
            menggunakan kamera
          </p>

        </div>

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

        {/* OVERLAY */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >

          <div
            className="
              h-[240px]
              w-[85%]
              rounded-[32px]
              border-4
              border-white/80
            "
          />

        </div>

      </div>

      {/* CANVAS */}
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
          disabled:opacity-50
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
  );
}