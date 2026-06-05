
"use client";

import {
  useState,useEffect,
} from "react";

import Link
from "next/link";

import {

  Receipt,

  Search,

  ImageIcon,

  ArrowRight,

  X,

} from "lucide-react";

import { toast }
from "sonner";

import {
  useReceiptStore,
} from "@/stores/useReceiptStore";

import {
  useCategoryStore,
} from "@/stores/useCategoryStore";

export default function
ScanHistory({

  limit,

  compact = false,

}) {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const scans =
    useReceiptStore(
      (state) =>
        state.scans || []
    );

  const deleteScan =
    useReceiptStore(
      (state) =>
        state.deleteScan
    );

  const clearScans =
    useReceiptStore(
      (state) =>
        state.clearScans
    );

  const updateScan =
    useReceiptStore(
      (state) =>
        state.updateScan
    );

  const categories =
    useCategoryStore(
      (state) =>
        state.categories
    );

  const fetchCategories =
    useCategoryStore(
      (state) =>
        state.fetchCategories
    );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const expenseCategories =
    categories.filter(
      (item) =>
        item.type === "expense"
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  SEARCH
  ━━━━━━━━━━━━━━━━━━━
  */
  const [
    search,
    setSearch,
  ] = useState("");

  /*
  ━━━━━━━━━━━━━━━━━━━
  DETAIL MODAL
  ━━━━━━━━━━━━━━━━━━━
  */
  const [
    selectedScan,
    setSelectedScan,
  ] = useState(null);

  /*
  ━━━━━━━━━━━━━━━━━━━
  EDIT
  ━━━━━━━━━━━━━━━━━━━
  */
  const [
    editingId,
    setEditingId,
  ] = useState(null);

  const [
    form,
    setForm,
  ] = useState({

    merchant: "",

    total: 0,

    category: "",

  });

  /*
  ━━━━━━━━━━━━━━━━━━━
  FILTER
  ━━━━━━━━━━━━━━━━━━━
  */
  const [
  currentPage,
  setCurrentPage,
] = useState(1);

const ITEMS_PER_PAGE =
  compact
    ? limit || 4
    : 5;

const filteredData =
  scans.filter(
    (item) =>

      item.merchant
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      (
        typeof item.category ===
        "object"

          ? item.category.name

          : item.category
      )
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

const totalPages =
  Math.ceil(
    filteredData.length /
    ITEMS_PER_PAGE
  );

const filtered =
  filteredData.slice(

    (
      currentPage - 1
    ) *
    ITEMS_PER_PAGE,

    currentPage *
    ITEMS_PER_PAGE

  );

  /*
  ━━━━━━━━━━━━━━━━━━━
  DELETE
  ━━━━━━━━━━━━━━━━━━━
  */
  async function handleDelete(id) {

    try {

      await deleteScan(id);

      toast.success(
        "Receipt & transaksi terkait berhasil dihapus"
      );

    } catch (error) {

      toast.error(
        "Gagal menghapus receipt"
      );

    }

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  CLEAR
  ━━━━━━━━━━━━━━━━━━━
  */
  async function handleClear() {

    if (
      !window.confirm(
        "Yakin ingin menghapus semua history? Semua transaksi terkait juga akan dihapus."
      )
    ) {
      return;
    }

    try {

      await clearScans();

      toast.success(
        "Semua history berhasil dihapus"
      );

    } catch (error) {

      toast.error(
        "Gagal menghapus semua history"
      );

    }

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  EDIT
  ━━━━━━━━━━━━━━━━━━━
  */
  function handleEdit(item) {

    setEditingId(

      item._id ||
      item.id

    );

    setForm({

      merchant:
        item.merchant,

      total:
        item.total,

      category:
        typeof item.category === "object"
          ? (item.category?._id || "")
          : (item.category || ""),

    });

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  SAVE
  ━━━━━━━━━━━━━━━━━━━
  */
  async function handleSave(id) {

    if (!form.merchant?.trim()) {
      toast.error("Merchant wajib diisi");
      return;
    }

    if (!form.total || Number(form.total) <= 0) {
      toast.error("Total nominal harus lebih dari 0");
      return;
    }

    if (!form.category) {
      toast.error("Kategori wajib dipilih");
      return;
    }

    try {
      await updateScan(

        id,

        {

          merchant:
            form.merchant,

          total:
            Number(
              form.total
            ),

          category:
            form.category,

        }

      );

      toast.success(
        "History berhasil diupdate"
      );

      setEditingId(null);

      const updatedCat = expenseCategories.find(c => c._id === form.category);
      setSelectedScan(prev => prev ? {
        ...prev,
        merchant: form.merchant,
        total: Number(form.total),
        category: updatedCat || form.category
      } : null);

    } catch (err) {
      toast.error("Gagal mengupdate history");
    }

  }

  return (

    <>

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
              flex-col
              gap-5
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <div>

                <h2
                  className="
                    text-2xl
                    font-black
                    text-slate-900
                  "
                >
                  Scan History
                </h2>

                <p
                  className="
                    mt-1
                    text-slate-500
                  "
                >
                  Riwayat hasil OCR
                </p>

              </div>

            </div>

            {/* ACTION */}
            {
              !compact && (

                <div
                  className="
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                  "
                >

                  {/* SEARCH */}
                  <div
                    className="
                      relative
                    "
                  >

                    <Search
                      className="
                        absolute
                        left-4
                        top-1/2
                        h-5
                        w-5
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      placeholder="Cari merchant..."
                      className="
                        h-12
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        pl-12
                        pr-4
                        outline-none
                      "
                    />

                  </div>

                  {/* CLEAR */}
                  <button
                    onClick={
                      handleClear
                    }
                    className="
                      h-12
                      rounded-2xl
                      bg-red-500
                      px-5
                      font-semibold
                      text-blue-600
                    "
                  >

                    Hapus Semua

                  </button>

                </div>

              )
            }

          </div>

        </div>

        {/* EMPTY */}
        {
          filtered.length === 0 && (

            <div
              className="
                p-14
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

                <Receipt
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
                  text-slate-900
                "
              >
                Belum Ada History
              </h3>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Hasil scan receipt
                akan muncul di sini
              </p>

            </div>

          )
        }

        {/* LIST */}
        <div className="space-y-6 p-6">

          {
            filtered.map(
              (item) => (

                <div

                  key={
                    item._id ||
                    item.id
                  }

                  onClick={() =>
                    setSelectedScan(
                      item
                    )
                  }

                  className="
                    cursor-pointer
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-slate-200
                    bg-slate-50
                    transition-all
                    hover:-translate-y-1
                    hover:border-slate-300
                    hover:shadow-lg
                  "
                >

                  {/* IMAGE */}
                  {
                    item.image ? (

                      <div
                        className={`
                          flex
                          items-center
                          justify-center
                          bg-slate-100
                          p-4
                          ${
                            compact
                              ? "h-[220px]"
                              : "h-[320px]"
                          }
                        `}
                      >

                        <img
                          src={item.image}
                          alt="receipt"
                          className="
                            h-full
                            w-full
                            rounded-2xl
                            object-contain
                          "
                        />

                      </div>

                    ) : (

                      <div
                        className={`
                          flex
                          items-center
                          justify-center
                          bg-slate-100
                          ${
                            compact
                              ? "h-[220px]"
                              : "h-[320px]"
                          }
                        `}
                      >

                        <ImageIcon
                          className="
                            h-14
                            w-14
                            text-slate-300
                          "
                        />

                      </div>

                    )
                  }

                  {/* CONTENT */}
                  <div className="p-6">

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >

                      <div>

                        <h3
                          className="
                            text-2xl
                            font-black
                            text-slate-900
                          "
                        >
                          {item.merchant}
                        </h3>

                        <p
                          className="
                            mt-4
                            text-4xl
                            font-black
                            text-blue-600
                          "
                        >
                          Rp{" "}

                          {
                            Number(
                              item.total || 0
                            ).toLocaleString(
                              "id-ID"
                            )
                          }

                        </p>

                        <div
                          className="
                            mt-4
                            inline-flex
                            rounded-xl
                            bg-white
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-slate-700
                          "
                        >

                          {
                            typeof item.category ===
                            "object"

                              ? item.category.name

                              : item.category
                          }

                        </div>

                      </div>

                      {/* DATE */}
                      <div
                        className="
                          rounded-xl
                          bg-white
                          px-3
                          py-2
                          text-xs
                          font-semibold
                          text-slate-500
                        "
                      >

                        {
                          new Date(
                            item.createdAt
                          ).toLocaleDateString(
                            "id-ID",
                            {

                              day: "numeric",

                              month: "short",

                            }
                          )
                        }

                      </div>

                    </div>

                  </div>

                </div>

              )
            )
          }
{
  !compact &&
  totalPages > 1 && (

    <div
      className="
        flex
        items-center
        justify-center
        gap-2
        px-6
        pb-6
      "
    >

      {/* PREV */}
      <button

        onClick={() =>
          setCurrentPage(
            (prev) =>
              prev - 1
          )
        }

        disabled={
          currentPage === 1
        }

        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-2
          text-sm
          font-semibold
          disabled:opacity-50
        "
      >

        ← Prev

      </button>

      {/* PAGE */}
      {
        Array.from({

          length:
            totalPages,

        }).map(

          (_, index) => {

            const page =
              index + 1;

            return (

              <button

                key={page}

                onClick={() =>
                  setCurrentPage(
                    page
                  )
                }

                className={`

                  h-10
                  w-10
                  rounded-xl
                  font-bold

                  ${
                    currentPage ===
                    page

                      ? `
                        bg-blue-600
                        text-white
                      `

                      : `
                        border
                        border-slate-200
                        bg-white
                      `
                  }

                `}
              >

                {page}

              </button>

            );

          }

        )
      }

      {/* NEXT */}
      <button

        onClick={() =>
          setCurrentPage(
            (prev) =>
              prev + 1
          )
        }

        disabled={
          currentPage ===
          totalPages
        }

        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-2
          text-sm
          font-semibold
          disabled:opacity-50
        "
      >

        Next →

      </button>

    </div>

  )
}
          {/* VIEW ALL */}
          {
            compact &&
            scans.length > 1 && (

              <Link
                href="/scan/history"
                className="
                  flex
                  h-14
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-blue-100
                  font-semibold
                  text-blue-600
                "
              >

                Lihat Semua History

                <ArrowRight
                  className="
                    h-5
                    w-5
                  "
                />

              </Link>

            )
          }

        </div>

      </div>

      {/* DETAIL MODAL */}
      {/* DETAIL MODAL */}
{
  selectedScan && (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-6
      "
    >

      <div
        className="
          max-h-[90vh]
          w-full
          max-w-4xl
          overflow-y-auto
          rounded-[32px]
          bg-white
          p-6
        "
      >

        {/* HEADER */}
        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <h2
            className="
              text-3xl
              font-black
              text-slate-900
            "
          >
            Detail Receipt
          </h2>

          <button
            onClick={() =>
              setSelectedScan(null)
            }
            className="
              flex
              h-12
              w-12
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

        {/* IMAGE */}
        {
          selectedScan.image && (

            <div
  className="
    mt-6
    flex
    justify-center
    rounded-3xl
    border
    border-slate-200
    bg-slate-50
    p-4
  "
>

  <img
    src={selectedScan.image}
    alt="receipt"
    className="
      max-h-[350px]
      w-auto
      rounded-2xl
      object-contain
    "
  />

</div>

          )
        }

        {/* CONTENT */}
        <div
          className="
            mt-6
            space-y-5
          "
        >

          {/* MERCHANT */}
          <div
            className="
              rounded-2xl
              bg-slate-50
              p-5
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

            {
              editingId ===
              (
                selectedScan._id ||
                selectedScan.id
              )

                ? (

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
                      mt-3
                      w-full
                      rounded-xl
                      border
                      p-3
                    "
                  />

                )

                : (

                  <h3
                    className="
                      mt-2
                      text-2xl
                      font-black
                    "
                  >
                    {
                      selectedScan.merchant
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

            <p
              className="
                text-sm
                text-blue-600
              "
            >
              Total
            </p>

            {
              editingId ===
              (
                selectedScan._id ||
                selectedScan.id
              )

                ? (

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
                      mt-3
                      w-full
                      rounded-xl
                      border
                      p-3
                    "
                  />

                )

                : (

                  <h3
                    className="
                      mt-2
                      text-3xl
                      font-black
                      text-blue-600
                    "
                  >
                    Rp{" "}
                    {
                      Number(
                        selectedScan.total
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

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Category
            </p>

            {
              editingId ===
              (
                selectedScan._id ||
                selectedScan.id
              )

                ? (

                  <select
                    value={
                      form.category
                    }
                    onChange={(e) =>
                      setForm({

                        ...form,

                        category:
                          e.target.value,

                      })
                    }
                    className="
                      mt-3
                      w-full
                      rounded-xl
                      border
                      p-3
                      bg-white
                    "
                  >
                    <option value="">Pilih Kategori</option>
                    {expenseCategories.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                )

                : (

                  <h3
                    className="
                      mt-2
                      text-xl
                      font-bold
                    "
                  >
                    {
                      typeof selectedScan.category ===
                      "object"

                        ? selectedScan.category.name

                        : selectedScan.category
                    }
                  </h3>

                )
            }

          </div>

        </div>

        {/* ACTIONS */}
        <div
          className="
            mt-8
            flex
            gap-3
          "
        >

          {
            editingId ===
            (
              selectedScan._id ||
              selectedScan.id
            )

              ? (

                <button

                  onClick={() => {

                    handleSave(
                      selectedScan._id ||
                      selectedScan.id
                    );

                  }}

                  className="
                    flex-1
                    rounded-2xl
                    bg-emerald-600
                    py-3
                    font-semibold
                    text-white
                  "
                >

                  Save

                </button>

              )

              : (

                <button

                  onClick={() =>
                    handleEdit(
                      selectedScan
                    )
                  }

                  className="
                    flex-1
                    rounded-2xl
                    bg-orange-500
                    py-3
                    font-semibold
                    text-white
                  "
                >

                  Edit

                </button>

              )
          }

          <button

            onClick={() => {

              handleDelete(
                selectedScan._id ||
                selectedScan.id
              );

              setSelectedScan(
                null
              );

            }}

            className="
              flex-1
              rounded-2xl
              bg-red-500
              py-3
              font-semibold
              text-white
            "
          >

            Delete

          </button>

        </div>

      </div>

    </div>

  )
}

    </>

  );

}
