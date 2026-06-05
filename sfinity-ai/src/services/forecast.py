# ══════════════════════════════════════════════════════════════════════════════
#  Financial Forecasting — Proyeksi Keuangan 6 Bulan
# ══════════════════════════════════════════════════════════════════════════════

from src.config import SPENDING_COLS, NON_ESS_COLS


def _klasifikasi_status(rasio: float) -> str:
    """Klasifikasi status finansial berdasarkan rasio pengeluaran."""
    if   rasio >= 0.80: return "Bahaya"
    elif rasio >= 0.50: return "Waspada"
    elif rasio >= 0.35: return "Stabil"
    else:               return "Sangat Sehat"


def forecast_keuangan(user: dict, label: str, bulan: int = 6) -> dict:
    """
    Proyeksi keuangan dalam 3 skenario.

    Parameters
    ----------
    user  : dict data keuangan mahasiswa
    label : label prediksi saat ini
    bulan : jumlah bulan proyeksi (default 6)

    Returns
    -------
    dict dengan 3 skenario: status_quo, perbaikan_moderat, perbaikan_agresif
    """
    income  = user.get("pendapatan", 0) + user.get("bantuan", 0)
    total_e = sum(user.get(k, 0) for k in SPENDING_COLS)
    non_ess = sum(user.get(k, 0) for k in NON_ESS_COLS)

    skenario_def = {
        "status_quo": {
            "nama": "Status Quo",
            "potongan_non_ess": 0.0,
            "keterangan": "Tidak ada perubahan gaya hidup",
        },
        "perbaikan_moderat": {
            "nama": "Perbaikan Moderat (-15% non-esensial)",
            "potongan_non_ess": 0.15,
            "keterangan": "Kurangi hiburan & teknologi 15%",
        },
        "perbaikan_agresif": {
            "nama": "Perbaikan Agresif (-35% non-esensial)",
            "potongan_non_ess": 0.35,
            "keterangan": "Pangkas besar pengeluaran diskresioner",
        },
    }

    result = {}
    for key, cfg in skenario_def.items():
        potong      = non_ess * cfg["potongan_non_ess"]
        exp_baru    = total_e - potong
        saving_baru = income - exp_baru
        rasio_baru  = exp_baru / (income + 1e-5)

        timeline = []
        cum = 0
        for m in range(1, bulan + 1):
            cum += saving_baru
            timeline.append({
                "bulan": m,
                "tabungan_kumulatif": round(cum),
                "status": _klasifikasi_status(rasio_baru),
            })

        dana_darurat_3x = exp_baru * 3
        bulan_dd = (
            round(dana_darurat_3x / max(saving_baru, 1), 1)
            if saving_baru > 0
            else None
        )

        result[key] = {
            "nama": cfg["nama"],
            "keterangan": cfg["keterangan"],
            "saving_per_bulan": round(saving_baru),
            "pengeluaran_per_bulan": round(exp_baru),
            "rasio_pengeluaran_pct": round(rasio_baru * 100, 1),
            "rasio_tabungan_pct": round(
                (saving_baru / (income + 1e-5)) * 100, 1
            ),
            "total_saving_6_bulan": round(saving_baru * bulan),
            "dana_darurat_3x": round(dana_darurat_3x),
            "bulan_capai_dana_darurat": bulan_dd,
            "status_prediksi": _klasifikasi_status(rasio_baru),
            "timeline": timeline,
        }

    return result
