export const formatRupiah =
  (number = 0) => {

    return `Rp ${Number(
      number
    ).toLocaleString(
      "id-ID"
    )}`;

  };