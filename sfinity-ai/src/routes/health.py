# ══════════════════════════════════════════════════════════════════════════════
#  Health & Meta Routes
# ══════════════════════════════════════════════════════════════════════════════

from fastapi import APIRouter
from src.services.model_service import model_service

router = APIRouter(tags=["Health"])


@router.get("/")
async def root():
    """Health check — root endpoint."""
    return {
        "status": "ok",
        "service": "SFINITY API",
        "version": "1.0.0",
        "description": "Klasifikasi & Rekomendasi Perilaku Finansial Mahasiswa",
    }


@router.get("/health")
async def health():
    """Health check — detail status model."""
    svc = model_service
    return {
        "status": "ok" if svc.is_ready else "loading",
        "model_loaded": svc.model is not None,
        "preprocessor_loaded": svc.preprocessor is not None,
        "label_encoder_loaded": svc.label_enc is not None,
        "classes": list(svc.label_enc.classes_) if svc.label_enc else [],
        "n_features": svc.feature_meta["n_features"] if svc.feature_meta else 0,
    }


@router.get("/meta", tags=["Info"])
async def get_meta():
    """Mengembalikan metadata model: daftar fitur, kelas, dll."""
    meta = model_service.feature_meta
    return {
        "n_features": meta["n_features"],
        "n_classes": meta["n_classes"],
        "label_classes": meta["label_classes"],
        "raw_numerical_features": meta["RAW_NUM"],
        "raw_categorical_features": meta["RAW_CAT"],
        "spending_columns": meta["SPENDING_COLS"],
        "essential_columns": meta["ESS_COLS"],
        "non_essential_columns": meta["NON_ESS_COLS"],
    }
