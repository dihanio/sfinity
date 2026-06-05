# ══════════════════════════════════════════════════════════════════════════════
#  Recommendation Engine — Rekomendasi Tindakan Finansial
# ══════════════════════════════════════════════════════════════════════════════

from src.config import (
    SPENDING_COLS, ESS_COLS, NON_ESS_COLS,
    SEGMENT_META, fmt_idr,
)


# ── Database Rekomendasi per Segmen ───────────────────────────────────────────
REKOMENDASI_DB = {
    "Bahaya": {
        "risiko": [
            "Risiko utang karena pengeluaran melebihi pemasukan",
            "Tidak ada buffer untuk keadaan darurat",
            "Potensi gagal bayar UKT / kost jika tidak segera diatasi",
            "Stres finansial berdampak pada performa akademik",
        ],
        "tindakan_darurat": [
            "SEGERA buat daftar pengeluaran minggu ini dan coret semua yang bukan kebutuhan primer",
            "Hentikan sementara langganan streaming, gym, atau layanan berbayar",
            "Masak sendiri minimal 5 hari dalam seminggu — hemat 30-40% biaya makan",
            "Hubungi bagian kemahasiswaan untuk informasi beasiswa darurat atau cicilan UKT",
            "Cari sumber penghasilan tambahan: freelance, asisten dosen, jualan online",
        ],
        "rekomendasi_jangka_pendek": [
            "Terapkan metode 50/30/20 — adaptasi ke 70/20/10 untuk kondisi darurat",
            "Buka rekening tabungan terpisah — transfer minimal Rp 50.000 setiap kali terima uang",
            "Gunakan aplikasi pencatat keuangan (Money Lover / Wallet) setiap hari",
            "Batasi hiburan maksimal 5% dari pemasukan bulanan",
            "Cari promo/diskon untuk kebutuhan rutin (makan, transportasi)",
        ],
        "rekomendasi_jangka_panjang": [
            "Target: turunkan rasio pengeluaran ke bawah 80% dalam 2 bulan",
            "Bangun dana darurat minimal 1x pengeluaran bulanan dalam 6 bulan",
            "Evaluasi pilihan kos/tempat tinggal yang lebih terjangkau",
            "Ikuti pelatihan skill yang bisa menghasilkan income (coding, desain, content creation)",
        ],
    },
    "Waspada": {
        "risiko": [
            "Tabungan terlalu kecil untuk menghadapi keadaan darurat",
            "Rasio pengeluaran masih di zona rawan (50-80%)",
            "Pengeluaran non-esensial perlu dikurangi lebih lanjut",
        ],
        "tindakan_darurat": [
            "Identifikasi 3 pengeluaran non-esensial terbesar dan kurangi 20%",
            "Review semua langganan bulanan — hapus yang jarang digunakan",
            "Buat anggaran bulanan tertulis dan patuhi dengan konsisten",
        ],
        "rekomendasi_jangka_pendek": [
            "Terapkan metode amplop digital: pisahkan dana untuk setiap kategori",
            "Targetkan tabungan minimal 15% dari pemasukan setiap bulan",
            "Manfaatkan cashback dan rewards kartu pembayaran secara strategis",
            "Cari sumber penghasilan tambahan paruh waktu",
            "Beli kebutuhan non-urgent saat ada promo / akhir bulan",
        ],
        "rekomendasi_jangka_panjang": [
            "Target: tabungan darurat 3x pengeluaran bulanan dalam 12 bulan",
            "Mulai belajar investasi reksa dana pasar uang (modal Rp 10.000)",
            "Tingkatkan skill untuk prospek karir & income lebih tinggi",
            "Target rasio pengeluaran turun ke 50-65% dalam 6 bulan",
        ],
    },
    "Stabil": {
        "risiko": [
            "Sudah stabil, pastikan tidak mengalami lifestyle inflation",
            "Alokasi investasi perlu ditingkatkan",
        ],
        "tindakan_darurat": [],
        "rekomendasi_jangka_pendek": [
            "Alokasikan minimal 25% pemasukan ke tabungan & investasi",
            "Diversifikasi: reksa dana, emas digital, atau deposito",
            "Buat tujuan keuangan spesifik (laptop baru, persiapan S2, dll.)",
            "Pertahankan dana darurat 3-6x pengeluaran bulanan",
            "Mulai belajar saham atau instrumen investasi berisiko lebih tinggi",
        ],
        "rekomendasi_jangka_panjang": [
            "Target portofolio investasi tumbuh minimal 10% per tahun",
            "Pertimbangkan investasi dalam pengembangan diri (kursus, sertifikasi)",
            "Rencanakan alokasi keuangan pasca-lulus (cicilan, investasi, lifestyle)",
            "Eksplorasi passive income: konten digital, dividen, atau peer lending",
        ],
    },
    "Sangat Sehat": {
        "risiko": [
            "Pastikan tidak terlalu konservatif — uang yang tidak diinvestasikan kehilangan nilai akibat inflasi",
        ],
        "tindakan_darurat": [],
        "rekomendasi_jangka_pendek": [
            "Tingkatkan porsi investasi ke 35-40% dari pemasukan",
            "Diversifikasi ke saham, reksa dana, atau obligasi",
            "Pertimbangkan investasi impact (green finance, sosial)",
            "Bangun portofolio investasi dengan horizon 5-10 tahun",
            "Eksplorasi kewirausahaan atau side project berpotensi tinggi",
        ],
        "rekomendasi_jangka_panjang": [
            "Financial Freedom: target aset produktif yang bisa menggantikan income aktif",
            "Rencanakan strategi pajak yang optimal",
            "Pertimbangkan mentor finansial / wealth manager",
            "Eksplorasi peluang bisnis, investasi startup, atau properti",
        ],
    },
}


