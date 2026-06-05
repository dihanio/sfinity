"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  X,
} from "lucide-react";

import { toast }
from "sonner";

import {
  useCategoryStore,
} from "@/stores/useCategoryStore";

export default function CategoryManager() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const {

    categories,

    fetchCategories,

    addCategory,

    editCategory,

    removeCategory,

  } =
    useCategoryStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  FORM
  ━━━━━━━━━━━━━━━━━━━
  */
  const [form, setForm] =
    useState({

      name: "",

      type: "",

    });

  /*
  ━━━━━━━━━━━━━━━━━━━
  EDITING
  ━━━━━━━━━━━━━━━━━━━
  */
  const [
    editingId,
    setEditingId,
  ] =
    useState(null);

  /*
  ━━━━━━━━━━━━━━━━━━━
  FETCH CATEGORY
  ━━━━━━━━━━━━━━━━━━━
  */
  useEffect(() => {

    fetchCategories();

  }, [fetchCategories]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  RESET
  ━━━━━━━━━━━━━━━━━━━
  */
  function resetForm() {

    setForm({

      name: "",

      type: "",

    });

    setEditingId(null);

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  HANDLE CHANGE
  ━━━━━━━━━━━━━━━━━━━
  */
  function handleChange(e) {

    const {

      name,

      value,

    } = e.target;

    setForm((prev) => ({

      ...prev,

      [name]: value,

    }));

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  ADD
  ━━━━━━━━━━━━━━━━━━━
  */
  async function handleAdd() {

    /*
    VALIDATION
    */
    if (

      !form.name ||

      !form.type

    ) {

      toast.error(
        "Semua field wajib diisi"
      );

      return;

    }

    /*
    DUPLICATE CHECK
    */
    const exists =
      categories.find(

        (item) =>

          item.name
            .toLowerCase()
            .trim() ===

            form.name
              .toLowerCase()
              .trim()

          &&

          item.type ===
          form.type

      );

    if (exists) {

      toast.error(
        "Kategori sudah ada"
      );

      return;

    }

    /*
    CREATE
    */
    await addCategory({

      name:
        form.name.trim(),

      type:
        form.type,

    });

    toast.success(
      "Kategori berhasil ditambahkan"
    );

    /*
    RESET
    */
    resetForm();

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  EDIT START
  ━━━━━━━━━━━━━━━━━━━
  */
  function handleEdit(item) {

    setEditingId(
      item._id
    );

    setForm({

      name:
        item.name,

      type:
        item.type,

    });

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  SAVE
  ━━━━━━━━━━━━━━━━━━━
  */
  async function handleSave(id) {

    /*
    VALIDATION
    */
    if (

      !form.name ||

      !form.type

    ) {

      toast.error(
        "Semua field wajib diisi"
      );

      return;

    }

    /*
    DUPLICATE CHECK
    */
    const exists =
      categories.find(

        (item) =>

          item.name
            .toLowerCase()
            .trim() ===

            form.name
              .toLowerCase()
              .trim()

          &&

          item.type ===
          form.type

          &&

          item._id !== id

      );

    if (exists) {

      toast.error(
        "Kategori sudah ada"
      );

      return;

    }

    /*
    UPDATE
    */
    await editCategory(

      id,

      {

        name:
          form.name.trim(),

        type:
          form.type,

      }

    );

    toast.success(
      "Kategori berhasil diupdate"
    );

    /*
    RESET
    */
    resetForm();

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  DELETE
  ━━━━━━━━━━━━━━━━━━━
  */
  async function handleDelete(id) {

  const confirmed =
    window.confirm(
      "Hapus kategori ini?"
    );

  if (!confirmed) return;

  try {

    await removeCategory(id);

    toast.success(
      "Kategori berhasil dihapus"
    );

  } catch (error) {

    toast.error(

      error?.response?.data?.message ||

      "Gagal menghapus kategori"

    );

  }

}

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
            Category Manager
          </h2>

          <p
            className="
              mt-1
              text-slate-500
            "
          >
            Kelola kategori transaksi
            dan budget
          </p>

        </div>

      </div>

      {/* FORM */}
      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-4
          md:grid-cols-3
        "
      >

        {/* INPUT */}
        <input

          type="text"

          name="name"

          placeholder="Nama kategori"

          value={form.name}

          onChange={handleChange}

          className="
            h-14
            rounded-2xl
            border
            border-slate-200
            px-5
            outline-none
            transition-all
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
        />

        {/* TYPE */}
        <select

          name="type"

          value={form.type}

          onChange={handleChange}

          className="
            h-14
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            outline-none
            transition-all
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
        >

        <option value="">
  Pilih tipe kategori
</option>

<option value="expense">
  Pengeluaran
</option>

<option value="income">
  Pemasukan
</option>

        </select>

        {/* EDIT MODE */}
        {editingId ? (

          <div className="flex gap-3">

            {/* SAVE */}
            <button

              onClick={() =>
                handleSave(
                  editingId
                )
              }

              className="
                flex
                h-14
                flex-1
                items-center
                justify-center
                rounded-2xl
                bg-emerald-600
                font-semibold
                text-blue-600
                transition-all
                hover:bg-emerald-700
              "
            >
              Save
            </button>

            {/* CANCEL */}
            <button

              onClick={
                resetForm
              }

              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-200
                bg-white
                transition-all
                hover:bg-slate-100
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

        ) : (

          /* ADD */
          <button

            onClick={
              handleAdd
            }

            className="
              flex
              h-14
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-blue-100
              font-semibold
              text-blue-600
              transition-all
              hover:bg-blue-300
            "
          >

            <Plus
              className="
                h-5
                w-5
              "
            />

            Tambah

          </button>

        )}

      </div>

      {/* EMPTY */}
      {categories.length === 0 && (

        <div
          className="
            mt-10
            rounded-3xl
            border
            border-dashed
            border-slate-200
            p-10
            text-center
          "
        >

          <p
            className="
              text-slate-500
            "
          >
            Belum ada kategori
          </p>

        </div>

      )}

      {/* LIST */}
      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {categories.map(
          (item) => (

            <div

              key={item._id}

              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-4
                transition-all
                hover:border-slate-300
              "
            >

              {/* LEFT */}
              <div>

                <h3
                  className="
                    font-bold
                    text-slate-900
                  "
                >
                  {item.name}
                </h3>

                <p
                  className={`
                    mt-1
                    text-sm
                    font-medium
                    ${
                      item.type ===
                      "income"

                        ? "text-emerald-600"

                        : "text-red-500"
                    }
                  `}
                >

                  {
                    item.type ===
                    "income"

                      ? "Pemasukan"

                      : "Pengeluaran"
                  }

                </p>

              </div>

              {/* ACTION */}
              <div className="flex gap-2">

                {/* EDIT */}
                <button

                  onClick={() =>
                    handleEdit(
                      item
                    )
                  }

                  className="
                    rounded-xl
                    bg-blue-100
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-blue-600
                    transition-all
                    hover:bg-blue-200
                  "
                >
                  Edit
                </button>

                {/* DELETE */}
                <button

                  onClick={() =>
                    handleDelete(
                      item._id
                    )
                  }

                  className="
                    rounded-xl
                    bg-red-100
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-red-500
                    transition-all
                    hover:bg-red-200
                  "
                >
                  Hapus
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

}
