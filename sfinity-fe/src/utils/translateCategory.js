export function translateCategory(name) {
  if (!name) return "Lainnya";
  const map = {
    "food": "Makanan & Minuman",
    "transportation": "Transportasi",
    "housing": "Tempat Tinggal",
    "tuition": "Uang Kuliah (UKT)",
    "books & supplies": "Buku & Alat Tulis",
    "entertainment": "Hiburan",
    "personal care": "Perawatan Diri",
    "technology": "Teknologi",
    "health & wellness": "Kesehatan",
    "miscellaneous": "Lain-lain"
  };
  return map[name.toLowerCase()] || name.replace(/\b\w/g, c => c.toUpperCase());
}