# ── Helper ────────────────────────────────────────────────────────────────────

def _hitung_ringkasan(user: dict) -> dict:
    """Hitung ringkasan keuangan dari data user."""
    income    = user.get("pendapatan", 0) + user.get("bantuan", 0)
    total_exp = sum(user.get(k, 0) for k in SPENDING_COLS)
    saving    = income - total_exp
    non_ess   = sum(user.get(k, 0) for k in NON_ESS_COLS)
    ess       = sum(user.get(k, 0) for k in ESS_COLS)
    return {
        "income": income,
        "total_exp": total_exp,
        "saving": saving,
        "exp_ratio": total_exp / (income + 1e-5),
        "save_ratio": saving / (income + 1e-5),
        "non_ess": non_ess,
        "ess": ess,
    }


# ── Public API ────────────────────────────────────────────────────────────────

def generate_rekomendasi(label: str, user: dict) -> dict:
    """
    Generate rekomendasi finansial berdasarkan label & data user.

    Parameters
    ----------
    label : salah satu dari "Bahaya", "Waspada", "Stabil", "Sangat Sehat"
    user  : dict data keuangan mahasiswa

    Returns
    -------
    dict berisi ringkasan, risiko, rekomendasi, dan target tabungan
    """
    meta = SEGMENT_META[label]
    r    = _hitung_ringkasan(user)
    db   = REKOMENDASI_DB[label]

    target_saving_amt = r["income"] * meta["target_saving_pct"] / 100
    selisih_target    = target_saving_amt - r["saving"]

    return {
        "label": label,
        "icon": meta["icon"],
        "color": meta["color"],
        "tagline": meta["tagline"],
        "ringkasan": {
            "total_pemasukan": round(r["income"]),
            "total_pengeluaran": round(r["total_exp"]),
            "sisa_atau_defisit": round(r["saving"]),
            "status_sisa": "DEFISIT" if r["saving"] < 0 else "SURPLUS",
            "rasio_pengeluaran_pct": round(r["exp_ratio"] * 100, 2),
            "rasio_tabungan_pct": round(r["save_ratio"] * 100, 2),
            "total_non_esensial": round(r["non_ess"]),
        },
        "risiko": db["risiko"],
        "tindakan_darurat": db["tindakan_darurat"],
        "rekomendasi_jangka_pendek": db["rekomendasi_jangka_pendek"],
        "rekomendasi_jangka_panjang": db["rekomendasi_jangka_panjang"],
        "target": {
            "target_saving_pct": meta["target_saving_pct"],
            "target_saving_amount": round(target_saving_amt),
            "selisih_dari_target": round(selisih_target),
            "pesan": (
                f"Kamu perlu {'menambah' if selisih_target > 0 else 'sudah melebihi target dengan surplus'} "
                f"{fmt_idr(selisih_target)} per bulan untuk mencapai target tabungan {meta['target_saving_pct']}%."
            ),
        },
    }
