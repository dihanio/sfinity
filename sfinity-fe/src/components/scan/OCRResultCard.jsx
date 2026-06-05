"use client";

import {
  useMemo,
  useState,
} from "react";

import {

  Receipt,

  ImageIcon,

  Sparkles,

  CheckCircle2,

  X,

  Store,

  Wallet,

  Tag,

  Loader2,

  BrainCircuit,

  TrendingUp,

  ShieldCheck,

} from "lucide-react";

import { toast }
from "sonner";

import {
  useReceiptStore,
} from "@/stores/useReceiptStore";

import {
  useCategoryStore,
} from "@/stores/useCategoryStore";

export default function OCRResultCard() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  LOCAL STATE
  ━━━━━━━━━━━━━━━━━━━
  */
  const [
    editing,
    setEditing,
  ] = useState(false);

  const [
    saving,
    setSaving,
  ] = useState(false);

  /*
  ━━━━━━━━━━━━━━━━━━━
  RECEIPT STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const image =
    useReceiptStore(
      (state) =>
        state.image
    );

  const loading =
    useReceiptStore(
      (state) =>
        state.loading
    );

  const result =
    useReceiptStore(
      (state) =>
        state.result
    );
  const resetScan =
    useReceiptStore(
      (state) =>
        state.resetScan
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
  ━━━━━━━━━━━━━━━━━━━
  CATEGORY STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const categories =
    useCategoryStore(
      (state) =>
        state.categories
    );

  const expenseCategories =
    useMemo(

      () =>

        categories.filter(

          (item) =>

            item.type ===
            "expense"

        ),
        

      [categories]

    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  FORM
  ━━━━━━━━━━━━━━━━━━━
  */
  const [
    form,
    setForm,
  ] = useState({

    merchant: "",
    total: 0,

    category: {

      _id: "",
      name: "",

    },

    rawText: "",

  });

  /*
  ━━━━━━━━━━━━━━━━━━━
  START EDIT
  ━━━━━━━━━━━━━━━━━━━
  */
  function handleEdit() {

    if (!result) return;

    setForm({

      merchant:
        result.merchant || "",

      total:
        result.total || 0,

      category:
        result.category || {

          _id: "",
          name: "",

        },

      rawText:
        result.rawText || "",

    });

    setEditing(true);

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  SAVE EDIT
  ━━━━━━━━━━━━━━━━━━━
  */
  function handleSaveEdit() {

    if (!result) return;

    setResult({

      ...result,

      merchant:
        form.merchant,

      total:
        Number(
          form.total
        ),

      category:
        form.category,

      rawText:
        form.rawText,

    });

    toast.success(
      "OCR berhasil diupdate ✨"
    );

    setEditing(false);

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  SAVE RECEIPT
  ━━━━━━━━━━━━━━━━━━━
  */
  async function handleSaveReceipt() {

    try {

      if (
        !result ||
        saving
      ) {
        return;
      }

      /*
      VALIDATION
      */
      if (
        !result.category?._id
      ) {

        toast.error(
          "Category wajib dipilih"
        );

        return;

      }

      setSaving(true);

      /*
      SAVE
      */
      await addScan(

        {

          merchant:
            result.merchant,

          total:
            result.total,

          category:
            result.category._id,

          rawText:
            result.rawText,

          confidence:
            result.confidence,

        },

        image

      );

      /*
      SUCCESS
      */
      toast.success(

        "Receipt berhasil disimpan 🎉"

      );

      /*
      RESET
      */
      resetScan();

      setEditing(false);

    } catch (error) {

      console.log(error);

      toast.error(

        error?.response?.data?.message ||

        "Gagal menyimpan receipt"

      );

    } finally {

      setSaving(false);

    }

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  CONFIDENCE
  ━━━━━━━━━━━━━━━━━━━
  */
  const confidence =
    result?.confidence || 92;

  const confidenceColor =

    confidence >= 90

      ? "text-emerald-600"

      : confidence >= 70

      ? "text-orange-500"

      : "text-red-500";
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

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

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

              <Receipt
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
                OCR Result
              </h2>

              <p
                className="
                  mt-1
                  text-slate-500
                "
              >
                OCR realtime analysis
              </p>

            </div>

          </div>

          {
            result && (

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-slate-100
                  px-4
                  py-2
                "
              >

                <ShieldCheck
                  className={`
                    h-5
                    w-5
                    ${confidenceColor}
                  `}
                />

                <span
                  className={`
                    text-sm
                    font-bold
                    ${confidenceColor}
                  `}
                >
                  {confidence}%
                </span>

              </div>

            )
          }

        </div>

      </div>

      {/* LOADING */}
      {
        loading && (

          <div
            className="
              p-10
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                animate-pulse
                items-center
                justify-center
                rounded-full
                bg-blue-100
              "
            >

              <Sparkles
                className="
                  h-10
                  w-10
                  text-blue-600
                "
              />

            </div>

            <h3
              className="
                mt-6
                text-2xl
                font-black
                text-slate-900
              "
            >
              Sedang Scan...
            </h3>

            <p
              className="
                mt-3
                text-slate-500
              "
            >
              Membaca receipt dan menganalisa transaksi
            </p>

          </div>

        )
      }

      {/* EMPTY */}
      {
        !loading &&
        !result && (

          <div
            className="
              p-10
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-slate-100
              "
            >

              <ImageIcon
                className="
                  h-10
                  w-10
                  text-slate-400
                "
              />

            </div>

            <h3
              className="
                mt-6
                text-2xl
                font-black
                text-slate-800
              "
            >
              Belum Ada Receipt
            </h3>

            <p
              className="
                mt-3
                text-slate-500
              "
            >
              Upload receipt untuk memulai OCR
            </p>

          </div>

        )
      }

      {/* RESULT */}
      {
        !loading &&
        result && (

          <div className="p-6">

            {/* IMAGE */}
            {
              image && (

                <div
                  className="
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-slate-200
                    bg-slate-100
                  "
                >

                  <img
                    src={image}
                    alt="receipt"
                    loading="lazy"
                    className="
                      h-auto
                      max-h-[450px]
                      w-full
                      object-contain
                    "
                  />

                </div>

              )
            }

            {/* SUCCESS */}
            <div
              className="
                mt-6
                flex
                items-center
                justify-between
                gap-4
                rounded-2xl
                bg-emerald-50
                p-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <CheckCircle2
                  className="
                    h-6
                    w-6
                    text-emerald-500
                  "
                />

                <div>

                  <h3
                    className="
                      font-bold
                      text-emerald-700
                    "
                  >
                    OCR Berhasil
                  </h3>

                  <p
                    className="
                      text-sm
                      text-emerald-600
                    "
                  >
                    Berhasil membaca receipt
                  </p>

                </div>

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white/70
                  px-3
                  py-2
                "
              >

                <BrainCircuit
                  className="
                    h-5
                    w-5
                    text-violet-600
                  "
                />

                <span
                  className="
                    text-sm
                    font-semibold
                    text-violet-700
                  "
                >
                  Auto Categorized
                </span>

              </div>

            </div>

            {/* INSIGHT */}
            <div
              className="
                mt-6
                rounded-2xl
                border
                border-blue-100
                bg-blue-50
                p-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <TrendingUp
                  className="
                    h-5
                    w-5
                    text-blue-600
                  "
                />

                <h3
                  className="
                    font-bold
                    text-blue-700
                  "
                >
                  Spending Insight
                </h3>

              </div>

              <p
                className="
                  mt-3
                  text-sm
                  leading-relaxed
                  text-blue-700
                "
              >
                Pengeluaran kamu di kategori
                {" "}
                <span className="font-bold">
                  {result.category?.name}
                </span>
                {" "}
                meningkat dibanding minggu lalu.
              </p>

            </div>

            {/* RESULT CARDS */}
            <div className="mt-6 space-y-4">

              {/* MERCHANT */}
              <div
                className="
                  rounded-2xl
                  bg-slate-50
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Store
                    className="
                      h-5
                      w-5
                      text-slate-500
                    "
                  />

                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Merchant Recognition
                  </p>

                </div>

                {
                  editing ? (

                    <input
                      value={
                        form.merchant
                      }
                      onChange={(e) =>
                        setForm({

                          ...form,

                          merchant:
                            e.target.value,

                        })
                      }
                      className="
                        mt-4
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        outline-none
                      "
                    />

                  ) : (

                    <h3
                      className="
                        mt-3
                        text-xl
                        font-black
                        text-slate-900
                      "
                    >
                      {
                        result.merchant
                      }
                    </h3>

                  )
                }

              </div>

              {/* TOTAL */}
              <div
                className="
                  rounded-2xl
                  bg-blue-50
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Wallet
                    className="
                      h-5
                      w-5
                      text-blue-600
                    "
                  />

                  <p
                    className="
                      text-sm
                      text-blue-600
                    "
                  >
                    Total Transaction
                  </p>

                </div>

                {
                  editing ? (

                    <input
                      type="number"
                      value={
                        form.total
                      }
                      onChange={(e) =>
                        setForm({

                          ...form,

                          total:
                            e.target.value,

                        })
                      }
                      className="
                        mt-4
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        outline-none
                      "
                    />

                  ) : (

                    <h3
                      className="
                        mt-3
                        text-3xl
                        font-black
                        text-blue-600
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

                  )
                }

              </div>

              {/* CATEGORY */}
              <div
                className="
                  rounded-2xl
                  bg-slate-50
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Tag
                    className="
                      h-5
                      w-5
                      text-slate-500
                    "
                  />

                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Auto Category
                  </p>

                </div>

                {
                  editing ? (

                    <select
                      value={
                        form.category._id
                      }
                      onChange={(e) => {

                        const selected =
                          expenseCategories.find(

                            (item) =>

                              item._id ===
                              e.target.value

                          );

                        if (!selected) return;

                        setForm({

                          ...form,

                          category: {

                            _id:
                              selected._id,

                            name:
                              selected.name,

                          },

                        });

                      }}
                      className="
                        mt-4
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        outline-none
                      "
                    >

                      {
                        expenseCategories.map(
                          (item) => (

                            <option
                              key={item._id}
                              value={item._id}
                            >

                              {item.name}

                            </option>

                          )
                        )
                      }

                    </select>

                  ) : (

                    <h3
                      className="
                        mt-3
                        text-xl
                        font-black
                        text-slate-900
                      "
                    >
                      {
                        result.category?.name
                      }
                    </h3>

                  )
                }

              </div>

              {/* RAW OCR */}
              <div
                className="
                  rounded-2xl
                  bg-slate-50
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Sparkles
                    className="
                      h-5
                      w-5
                      text-slate-500
                    "
                  />

                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Raw OCR Text
                  </p>

                </div>

                {
                  editing ? (

                    <textarea
                      value={
                        form.rawText
                      }
                      onChange={(e) =>
                        setForm({

                          ...form,

                          rawText:
                            e.target.value,

                        })
                      }
                      className="
                        mt-4
                        min-h-[140px]
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        outline-none
                      "
                    />

                  ) : (

                    <pre
                      className="
                        mt-4
                        overflow-auto
                        whitespace-pre-wrap
                        rounded-xl
                        bg-white
                        p-4
                        text-sm
                        text-slate-600
                      "
                    >
                      {
                        result.rawText ||
                        "Tidak ada raw text"
                      }
                    </pre>

                  )
                }

              </div>

            </div>

            {/* ACTIONS */}
            <div
              className="
                mt-6
                grid
                grid-cols-3
                gap-4
              "
            >

              {/* RESET */}
              <button
                onClick={
                  resetScan
                }
                className="
                  flex
                  h-14
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  font-semibold
                  text-slate-700
                  transition-all
                  hover:bg-slate-50
                "
              >

                <X
                  className="
                    h-5
                    w-5
                  "
                />

                Reset

              </button>

              {/* EDIT */}
              {
                editing ? (

                  <button
                    onClick={
                      handleSaveEdit
                    }
                    className="
                      h-14
                      rounded-2xl
                      bg-emerald-600
                      font-semibold
                      text-white
                      transition-all
                      hover:bg-emerald-700
                    "
                  >

                    Save Edit

                  </button>

                ) : (

                  <button
                    onClick={
                      handleEdit
                    }
                    className="
                      h-14
                      rounded-2xl
                      bg-orange-500
                      font-semibold
                      text-white
                      transition-all
                      hover:bg-orange-600
                    "
                  >

                    Edit OCR

                  </button>

                )
              }

              {/* SAVE */}
              <button

                onClick={
                  handleSaveReceipt
                }

                disabled={saving}

                className={`
                  h-14
                  rounded-2xl
                  font-semibold
                  transition-all
                  ${
                    saving

                      ? "bg-slate-100 text-slate-400"

                      : "bg-blue-600 text-white hover:bg-blue-700"

                  }
                `}
              >

                {
                  saving

                    ? (

                      <div
                        className="
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >

                        <Loader2
                          className="
                            h-5
                            w-5
                            animate-spin
                          "
                        />

                        Menyimpan...

                      </div>

                    )

                    : "Simpan Receipt"

                }

              </button>

            </div>

          </div>

        )
      }

    </div>

  );

}
