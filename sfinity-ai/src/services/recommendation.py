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
            "Kondisi arus kas kamu sedang negatif, yang berarti pengeluaran bulananmu jauh melebihi batas pemasukan yang ada, berisiko besar menciptakan tumpukan utang.",
            "Saat ini kamu sama sekali tidak memiliki dana penyangga (buffer) darurat. Jika terjadi hal tak terduga seperti sakit atau laptop rusak, kamu akan kesulitan mencari dana talangan.",
            "Jika tren konsumtif ini dibiarkan, kamu berpotensi gagal membayar kewajiban prioritas seperti UKT (Uang Kuliah Tunggal) atau biaya sewa kos di semester depan.",
            "Tekanan dan stres akibat masalah finansial yang memburuk bisa sangat mengganggu fokus belajar dan menurunkan performa akademik kamu secara drastis.",
        ],
        "tindakan_darurat": [
            "SEGERA ambil kertas atau buka aplikasi catatan, tulis seluruh daftar pengeluaran wajib minggu ini, lalu coret dan batalkan semua pembelian yang murni hanya keinginan sementara.",
            "Hentikan secara paksa semua langganan bulanan non-esensial (seperti Netflix, Spotify Premium, gym, atau game pass) minimal untuk 2 bulan ke depan sampai keuanganmu pulih.",
            "Berhenti membeli makanan di luar atau pesan antar (GoFood/GrabFood). Mulailah memasak sendiri minimal 5 hari dalam seminggu untuk memangkas biaya makan harian hingga 40%.",
            "Jangan ragu untuk segera menghubungi bagian kemahasiswaan kampus guna mencari informasi keringanan cicilan UKT atau program beasiswa bantuan darurat yang tersedia.",
            "Cari peluang penghasilan tambahan sesegera mungkin di luar jam kuliah, seperti menjadi asisten dosen, mengambil proyek freelance kecil-kecilan, atau berjualan online.",
        ],
        "rekomendasi_jangka_pendek": [
            "Mulai bulan depan, terapkan metode alokasi anggaran super hemat, yaitu 70% untuk kebutuhan pokok (makan, kos), 20% untuk cicilan utang/tabungan paksa, dan hanya 10% untuk hiburan.",
            "Buka rekening tabungan digital yang terpisah dan bebas biaya admin. Begitu mendapat uang bulanan, langsung transfer Rp 50.000 ke rekening tersebut sebelum uang dipakai untuk hal lain.",
            "Jadikan pencatatan keuangan harian sebagai kebiasaan wajib. Catat setiap rupiah yang keluar di aplikasi pencatat keuangan pada hari yang sama agar kamu sadar kemana uangmu pergi.",
            "Batasi pengeluaran untuk nongkrong atau hiburan maksimal hanya 5% dari total pemasukan bulananmu, tidak boleh lebih.",
            "Selalu manfaatkan promo mahasiswa, diskon kartu pelajar, atau kupon potongan harga setiap kali harus membeli kebutuhan rutin rumah tangga maupun transportasi.",
        ],
        "rekomendasi_jangka_panjang": [
            "Pasang target utama untuk menurunkan rasio pengeluaranmu dari zona merah ke batas aman di bawah 80% dalam waktu 2 hingga 3 bulan ke depan.",
            "Bangun kebiasaan menabung jangka panjang untuk menciptakan Dana Darurat yang setidaknya setara dengan 1 kali pengeluaran bulananmu dalam jangka waktu 6 bulan.",
            "Saat kontrak tempat tinggal (kos/kontrakan) habis, pertimbangkan untuk mencari tempat yang lebih terjangkau, atau mencari teman sekamar (roommate) untuk patungan biaya sewa.",
            "Gunakan waktu luangmu untuk mengikuti kursus gratis di internet guna membangun keahlian yang bisa diuangkan, seperti desain grafis, video editing, atau basic programming.",
        ],
    },
    "Waspada": {
        "risiko": [
            "Tabunganmu saat ini ada, namun masih terlalu kecil dan belum cukup kuat untuk menutupi biaya jika terjadi keadaan darurat yang membutuhkan dana besar secara tiba-tiba.",
            "Rasio pengeluaranmu berada di zona rawan (sekitar 50% hingga 80%). Ini artinya kamu sangat rentan jatuh ke zona bahaya jika terjadi sedikit saja pembengkakan pengeluaran.",
            "Porsi pengeluaran untuk hal-hal non-esensial (hiburan, jajan, gaya hidup) masih terlalu besar dan perlahan-lahan memakan alokasi uang yang seharusnya bisa ditabung.",
        ],
        "tindakan_darurat": [
            "Lakukan audit pada laporan pengeluaran bulan lalu, identifikasi 3 kategori pengeluaran non-esensial yang paling besar, dan paksa dirimu untuk menguranginya sebesar 20% bulan ini.",
            "Periksa kembali semua layanan berlangganan otomatis di ponsel cerdasmu, lalu batalkan layanan yang jarang kamu gunakan dalam sebulan terakhir.",
            "Buat draf anggaran belanja bulanan secara tertulis di awal bulan dan komitmenlah untuk mematuhinya secara ketat tanpa pengecualian.",
        ],
        "rekomendasi_jangka_pendek": [
            "Terapkan sistem 'Amplop Digital'. Pisahkan uang untuk makan, transportasi, dan hiburan di e-wallet yang berbeda agar pengeluaran di satu area tidak mengganggu area lainnya.",
            "Tingkatkan target menabungmu dengan cara menyisihkan minimal 15% dari uang jajan atau pemasukanmu di hari pertama kamu menerima uang tersebut.",
            "Jadilah konsumen cerdas: manfaatkan program cashback, points reward, dan promo dompet digital secara strategis, namun hindari jebakan pembelian impulsif akibat promo.",
            "Jika ada waktu luang setelah kuliah, carilah pekerjaan paruh waktu (part-time) yang fleksibel untuk menambah pundi-pundi tabunganmu.",
            "Terapkan aturan 'Tunggu 48 Jam' sebelum membeli barang non-esensial. Jika setelah 2 hari kamu masih sangat membutuhkannya, barulah kamu boleh membelinya.",
        ],
        "rekomendasi_jangka_panjang": [
            "Dalam waktu 12 bulan ke depan, pasang target untuk mengumpulkan Dana Darurat ideal senilai 3 kali lipat total pengeluaran bulananmu.",
            "Mulailah berkenalan dengan instrumen investasi berisiko sangat rendah seperti Reksa Dana Pasar Uang yang bisa dimulai hanya dengan modal Rp 10.000 saja.",
            "Fokuslah untuk mengembangkan soft-skill dan hard-skill yang relevan dengan jurusanmu demi memperbesar peluang karir dan penghasilan yang lebih tinggi setelah lulus nanti.",
            "Berusahalah secara konsisten untuk menekan rasio pengeluaran rutinmu hingga stabil di kisaran 50% hingga 65% dalam 6 bulan ke depan.",
        ],
    },
    "Stabil": {
        "risiko": [
            "Kondisi keuanganmu sudah cukup baik dan stabil. Tantangan terbesarmu saat ini adalah menghindari jebakan 'Lifestyle Inflation' (gaya hidup yang ikut naik seiring bertambahnya uang).",
            "Meskipun arus kas aman, kamu berisiko kehilangan potensi pertumbuhan aset jika uangmu hanya didiamkan di rekening tabungan biasa tanpa dialokasikan ke investasi.",
        ],
        "tindakan_darurat": [],
        "rekomendasi_jangka_pendek": [
            "Tingkatkan standar keuanganmu dengan mengalokasikan persentase yang lebih berani, minimal 25% dari total pemasukanmu langsung disalurkan ke keranjang tabungan dan investasi.",
            "Mulailah melakukan diversifikasi. Jangan simpan semua uang di satu tempat; pisahkan ke dalam Reksa Dana Pendapatan Tetap, Emas Digital, atau Deposito Bunga Tinggi (BPR).",
            "Buat tujuan keuangan (Financial Goals) yang sangat spesifik dan memiliki target waktu, misalnya: 'Tabungan Rp 5 Juta untuk beli laptop baru dalam 8 bulan'.",
            "Terus rawat dan pertahankan porsi Dana Daruratmu agar selalu berada pada rentang ideal, yakni 3 hingga 6 kali jumlah rata-rata pengeluaran bulananmu.",
            "Karena fondasimu sudah kuat, ini adalah waktu yang tepat untuk mulai mempelajari dasar-dasar instrumen pasar modal seperti analisis fundamental saham.",
        ],
        "rekomendasi_jangka_panjang": [
            "Rancang strategi investasi agar portofoliomu bisa menghasilkan tingkat pengembalian (return) yang konsisten tumbuh minimal 10% per tahun untuk mengalahkan inflasi.",
            "Jangan ragu untuk mengalokasikan sebagian uangmu untuk 'Investasi Leher ke Atas', yaitu membeli buku, mengikuti sertifikasi profesional, atau kursus bahasa asing.",
            "Mulai susun rencana pemetaan keuangan pasca-kampus, seperti persiapan modal mencari kerja, rencana pelunasan utang (jika ada), serta penyesuaian gaya hidup mandiri.",
            "Eksplorasi langkah awal untuk membangun Passive Income, misalnya dengan membuat aset digital (blog, YouTube), investasi yang memberi dividen, atau instrumen Peer-to-Peer Lending.",
        ],
    },
    "Sangat Sehat": {
        "risiko": [
            "Kondisi finansialmu sangat memuaskan! Risiko terbesarmu sekarang hanyalah jika kamu bersikap terlalu konservatif. Uang yang tidak diputar untuk investasi akan tergerus nilainya oleh inflasi seiring berjalannya waktu.",
        ],
        "tindakan_darurat": [],
        "rekomendasi_jangka_pendek": [
            "Ambil langkah agresif (namun terukur) dengan meningkatkan porsi uang yang diinvestasikan menjadi 35% hingga 40% dari total pemasukan bulananmu.",
            "Lakukan diversifikasi aset secara luas. Pecah portofolio investasimu ke dalam berbagai instrumen seperti Saham Bluechip, Reksa Dana Indeks, dan Surat Berharga Negara (Obligasi).",
            "Pertimbangkan untuk memasukkan elemen 'Impact Investing', di mana kamu berinvestasi pada proyek-proyek berkelanjutan (Green Finance) atau reksa dana berbasis ESG (Lingkungan, Sosial, Tata Kelola).",
            "Mulai rancang dan susun struktur portofolio investasimu dengan memandang ke depan (horizon investasi) untuk periode jangka panjang, yakni 5 hingga 10 tahun.",
            "Gunakan sebagian porsi uang dingin (uang yang tidak akan dipakai dalam waktu dekat) untuk mendanai eksperimen kewirausahaan atau proyek sampingan (side hustle) yang berpotensi memiliki pertumbuhan tinggi.",
        ],
        "rekomendasi_jangka_panjang": [
            "Pikirkan langkah menuju Kebebasan Finansial (Financial Freedom). Fokuskan usahamu pada mengumpulkan aset-aset produktif yang kelak bisa menghasilkan dividen atau pendapatan pasif untuk menggantikan pendapatan aktifmu.",
            "Mulai pelajari dan rencanakan strategi efisiensi pajak penghasilan serta instrumen asuransi (kesehatan/jiwa) yang optimal untuk melindungi kekayaan yang telah kamu bangun.",
            "Seiring bertumbuhnya asetmu, ada baiknya kamu mulai mempertimbangkan untuk berdiskusi dengan mentor finansial bersertifikat (Certified Financial Planner) untuk mendapatkan insight eksklusif.",
            "Jelajahi instrumen yang membutuhkan modal lebih besar namun dengan imbal hasil menjanjikan, seperti investasi urun dana bisnis (Securities Crowdfunding) atau investasi properti tahap awal.",
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
