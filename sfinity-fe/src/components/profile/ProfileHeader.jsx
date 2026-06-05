"use client";

import {

  useState,

} from "react";

import {

  toast,

} from "sonner";

import {

  useUserStore,

} from "@/stores/useUserStore";

function getProfileForm(user) {

  return {

    name:
      user?.name || "",

    email:
      user?.email || "",

    image:
      user?.image || "",

  };

}

export default function ProfileHeader() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const user =
    useUserStore(
      (state) =>
        state.user
    );

  const updateProfile =
    useUserStore(
      (state) =>
        state.updateProfile
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  EDIT MODE
  ━━━━━━━━━━━━━━━━━━━
  */
  const [

    isEdit,

    setIsEdit,

  ] = useState(false);

  /*
  ━━━━━━━━━━━━━━━━━━━
  FORM
  ━━━━━━━━━━━━━━━━━━━
  */
  const [

    form,

    setForm,

  ] = useState(() =>
    getProfileForm(null)
  );

  const visibleProfile =
    isEdit
      ? form
      : getProfileForm(user);

  /*
  ━━━━━━━━━━━━━━━━━━━
  SYNC USER
  ━━━━━━━━━━━━━━━━━━━
  */
  /*
  ━━━━━━━━━━━━━━━━━━━
  SAVE
  ━━━━━━━━━━━━━━━━━━━
  */
  async function handleSave() {

  const result =
    await updateProfile(
      form
    );

  if (
    result.success
  ) {

    toast.success(
      "Profile berhasil diupdate"
    );

    setIsEdit(false);

  } else {

    toast.error(
      "Gagal update profile"
    );

  }

}

  /*
  ━━━━━━━━━━━━━━━━━━━
  CANCEL
  ━━━━━━━━━━━━━━━━━━━
  */
  function handleCancel() {

    setForm({

      name:
        user?.name || "",

      email:
        user?.email || "",

      image:
        user?.image || "",

    });

    setIsEdit(false);

  }

  function handleStartEdit() {

    setForm(
      getProfileForm(user)
    );

    setIsEdit(true);

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  IMAGE
  ━━━━━━━━━━━━━━━━━━━
  */
  function handleImageChange(e) {

    const file =
      e.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend =
      () => {

        setForm({

          ...form,

          image:
            reader.result,

        });

      };

    reader.readAsDataURL(
      file
    );

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

      <div
        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* LEFT */}
        <div
          className="
            flex
            items-center
            gap-5
          "
        >

          <div
  className="
    relative
    h-28
    w-28
    overflow-hidden
    rounded-full
    border-4
    border-slate-100
    bg-slate-100
  "
>

  {
    visibleProfile.image ? (

      <img
        src={
          visibleProfile.image
        }
        alt="profile"
        className="
          h-full
          w-full
          object-cover
        "
      />

    ) : (

      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-center
          text-4xl
          font-black
          text-slate-400
        "
      >

        {
          visibleProfile.name
            ?.charAt(0)
        }

      </div>

    )
  }

</div>

          {/* INFO */}
          <div>

            {
              isEdit ? (

                <div className="space-y-3">

                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm({

                        ...form,

                        name:
                          e.target.value,

                      })
                    }
                    placeholder="Nama"
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      px-4
                      outline-none
                    "
                  />

                  <input
                    value={form.email}
                    disabled
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-100
                      px-4
                      text-slate-500
                      outline-none
                    "
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageChange
                    }
                    className="
                      block
                      text-sm
                    "
                  />

                </div>

              ) : (

                <>

                  <h2
                    className="
                      text-3xl
                      font-black
                      text-slate-900
                    "
                  >

                    {user?.name}

                  </h2>

                  <p
                    className="
                      mt-2
                      text-slate-500
                    "
                  >

                    {user?.email}

                  </p>

                </>

              )
            }

          </div>

        </div>

        {/* ACTION */}
        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >

          {
            isEdit ? (

              <>

                {/* SAVE */}
                <button
                  onClick={
                    handleSave
                  }
                  className="
                    flex
                    h-12
                    items-center
                    gap-2
                    rounded-2xl
                    bg-blue-100
                    px-5
                    font-semibold
                    text-blue-600
                  "
                >
                  Save

                </button>

                {/* CANCEL */}
                <button
                  onClick={
                    handleCancel
                  }
                  className="
                    flex
                    h-12
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    font-semibold
                    text-slate-700
                  "
                >


                  Cancel

                </button>

              </>

            ) : (

              <button
                onClick={() =>
                  handleStartEdit()
                }
                className="
                  flex
                  h-12
                  items-center
                  gap-2
                  rounded-2xl
                  bg-blue-100
                  px-5
                  font-semibold
                  text-blue-600
                "
              >


                Edit Profile

              </button>

            )
          }

        </div>

      </div>

    </div>

  );

}
