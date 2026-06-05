# ══════════════════════════════════════════════════════════════════════════════
#  Prediction Route — Endpoint utama SFINITY
# ══════════════════════════════════════════════════════════════════════════════

from fastapi import APIRouter, HTTPException

from src.models.schemas import UserInput
from src.services.model_service import model_service
from src.services.recommendation import generate_rekomendasi
from src.services.forecast import forecast_keuangan

router = APIRouter(tags=["Prediction"])


@router.post("/predict")
async def predict(user_input: UserInput):
    """
    Endpoint utama — Prediksi status finansial mahasiswa.

    Menerima data keuangan dan mengembalikan:
    - **prediksi**: label + confidence + probabilitas 4 kelas
    - **rekomendasi**: ringkasan, risiko, tindakan, rekomendasi jangka pendek/panjang
    - **forecast**: proyeksi keuangan 6 bulan (3 skenario)
    """
    if not model_service.is_ready:
        raise HTTPException(
            status_code=503,
            detail="Model belum siap. Coba lagi nanti.",
        )

    try:
        # Exclude 'nama' — hanya untuk label output, bukan fitur model
        user_dict = user_input.model_dump(exclude={"nama"})

        # 1. Prediksi model
        prediksi = model_service.predict(user_dict)

        # 2. Rekomendasi berdasarkan label
        rekomendasi = generate_rekomendasi(prediksi["label"], user_dict)

        # 3. Forecast 6 bulan
        forecast = forecast_keuangan(user_dict, prediksi["label"], bulan=6)

        return {
            "success": True,
            "nama": user_input.nama,
            "prediksi": prediksi,
            "rekomendasi": rekomendasi,
            "forecast": forecast,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Inference error: {str(e)}",
        )
