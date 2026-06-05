# ══════════════════════════════════════════════════════════════════════════════
#  SFINITY — Konfigurasi & Konstanta Global
# ══════════════════════════════════════════════════════════════════════════════

import os

# ── Paths ─────────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_DIR         = os.path.join(BASE_DIR, "model")
MODEL_PATH        = os.path.join(MODEL_DIR, "best_sfinity_model.keras")
PREPROCESSOR_PATH = os.path.join(MODEL_DIR, "preprocessor.pkl")
LABEL_ENC_PATH    = os.path.join(MODEL_DIR, "label_encoder.pkl")
FEATURE_META_PATH = os.path.join(MODEL_DIR, "feature_meta.json")

# ── Kolom Pengeluaran ─────────────────────────────────────────────────────────
SPENDING_COLS = [
    "pendidikan", "tempat_tinggal", "makanan", "transportasi", "buku",
    "hiburan", "perawatan", "teknologi", "kesehatan", "lainnya",
]

ESS_COLS = [
    "pendidikan", "tempat_tinggal", "makanan",
    "transportasi", "kesehatan", "buku",
]

NON_ESS_COLS = ["hiburan", "perawatan", "teknologi", "lainnya"]

# ── Label ─────────────────────────────────────────────────────────────────────
LABEL_ORDER = ["Bahaya", "Waspada", "Stabil", "Sangat Sehat"]

LABEL_ICON = {
    "Bahaya": "🔴",
    "Waspada": "🟡",
    "Stabil": "🟢",
    "Sangat Sehat": "🌟",
}

LABEL_COLOR = {
    "Bahaya":       "#e76f51",
    "Waspada":      "#e9c46a",
    "Stabil":       "#2a9d8f",
    "Sangat Sehat": "#264653",
}

# ── Segment Metadata ─────────────────────────────────────────────────────────
SEGMENT_META = {
    "Bahaya": {
        "icon": "🔴",
        "color": "#e76f51",
        "tagline": "KONDISI BAHAYA! Pengeluaran melebihi batas aman. Tindakan darurat diperlukan sekarang.",
        "threshold_ratio": 0.80,
        "target_saving_pct": 10,
    },
    "Waspada": {
        "icon": "🟡",
        "color": "#e9c46a",
        "tagline": "Kondisi WASPADA. Keuangan masih terkendali tapi perlu perbaikan segera.",
        "threshold_ratio": 0.65,
        "target_saving_pct": 15,
    },
    "Stabil": {
        "icon": "🟢",
        "color": "#2a9d8f",
        "tagline": "Kondisi STABIL. Fondasi keuangan sudah baik, optimalkan untuk pertumbuhan.",
        "threshold_ratio": 0.50,
        "target_saving_pct": 25,
    },
    "Sangat Sehat": {
        "icon": "🌟",
        "color": "#264653",
        "tagline": "SANGAT SEHAT! Keuanganmu excellent. Saatnya agresif investasi & wealth building.",
        "threshold_ratio": 0.35,
        "target_saving_pct": 35,
    },
}


# ── Helper ────────────────────────────────────────────────────────────────────
def fmt_idr(v: float) -> str:
    """Format angka ke format Rupiah."""
    return f"Rp {abs(v):,.0f}".replace(",", ".")
